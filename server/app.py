from crypt import methods
from flask import Flask, send_from_directory, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin

#######################################################################
app = Flask(__name__,static_folder='../client/build',static_url_path='')
@app.route('/')
def server():
    return send_from_directory(app.static_folder, 'index.html')
cors = CORS(app)
#######################################################################

app.config['SQLALCHEMY_DATABASE_URI']='postgresql://tqafvqemczrnoc:3505179c6cbe8351cd47495888ef496014877341e918f6dc9e76e2a1e342535f@ec2-3-220-214-162.compute-1.amazonaws.com:5432/dd2jk9t71796tm'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db=SQLAlchemy(app)

class User(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    email=db.Column(db.String(32),unique=True)
    password=db.Column(db.String(32))
    def __init__(self,email,password):
        self.email=email
        self.password=password

################################start db setup######################
class Developer(db.Model):
    developer_id = db.Column(db.Integer,primary_key=True)
    username = db.Column(db.String(32))
    password = db.Column(db.String(32))
    name = db.Column(db.String(32))
    surname = db.Column(db.String(32))
    avatar = db.Column(db.String(32))
    email = db.Column(db.String(32),unique=True)
    linkedin_url = db.Column(db.String(32))
    github_url = db.Column(db.String(32))
    contracts = db.relationship('Contract', backref='developer', lazy=True)
    applications = db.relationship('Application', backref='developer', lazy=True)
    blocked_company = db.relationship('Blocked_Company', backref='developer', lazy=True)
    developer_languages = db.relationship('Developer_Languages', backref='developer', lazy=True)


class Company(db.Model):
    company_id = db.Column(db.Integer,primary_key=True)
    password = db.Column(db.String(32))
    avatar = db.Column(db.String(32))
    industry = db.Column(db.String(32))
    email = db.Column(db.String(32),unique=True)
    company_name = db.Column(db.String(32),unique=True)
    contracts = db.relationship('Contract', backref='company', lazy=True)
    blocked_company = db.relationship('Blocked_Company', backref='company', lazy=True)


class Contract(db.Model):
    contract_id = db.Column(db.Integer,primary_key=True)
    developer_id = db.Column(db.Integer, db.ForeignKey('developer.developer_id'))
    company_id = db.Column(db.Integer, db.ForeignKey('company.company_id'))
    length = db.Column(db.Integer)
    value = db.Column(db.Integer)
    description = db.Column(db.String(32))
    office = db.Column(db.Boolean)
    remote = db.Column(db.Boolean)
    open = db.Column(db.Boolean)
    date_posted = db.Column(db.DateTime)
    applications = db.relationship('Application', backref='contract', lazy=True)
    contract_languages = db.relationship('Contract_languages', backref='contract', lazy=True)

class Developer_languages(db.Model):
    developer_id = db.Column(db.Integer, db.ForeignKey('developer.developer_id'))
    c = db.Column(db.Integer)
    java = db.Column(db.Integer)
    r = db.Column(db.Integer)
    python = db.Column(db.Integer)

class Contract_languages(db.Model):
    contract_id = db.Column(db.Integer, db.ForeignKey('contract.contract_id'))    
    c = db.Column(db.Integer)
    java = db.Column(db.Integer)
    r = db.Column(db.Integer)
    python = db.Column(db.Integer)

class Application(db.Model):
    contract_id = db.Column(db.Integer, db.ForeignKey('contract.contract_id'))   
    developer_id = db.Column(db.Integer, db.ForeignKey('developer.developer_id'))

class Blocked_Company(db.Model):
    developer_id = db.Column(db.Integer, db.ForeignKey('developer.developer_id')) 
    company_id = db.Column(db.Integer, db.ForeignKey('company.company_id'))   
################################end db setup#########################

@app.route('/api/getData/')
def SampleData():
    return {'name':'Nicol','passowrd':"123456"}

@app.route('/test')
def test():
    return "<h1>Testing</h1>"

@app.route('/user=<usr>',methods=['GET'])
def user(usr):
    result=db.session.query(User).filter(User.email==usr).one_or_none()
    if result:
        print(result.email)
        return jsonify(email=result.email,
                        password=result.password)
    else:
        print('User not found')
        return jsonify(email=None,
                        password=None)


if __name__ == '__main__':
    app.run(host='0.0.0.0')