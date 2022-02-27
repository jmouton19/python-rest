from app import db

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

class Developerlanguages(db.Model):
    develepor_languages_id=db.Column(db.Integer,primary_key=True)
    developer_id = db.Column(db.Integer, db.ForeignKey('developer.developer_id'))
    c = db.Column(db.Integer)
    java = db.Column(db.Integer)
    r = db.Column(db.Integer)
    python = db.Column(db.Integer)

class Contractlanguages(db.Model):
    contract_languages_id=db.Column(db.Integer,primary_key=True)
    contract_id = db.Column(db.Integer, db.ForeignKey('contract.contract_id'))    
    c = db.Column(db.Integer)
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