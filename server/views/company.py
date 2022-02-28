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
    # db.session.add(new_company)
    # db.session.commit()
    return jsonify(success=True)
