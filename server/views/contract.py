from flask import jsonify, request
from server import app
from server.models import db, Contract, Company, ContractLanguages,Application
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
        #developer_id=None,
        date_posted=datetime.datetime.now()
        )
        company.contracts.append(new_contract)
        contract_languages=request_data['contract_languages']
        new_contract_languages=ContractLanguages()
        for key, value in contract_languages.items():
            exec("new_contract_languages.%s=%d"%(languages_dict[key],value))
        new_contract.contract_languages=new_contract_languages
        db.session.add(new_contract)
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

@app.route('/api/contract/<contract_id>', methods=['GET','DELETE'])
def delete_contract(contract_id):
    contract=db.session.query(Contract).filter(Contract.contract_id==contract_id).one_or_none()
    if contract:
        if request.method=='DELETE':
            db.session.delete(contract)
            db.session.commit()
            return jsonify(success=True)
        elif request.method=='GET':
            instance=dict(contract.__dict__)
            instance.pop('_sa_instance_state', None)
            instance['company_name']=contract.company.company_name
            instance['company_avatar']=contract.company.avatar
            return jsonify(success=True,contract=instance)
    else:
        return jsonify(success=False,message="Contract does not exist")

@app.route('/api/contract/<contract_id>/developer', methods=['GET'])
def contract_devs_applied(contract_id):
    contract=db.session.query(Contract).filter(Contract.contract_id==contract_id).one_or_none()
    applications=db.session.query(Application).filter(Application.contract_id==contract_id)
    dev_list=[]
    if contract:
        for applicant in applications:
            dev=applicant.developer
            instance = dict(dev.__dict__); 
            instance.pop('_sa_instance_state', None)
            instance.pop('password', None)
            dev_lang=dict(dev.developer_languages.__dict__)
            dev_lang.pop('_sa_instance_state', None)
            filtered={k: v for k, v in dev_lang.items() if v is not None}
            filtered.pop('developer_id')
            instance['developer_languages']=dict((list(languages_dict.keys())[list(languages_dict.values()).index(key)], value) for (key, value) in filtered.items())
            dev_list.append(instance)
        return jsonify(success=True,developers=dev_list)
    else:
        return jsonify(success=False,message="Contract does not exist")