from calendar import c
from hashlib import new
from flask import jsonify, request
from server import app
from server.models import db, Contract, Company
import datetime

@app.route('/api/contract', methods=['POST'])
def post_contract():
    request_data = request.get_json()
    company_name=request_data['company_name']
    company=db.session.query(Company).filter(Company.company_name==company_name).one_or_none()

    new_contract=Contract(
    length=request_data['length'],
    value=request_data['value'],
    description=request_data['description'],
    remote=request_data['remote'],
    open=request_data['open'],
    date_posted=datetime.datetime.now()
    )
    company.contracts.append(new_contract)
    db.session.commit()
    return jsonify(success=True)