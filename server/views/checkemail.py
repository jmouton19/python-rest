from flask import jsonify, request
from server import app
from server.models import db, Developer, Company


def email_checkr(email):
    result=db.session.query(Developer).filter(Developer.email==email).one_or_none()
    if result:
        return dict(success=False,message="Developer with this email already exists")
    else:
        result=db.session.query(Company).filter(Company.email==email).one_or_none()
        if result:
            return dict(success=False,message="Company with this email already exists")
        else:
            return dict(success=True,message="This email is available")

@app.route('/api/email', methods=['GET'])
def check_email():
    request_data = request.get_json()
    email = request_data['email'],
    return jsonify(email_checkr(email))

