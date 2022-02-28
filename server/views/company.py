from flask import jsonify, request
from server import app
from server.models import db, Company

@app.route('/api/company', methods=['POST'])
def signup_company():
    request_data = request.get_json()
    new_company=Company(
        password=request_data['password'],
        company_name=request_data['company_name'],
        industry=request_data['industry'],
        avatar=request_data['avatar'],
        email=request_data['email'],
    )
    db.session.add(new_company)
    db.session.commit()
    return jsonify(success=True)

@app.route('/api/company/company_name=<company>', methods=['GET'])
def check_company_name(company):
    result=db.session.query(Company).filter(Company.company_name==company).one_or_none()
    if result:
        instance = dict(result.__dict__); 
        instance.pop('_sa_instance_state', None)
        response= {"success":True, "company": instance }
        return jsonify(response)
    else:
        return jsonify(success=False)
   
