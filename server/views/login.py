from ast import Try
from flask import jsonify, request
from server import app
from server.views.checkemail import email_checkr
from argon2 import PasswordHasher

@app.route('/api/login', methods=['POST'])
def login():
    request_data = request.get_json()
    email = request_data['email']
    ph = PasswordHasher()
    type,result=email_checkr(email,True)
    if result:
        if type=="Developer":
            name=result.username
        else:
            name=result.company_name 
    else:
        return jsonify(success=False,message="This email has not been registered")
    try:
        if ph.verify(result.password,request_data['password']):
            return jsonify(success=True,message="Logged in",type=type,name=name)
    except:
        return jsonify(success=False,message="Login failed")