from flask import jsonify, request
from server import app
from server.models import db, Company
from server.views.checkemail import email_checkr
from argon2 import PasswordHasher

@app.route('/api/company', methods=['POST','DELETE'])
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
        db.session.query(Company).delete()
        db.session.commit()
        return jsonify(success=True,message="All companies deleted")

@app.route('/api/company/<company>', methods=['GET','DELETE'])
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
    else:
        return jsonify(success=False)
   
