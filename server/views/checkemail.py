from flask import jsonify, request
from server import app
from server.models import db, Developer, Company

def email_checkr(email,login=None):
    result=db.session.query(Developer).filter(Developer.email==email).one_or_none()
    if result:
        if login:
            return "Developer",result
        else:
            return dict(success=False,message="Email already exists",type="Developer")
    else:
        result=db.session.query(Company).filter(Company.email==email).one_or_none()
        if result:
            if login:
                return "Company",result
            else:
                 return dict(success=False,message="Email already exists",type="Company")
        else:
            if login:
               return None,None
            else:
                return dict(success=True,message="This email has not been registered")

@app.route('/api/email/<email>', methods=['GET'])
def check_email(email):
    return jsonify(email_checkr(email))

