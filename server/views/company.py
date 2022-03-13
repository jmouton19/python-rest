from flask import jsonify, request
from server import app
from server.models import db, Company, Contract
from server.views.checkemail import email_checkr
from argon2 import PasswordHasher
from server.views.developer import languages_dict

@app.route('/api/company', methods=['POST','DELETE','GET'])
def signup_company():
    if request.method=='POST':
        request_data = request.get_json()
        email=request_data['email']
        company_name=request_data['company_name']
        company=db.session.query(Company).filter(Company.company_name==company_name).one_or_none()
        checker=email_checkr(email)
        if checker['success']==True:
            if company==None:
                ph = PasswordHasher()
                hashed = ph.hash(request_data['password'])
                new_company=Company(
                    password=hashed,
                    company_name=company_name,
                    industry=request_data['industry'],
                    avatar=request_data['avatar'],
                    email=email,
                )
                db.session.add(new_company)
                db.session.commit()
            else:
                return jsonify(success=False,message="Company with this name already exists")
        else:
            return jsonify(checker)
        return jsonify(success=True,message="Company has been registered")
    elif request.method=='DELETE':
        users=db.session.query(Company).all()
        for user in users:
            db.session.delete(user)
        db.session.commit()
        return jsonify(success=True,message="All companies deleted")
    elif request.method=='GET':
        company_list=[]
        companies=db.session.query(Company).all()
        for company in companies:
            instance = dict()
            instance['company_name']=company.company_name
            instance['avatar']=company.avatar
            instance['industry']=company.industry
            company_list.append(instance)
        return jsonify(success=True,companies=company_list)

@app.route('/api/company/<company>', methods=['GET','DELETE','PUT'])
def check_company_name(company):
    result=db.session.query(Company).filter(Company.company_name==company).one_or_none()
    if result:
        if request.method=='GET':
            instance = dict(result.__dict__) 
            instance.pop('_sa_instance_state', None)
            instance.pop('password', None)
            return jsonify(success=True, company= instance)
        elif request.method=='DELETE':
            db.session.delete(result)
            db.session.commit()
            return jsonify(success=True, message="Company Deleted")
        elif request.method=='PUT':
            request_data = request.get_json()
            for key, value in request_data.items():
                if key=='email':
                    if value!=result.email:
                        checker=email_checkr(value)
                        if checker["success"]==True:
                            setattr(result,key,value)
                        else:
                            return jsonify(success=False, message="Email taken")
                elif key=='company_name':
                    if value !=result.company_name:
                        if not db.session.query(Company).filter(Company.company_name==value).one_or_none():
                            setattr(result,key,value)
                        else:
                            return jsonify(success=False, message="Company name taken")
                elif key=='password':
                    old=value[0]
                    new=value[1]
                    ph=PasswordHasher()
                    try:
                        if ph.verify(result.password,old):
                            setattr(result,key,ph.hash(new))
                    except:
                        return jsonify(success=False,message="Login failed")
                elif key!="company_id":
                    setattr(result,key,value)
            db.session.commit()
            return jsonify(success=True, message="Company updated")
    else:
        return jsonify(success=False,message="Company does not exist")

@app.route('/api/company/<company_name>/contract', methods=['GET'])
def comp_contracts(company_name):
    company=db.session.query(Company).filter(Company.company_name==company_name).one_or_none()
    if company:
        contract_list=[]
        contracts=db.session.query(Contract).filter(Contract.company_id==company.company_id)
        for contract in contracts:
            instance = dict(contract.__dict__)
            instance.pop('_sa_instance_state', None)
            contract_lang=dict(contract.contract_languages.__dict__)
            contract_lang.pop('_sa_instance_state', None)
            filtered={k: v for k, v in contract_lang.items() if v is not None}
            filtered.pop('contract_id')
            instance['contract_languages']=dict((list(languages_dict.keys())[list(languages_dict.values()).index(key)], value) for (key, value) in filtered.items())
            contract_list.append(instance)
        return jsonify({"success":True, "contracts": contract_list })
    else:
        return jsonify(success=False,message="Company doesnt exist")
   
