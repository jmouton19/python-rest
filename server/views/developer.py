from flask import jsonify, request
from server import app
from server.models import Contract, db, Developer, DeveloperLanguages, Application, Company, BlockedCompany
from server.views.checkemail import email_checkr
from argon2 import PasswordHasher

languages_dict={'C': "c",
'C++': "c_plusplus",
"C#":"c_sharp",
"Python":"python",
"Java":"java",
"JavaScript":"javascript",
"R":"r",
"Swift":"swift",
"Objective-C":"objective_c",
"PHP":"php",
"MATLAB":"matlab",
"GO":"go",
"Rust":"rust",
"VBA":"vba",
"Ruby":"ruby",
"Kotlin":"kotlin",
"Perl":"perl",
"Lua":"lua",}

@app.route('/api/developer', methods=['POST','DELETE'])
def signup_developer():
    if request.method=='POST':
        request_data = request.get_json()
        username=request_data['username']
        email=request_data['email']
        developer=db.session.query(Developer).filter(Developer.username==username).one_or_none()
        checker=email_checkr(email)
        if checker['success']==True:
            if developer==None:
                ph = PasswordHasher()
                hashed = ph.hash(request_data['password'])
                new_dev=Developer(
                password=hashed,
                username=username,
                name=request_data['name'],
                surname=request_data['surname'],
                avatar=request_data['avatar'],
                email=email,
                )
                dev_languages=request_data['developer_languages']
                new_dev_languages=DeveloperLanguages()
                for key, value in dev_languages.items():
                    exec("new_dev_languages.%s=%d"%(languages_dict[key],value))
                new_dev.developer_languages=new_dev_languages
                db.session.add(new_dev)
                db.session.commit()
            else:
                return jsonify(success=False,message="Developer with this name already exists")
        else:
            return jsonify(checker)
        return jsonify(success=True,message="Developer has been registered")
    elif request.method=='DELETE':
        users=db.session.query(Developer).all()
        for user in users:
            db.session.delete(user)
        db.session.commit()
        return jsonify(success=True,message="All developers deleted")

@app.route('/api/developer/<username>', methods=['GET','DELETE'])
def check_username(username):
    result=db.session.query(Developer).filter(Developer.username==username).one_or_none()
    if result:
        if request.method=='GET':
            instance = dict(result.__dict__); 
            instance.pop('_sa_instance_state', None)
            instance.pop('password', None)
            dev_lang=dict(result.developer_languages.__dict__)
            dev_lang.pop('_sa_instance_state', None)
            filtered={k: v for k, v in dev_lang.items() if v is not None}
            filtered.pop('developer_id')
            print(filtered)
            instance['developer_languages']=dict((list(languages_dict.keys())[list(languages_dict.values()).index(key)], value) for (key, value) in filtered.items())
            return jsonify(success=True,developer=instance)
        elif request.method=='DELETE':
            db.session.delete(result)
            db.session.commit()
            return jsonify(success=True, message="Developer Deleted")
    else:
        return jsonify(success=False,message="Developer with this username does not exist")

@app.route('/api/developer/<username>/contract', methods=['POST','DELETE'])
def apply_contract(username):
    request_data = request.get_json()
    contract_id=request_data['contract_id']
    contract=db.session.query(Contract).filter(Contract.contract_id==contract_id).one_or_none()
    developer=db.session.query(Developer).filter(Developer.username==username).one_or_none()
    application=db.session.query(Application).filter(Application.contract_id==contract.contract_id, Application.developer_id==developer.developer_id).one_or_none()
    if request.method == 'POST':
        if application==None:        
            new_application=Application(
                contract_id=contract_id,
                developer_id=developer.developer_id
            )
            developer.applications.append(new_application)
            contract.applications.append(new_application)
        else:
            return jsonify(success=False,message="Developer has already applied for this contract")
    elif request.method == 'DELETE':
        if application:
            db.session.delete(application)
        else:
            return jsonify(success=False,message="Developer has not applied for this contract")
    db.session.commit()
    return jsonify(success=True)

@app.route('/api/developer/<username>/company', methods=['POST','DELETE'])
def block_company(username):
    request_data = request.get_json()
    company_name=request_data['company_name']
    company=db.session.query(Company).filter(Company.company_name==company_name).one_or_none()
    developer=db.session.query(Developer).filter(Developer.username==username).one_or_none()
    blocked=db.session.query(BlockedCompany).filter(BlockedCompany.company_id==company.company_id, BlockedCompany.developer_id==developer.developer_id).one_or_none()
    if request.method == 'POST':
        if blocked==None:
            new_blocked=BlockedCompany(
                company_id=company.company_id,
                developer_id=developer.developer_id
            )
            developer.blocked_companies.append(new_blocked)
            company.blockings.append(new_blocked)
        else:
            return jsonify(success=False,message="Developer has already blocked this company")
    elif request.method == 'DELETE':
        if blocked:
            db.session.delete(blocked)
        else:
            return jsonify(success=False,message="Developer has not blocked this company")
    db.session.commit()
    return jsonify(success=True)
