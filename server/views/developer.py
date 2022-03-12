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
"TypeScript":"typescript",
"R":"r",
"Swift":"swift",
"Objective-C":"objective_c",
"PHP":"php",
"MATLAB":"matlab",
"Go":"go",
"Rust":"rust",
"VBA":"vba",
"Ruby":"ruby",
"Kotlin":"kotlin",
"Perl":"perl",
"Lua":"lua",}

@app.route('/api/developer', methods=['POST','GET'])
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
            for job in user.jobs:
                job.developer_id=None
                job.open=True
            db.session.delete(user)
        db.session.commit()
        return jsonify(success=True,message="All developers deleted")
    elif request.method=='GET':
        dev_list=[]
        developers=db.session.query(Developer).all()
        for dev in developers:
            instance = dict()
            instance['username']=dev.username
            instance['avatar']=dev.avatar
            instance['name']=dev.name
            instance['surname']=dev.surname
            dev_list.append(instance)
        return jsonify(success=True,developers=dev_list)

@app.route('/api/developer/<username>', methods=['GET','DELETE','PUT'])
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
            for job in result.jobs:
                job.developer_id=None
                job.open=True
            db.session.delete(result)
            db.session.commit()
            return jsonify(success=True, message="Developer Deleted")
        elif request.method=='PUT':
            request_data = request.get_json()
            for key, value in request_data.items():
                if key=="developer_languages":
                    dev_languages=request_data['developer_languages']
                    for key, value in dev_languages.items():
                        setattr(result.developer_languages,languages_dict[key],value)
                elif key=='email':
                    if not value==result.email:
                        checker=email_checkr(value)
                        if checker["success"]==True:
                            setattr(result,key,value)
                        else:
                            return jsonify(success=False, message="Email taken")
                elif key=='username':
                    if not value==result.username:
                        if not db.session.query(Developer).filter(Developer.username==value).one_or_none() :
                            for job in result.jobs:
                                setattr(job,"developer_username",value)
                            setattr(result,key,value)
                        else:
                            return jsonify(success=False, message="Username taken")
                elif key=='password':
                    old=value[0]
                    new=value[1]
                    ph=PasswordHasher()
                    try:
                        if ph.verify(result.password,old):
                            setattr(result,key,ph.hash(new))
                    except:
                        return jsonify(success=False,message="Login failed")
                elif key!="developer_id":
                    setattr(result,key,value)
            db.session.commit()
            return jsonify(success=True, message="Developer updated")
    else:
        return jsonify(success=False,message="Developer does not exist")

@app.route('/api/developer/<username>/application', methods=['POST','GET'])
def apply_contract(username):
    developer=db.session.query(Developer).filter(Developer.username==username).one_or_none()
    if developer:
        if request.method == 'POST':
            request_data = request.get_json()
            contract_id=request_data['contract_id']
            contract=db.session.query(Contract).filter(Contract.contract_id==contract_id).one_or_none()
            application=db.session.query(Application).filter(Application.contract_id==contract.contract_id, Application.developer_id==developer.developer_id).one_or_none()
            if application==None:        
                new_application=Application(
                    contract_id=contract_id,
                    developer_id=developer.developer_id
                )
                developer.applications.append(new_application)
                contract.applications.append(new_application)
                db.session.commit()
                return jsonify(success=True)
            else:
                return jsonify(success=False,message="Developer has already applied for this contract")
        elif request.method == 'GET':
            applied_contract_list=[]
            applied_contracts=db.session.query(Application).filter(Application.developer_id==developer.developer_id)
            for applied in applied_contracts:
                instance = dict(applied.contract.__dict__)
                instance.pop('_sa_instance_state', None)
                instance['company_name']=applied.contract.company.company_name
                instance['company_avatar']=applied.contract.company.avatar
                applied_contract_list.append(instance)
            return jsonify(success=True, contracts= applied_contract_list)
    else:
        return jsonify(success=False,message="Developer not found")

@app.route('/api/developer/<username>/application/<contract_id>', methods=['DELETE'])
def delete_apply(username,contract_id):
    contract=db.session.query(Contract).filter(Contract.contract_id==contract_id).one_or_none()
    developer=db.session.query(Developer).filter(Developer.username==username).one_or_none()
    application=db.session.query(Application).filter(Application.contract_id==contract.contract_id, Application.developer_id==developer.developer_id).one_or_none()
    if application:
        db.session.delete(application)
    else:
        return jsonify(success=False,message="Developer has not applied for this contract")
    db.session.commit()
    return jsonify(success=True,message="Application removed")

@app.route('/api/developer/<username>/blockedCompany', methods=['POST','GET'])
def block_company(username):
    developer=db.session.query(Developer).filter(Developer.username==username).one_or_none()
    if request.method == 'POST':
        request_data = request.get_json()
        company_name=request_data['company_name']
        company=db.session.query(Company).filter(Company.company_name==company_name).one_or_none()
        blocked=db.session.query(BlockedCompany).filter(BlockedCompany.company_id==company.company_id, BlockedCompany.developer_id==developer.developer_id).one_or_none()
        if blocked==None:
            new_blocked=BlockedCompany(
                company_id=company.company_id,
                developer_id=developer.developer_id
            )
            developer.blocked_companies.append(new_blocked)
            company.blockings.append(new_blocked)
            db.session.commit()
            return jsonify(success=True,message="Company blocked")
        else:
            return jsonify(success=False,message="Developer has already blocked this company")
    elif request.method == 'GET':
        blocked_list=[]
        blocks=db.session.query(BlockedCompany).filter(BlockedCompany.developer_id==developer.developer_id)
        for block in blocks:
            instance = dict()
            instance['company_name']=block.company.company_name
            instance['company_avatar']=block.company.avatar
            blocked_list.append(instance)
        response= {"success":True, "blocked companies": blocked_list }
        return jsonify(response)

@app.route('/api/developer/<username>/blockedCompany/<company_name>', methods=['DELETE'])
def unblock_company(username,company_name):
    developer=db.session.query(Developer).filter(Developer.username==username).one_or_none()
    company=db.session.query(Company).filter(Company.company_name==company_name).one_or_none()
    blocked=db.session.query(BlockedCompany).filter(BlockedCompany.company_id==company.company_id, BlockedCompany.developer_id==developer.developer_id).one_or_none()
    if blocked:
        db.session.delete(blocked)
    else:
        return jsonify(success=False,message="Developer has not blocked this company")
    db.session.commit()
    return jsonify(success=True,message="Company unblocked")

@app.route('/api/developer/id=<dev_id>', methods=['GET'])
def check_id(dev_id):
    result=db.session.query(Developer).filter(Developer.developer_id==dev_id).one_or_none()
    if result:
        if request.method=='GET':
            instance = dict(); 
            instance['avatar']=result.avatar
            instance['username']=result.username
            return jsonify(success=True,developer=instance)
    else:
        return jsonify(success=False,message="Developer not found")