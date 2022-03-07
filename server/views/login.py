from flask import jsonify, request
from server import app
from server.views.checkemail import email_checkr
from argon2 import PasswordHasher

@app.route('/api/login', methods=['POST'])
def login():
    request_data = request.get_json()
    email = request_data['email']
    ph = PasswordHasher()
    hash_received = ph.hash(request_data['password'])
    type,result=email_checkr(email,True)
    if result:
        if type=="Developer":
            name=result.username
        else:
            name=result.company_name 
    else:
        return jsonify(success=False,message="This email has not been registered")
    if hash_received==result.password:
         return jsonify(success=True,message="Logged in",type=type,name=name)
    return jsonify(success=False,message="Login failed")