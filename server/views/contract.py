from calendar import c
from hashlib import new
from flask import jsonify, request
from server import app
from server.models import db, Contract, Company, ContractLanguages
import datetime

@app.route('/api/contract', methods=['POST'])
def post_contract():
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
        match key:
            case 'C':
                new_contract_languages.c=value
            case 'C++':
                new_contract_languages.c_plusplus=value
            case 'Go':        
                new_contract_languages.go=value
            case 'Java':
                new_contract_languages.java=value
            case 'JavaScript':
                new_contract_languages.javascript=value
            case 'Kotlin':
                new_contract_languages.kotlin=value
            case 'Lua':
                new_contract_languages.lua=value
            case 'MATLAB':        
                new_contract_languages.matlab=value
            case 'Objective-C':
                new_contract_languages.objective_c=value
            case 'Perl':
                new_contract_languages.perl=value
            case 'Python':        
                new_contract_languages.python=value
            case 'PHP':        
                new_contract_languages.php=value
            case 'Rust':
                new_contract_languages.rust=value
            case 'Swift':
                new_contract_languages.swift=value
            case 'VBA':        
                new_contract_languages.vba=value
            case 'C#':
                new_contract_languages.c_sharp=value
            case 'TypeScript':
                new_contract_languages.typescript=value
            case 'Ruby':        
                new_contract_languages.ruby=value
            case 'R':        
                new_contract_languages.r=value

    new_contract.contract_languages=new_contract_languages
    db.session.commit()
    return jsonify(success=True)