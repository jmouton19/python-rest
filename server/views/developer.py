from calendar import c
from flask import jsonify, abort, request
from server import app
from server.models import db, Developer, DeveloperLanguages

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
    request_data = request.get_json()
    new_dev=Developer(
        password=request_data['password'],
        username=request_data['username'],
        name=request_data['name'],
        surname=request_data['surname'],
        avatar=request_data['avatar'],
        email=request_data['email'],
        linkedin_url=request_data['linkedin_url'],
        github_url=request_data['github_url'],
    )
    db.session.add(new_dev)
    db.session.commit()

    dev_languages=request_data['developer_languages']
    new_dev_languages=DeveloperLanguages(
        c=dev_languages['C'],
        java=dev_languages['Java'],
        r=dev_languages['R'],
        python=dev_languages['Python']
    )
    new_dev.developer_languages=new_dev_languages
    db.session.add(new_dev)
    db.session.commit()
    return jsonify(success=True)
