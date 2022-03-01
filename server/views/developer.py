from flask import jsonify, request
from server import app
from server.models import Contract, db, Developer, DeveloperLanguages, Application

@app.route('/api/developer', methods=['POST'])
def signup_developer():
    request_data = request.get_json()
    new_dev=Developer(
        password=request_data['password'],
        username=request_data['username'],
        name=request_data['name'],
        surname=request_data['surname'],
        avatar=request_data['avatar'],
        email=request_data['email'],
    )
    dev_languages=request_data['developer_languages']
    new_dev_languages=DeveloperLanguages()
    for key, value in dev_languages.items():
        match key:
            case 'C':
                new_dev_languages.c=value
            case 'C++':
                new_dev_languages.c_plusplus=value
            case 'Go':        
                new_dev_languages.go=value
            case 'Java':
                new_dev_languages.java=value
            case 'JavaScript':
                new_dev_languages.javascript=value
            case 'Kotlin':
                new_dev_languages.kotlin=value
            case 'Lua':
                new_dev_languages.lua=value
            case 'MATLAB':        
                new_dev_languages.matlab=value
            case 'Objective-C':
                new_dev_languages.objective_c=value
            case 'Perl':
                new_dev_languages.perl=value
            case 'Python':        
                new_dev_languages.python=value
            case 'PHP':        
                new_dev_languages.php=value
            case 'Rust':
                new_dev_languages.rust=value
            case 'Swift':
                new_dev_languages.swift=value
            case 'VBA':        
                new_dev_languages.vba=value
            case 'C#':
                new_dev_languages.c_sharp=value
            case 'TypeScript':
                new_dev_languages.typescript=value
            case 'Ruby':        
                new_dev_languages.ruby=value
            case 'R':        
                new_dev_languages.r=value
            
    
    new_dev.developer_languages=new_dev_languages
    db.session.add(new_dev)
    db.session.commit()
    return jsonify(success=True)

@app.route('/api/developer/<username>', methods=['GET'])
def check_username(username):
    result=db.session.query(Developer).filter(Developer.username==username).one_or_none()
    if result:
        instance = dict(result.__dict__); 
        instance.pop('_sa_instance_state', None)
        response= {"success":True, "developer": instance }
        return jsonify(response)
    else:
        return jsonify(success=False)

@app.route('/api/developer/<username>/contract', methods=['POST'])
def apply_contract(username):
    request_data = request.get_json()
    contract_id=request_data['contract_id']
    contract=db.session.query(Contract).filter(Contract.contract_id==contract_id).one_or_none()
    developer=db.session.query(Developer).filter(Developer.username==username).one_or_none()
    new_application=Application()
    developer.applications.append(new_application)
    contract.applications.append(new_application)
    db.session.commit()
    return jsonify(success=True)
