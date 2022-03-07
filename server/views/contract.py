from flask import jsonify, request
from server import app
from server.models import db, Contract, Company, ContractLanguages
import datetime
from server.views.developer import languages_dict

@app.route('/api/contract', methods=['POST','GET'])
def contract():
    if request.method=='POST':
        request_data = request.get_json()
        company_name=request_data['company_name']
        company=db.session.query(Company).filter(Company.company_name==company_name).one_or_none()
        new_contract=Contract(
        length=request_data['length'],
        value=request_data['value'],
        title = request_data['title'],
        description=request_data['description'],
        remote=request_data['remote'],
        open=request_data['open'],
        date_posted=datetime.datetime.now()
        )
        company.contracts.append(new_contract)
        contract_languages=request_data['contract_languages']
        new_contract_languages=ContractLanguages()
        for key, value in contract_languages.items():
            exec("new_dev_languages.%s=%d"%(languages_dict[key],value))
        new_contract.contract_languages=new_contract_languages

    elif request.method=='GET':
        contract_list=[]
        contracts=db.session.query(Contract).filter(Contract.open==True)
        for contract in contracts:
            instance = dict(contract.__dict__)
            instance.pop('_sa_instance_state', None)
            instance['company_name']=contract.company.company_name
            instance['company_avatar']=contract.company.avatar
            contract_list.append(instance)
        response= {"success":True, "contracts": contract_list }
        return jsonify(response)
    db.session.commit()
    return jsonify(success=True)

@app.route('/api/contract/<contract_id>', methods=['DELETE'])
def delete_contract(contract_id):
    contract=db.session.query(Contract).filter(Contract.contract_id==contract_id).one_or_none()
    if contract:
        db.session.delete(contract)
        db.session.commit()
        return jsonify(success=True)
    else:
        return jsonify(success=False,message="Contract does not exist")