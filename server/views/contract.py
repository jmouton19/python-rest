from flask import jsonify, request
from server import app
from server.models import Developer, db, Contract, Company, ContractLanguages,Application
import datetime
from server.views.developer import languages_dict

@app.route('/api/contract', methods=['POST','GET'])
def contract():
    if request.method=='POST':
        request_data = request.get_json()
        company_name=request_data['company_name']
        company=db.session.query(Company).filter(Company.company_name==company_name).one_or_none()
        if company:
            new_contract=Contract(
            length=request_data['length'],
            value=request_data['value'],
            title = request_data['title'],
            description=request_data['description'],
            remote=request_data['remote'],
            open=request_data['open'],
            developer_id=None,
            date_posted=datetime.datetime.now()
            )
            company.contracts.append(new_contract)
            contract_languages=request_data['contract_languages']
            new_contract_languages=ContractLanguages()
            for key, value in contract_languages.items():
                exec("new_contract_languages.%s=%d"%(languages_dict[key],value))
            new_contract.contract_languages=new_contract_languages
            db.session.add(new_contract)
        else:
            return jsonify(success=False,message="Company does not exist")
    elif request.method=='GET':
        contract_list=[]
        contracts=db.session.query(Contract).filter(Contract.open==True)
        for contract in contracts:
            instance = dict(contract.__dict__)
            instance.pop('_sa_instance_state', None)
            instance['company_name']=contract.company.company_name
            instance['company_avatar']=contract.company.avatar
            contract_lang=dict(contract.contract_languages.__dict__)
            contract_lang.pop('_sa_instance_state', None)
            filtered={k: v for k, v in contract_lang.items() if v is not None}
            filtered.pop('contract_id')
            instance['contract_languages']=dict((list(languages_dict.keys())[list(languages_dict.values()).index(key)], value) for (key, value) in filtered.items())
            contract_list.append(instance)
        response= {"success":True, "contracts": contract_list }
        return jsonify(response)
    db.session.commit()
    return jsonify(success=True)

@app.route('/api/contract/<contract_id>', methods=['GET','DELETE','PUT'])
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
            dev_id=contract.developer_id
            if dev_id:
                dev=db.session.query(Developer).filter(Developer.developer_id==dev_id).one_or_none()
                instance['username']=dev.username
            else:
                instance['username']=None
            return jsonify(success=True,contract=instance)
        elif request.method=='PUT':
            request_data = request.get_json()
            username= request_data['username']
            dev=db.session.query(Developer).filter(Developer.username==username).one_or_none()
            if dev:
                application=db.session.query(Application).filter(Application.contract_id==contract.contract_id,Application.developer_id==dev.developer_id).one_or_none()
                if application:
                    setattr(contract,"developer_id",dev.developer_id)
                    setattr(contract,"open",False)
                    db.session.commit()
                    return jsonify(success=True,message="Contract updated")
                else:
                    return jsonify(success=False,message="Developer has not applied for this contract")   
            else:
                return jsonify(success=False,message="Developer does not exist")
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
            instance = dict(); 
            instance['username']=dev.username
            instance['avatar']=dev.avatar
            instance['name']=dev.name
            instance['surname']=dev.surname
            dev_lang=dict(dev.developer_languages.__dict__)
            dev_lang.pop('_sa_instance_state', None)
            filtered={k: v for k, v in dev_lang.items() if v is not None}
            filtered.pop('developer_id')
            instance['developer_languages']=dict((list(languages_dict.keys())[list(languages_dict.values()).index(key)], value) for (key, value) in filtered.items())
            dev_list.append(instance)
        return jsonify(success=True,developers=dev_list)
    else:
        return jsonify(success=False,message="Contract does not exist")