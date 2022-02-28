from flask import jsonify, request
from server import app
from server.models import db, Developer, Company

@app.route('/api/email', methods=['GET'])
def check_email():
    request_data = request.get_json()
    email = request_data['email'],
    result=db.session.query(Developer).filter(Developer.email==email).one_or_none()+db.session.query(Company).filter(Company.email==email).one_or_none()
    if result:
        return jsonify(success=True)
    else:
        return jsonify(success=False)
