from flask import jsonify, abort, request
from server import app
from server.models import db, Developer

@app.route('/api/developer/', methods=['GET'])
def check_dev():
    email = request.args.get('email')
    username = request.args.get('username')
    if email:
        result=db.session.query(Developer).filter(Developer.email==email).one_or_none()
        if result:
            return jsonify(email=result.email,
                    username=result.username,
                    avatar=result.avatar)
        else:
            return abort(404,'Record with this email does not exist')
    else:
        result=db.session.query(Developer).filter(Developer.username==username).one_or_none()
    if result:
        return jsonify(email=result.email,
                    username=result.username,
                    avatar=result.avatar)
    else:
        return abort(404,'Record with this username does not exist')

@app.route('/api/developer/signup', methods=['POST'])
def signup_dev():
    new_dev=Developer(
        username=request.form['username'],
        password=request.form['password'],
        name=request.form['name'],
        surname=request.form['surname'],
        avatar=request.form['avatar'],
        email=request.form['email'],
        linkedin_url=request.form['linkedin_url'],
        github_url=request.form['github_url'],
    )

    dev_Languages=request.form[' developer_Languages']