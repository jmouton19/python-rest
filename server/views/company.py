from flask import jsonify, request
from server import app
from server.models import db, Company
from server.views.checkemail import email_checkr

@app.route('/api/company', methods=['POST'])
def signup_company():
    request_data = request.get_json()
    email=request_data['email']
    company_name=request_data['company_name']
    company=db.session.query(Company).filter(Company.company_name==company_name).one_or_none()
    checker=email_checkr(email)
    if checker['success']==True:
        if company==None:
            new_company=Company(
                password=request_data['password'],
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

@app.route('/api/company/<company>', methods=['GET'])
def check_company_name(company):
    result=db.session.query(Company).filter(Company.company_name==company).one_or_none()
    if result:
        instance = dict(result.__dict__) 
        instance.pop('_sa_instance_state', None)
        response= {"success":True, "company": instance }
        return jsonify(response)
    else:
        return jsonify(success=False)
   
