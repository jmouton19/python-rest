from crypt import methods
from flask import Flask, send_from_directory, jsonify, request, abort
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_restful import Resource, Api

#######################################################################
app = Flask(__name__,static_folder='../client/build',static_url_path='')
@app.route('/')
def server():
    return send_from_directory(app.static_folder, 'index.html')
cors = CORS(app)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI']='postgresql://tqafvqemczrnoc:3505179c6cbe8351cd47495888ef496014877341e918f6dc9e76e2a1e342535f@ec2-3-220-214-162.compute-1.amazonaws.com:5432/dd2jk9t71796tm'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db=SQLAlchemy(app)
#######################################################################

class Developer(db.Model):
    developer_id = db.Column(db.Integer,primary_key=True)
    username = db.Column(db.String(254))
    password = db.Column(db.String(254))
    name = db.Column(db.String(254))
    surname = db.Column(db.String(254))
    avatar = db.Column(db.String(254))
    email = db.Column(db.String(254),unique=True)
    linkedin_url = db.Column(db.String(254))
    github_url = db.Column(db.String(254))

    contracts = db.relationship('Contract', backref='developer') #1tomany
    applications = db.relationship('Application', backref='developer')#1tomany
    blocked_companies = db.relationship('BlockedCompany', backref='developer')#1tomany
    developer_languages = db.relationship('DeveloperLanguages', backref='developer', uselist=False)#1to1


class Company(db.Model):
    company_id = db.Column(db.Integer,primary_key=True)
    password = db.Column(db.String(254))
    avatar = db.Column(db.String(254))
    industry = db.Column(db.String(254))
    email = db.Column(db.String(254),unique=True)
    company_name = db.Column(db.String(254),unique=True)

    contracts = db.relationship('Contract', backref='company')#1tomany

class Contract(db.Model):
    contract_id = db.Column(db.Integer,primary_key=True)
    developer_id = db.Column(db.Integer, db.ForeignKey('developer.developer_id'))
    company_id = db.Column(db.Integer, db.ForeignKey('company.company_id'))
    length = db.Column(db.Integer)
    value = db.Column(db.Integer)
    description = db.Column(db.String(254))
    office = db.Column(db.Boolean)
    remote = db.Column(db.Boolean)
    open = db.Column(db.Boolean)
    date_posted = db.Column(db.DateTime)

    applications = db.relationship('Application', backref='contract')#1tomany
    contract_languages = db.relationship('Contractlanguages', backref='contract', uselist=False)#1to1

class DeveloperLanguages(db.Model):
    develepor_languages_id=db.Column(db.Integer,primary_key=True)
    developer_id = db.Column(db.Integer, db.ForeignKey('developer.developer_id'))
    c = db.Column(db.Integer)
    java = db.Column(db.Integer)
    r = db.Column(db.Integer)
    python = db.Column(db.Integer)

class Contractlanguages(db.Model):
    contract_languages_id=db.Column(db.Integer,primary_key=True)
    contract_id = db.Column(db.Integer, db.ForeignKey('contract.contract_id'))    
    java = db.Column(db.Integer)
    r = db.Column(db.Integer)
    python = db.Column(db.Integer)

class Application(db.Model):
    application_id=db.Column(db.Integer,primary_key=True)
    contract_id = db.Column(db.Integer, db.ForeignKey('contract.contract_id'))   
    developer_id = db.Column(db.Integer, db.ForeignKey('developer.developer_id'))

class BlockedCompany(db.Model):
    blocked_company_id=db.Column(db.Integer,primary_key=True)
    developer_id = db.Column(db.Integer, db.ForeignKey('developer.developer_id')) 
    company_id = db.Column(db.Integer, db.ForeignKey('company.company_id'))   
#########################################################

class User(Resource):
    def get(self,usr):
        result=db.session.query(Developer).filter(Developer.email==usr).one_or_none()
        if result:
            print(result.email)
            return jsonify(email=result.email,
                        username=result.username,
                        avatar=result.avatar)
        else:
            print('User not found')
            return abort(400,'User does not exist')

api.add_resource(User, '/api/user=<usr>')

@app.route('/test')
def test():
    return "<h1>Testing</h1>"

if __name__ == '__main__':
    app.run(host='0.0.0.0')