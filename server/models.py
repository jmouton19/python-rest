from server import app
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy(app)

class Developer(db.Model):
    developer_id = db.Column(db.Integer,primary_key=True)
    username = db.Column(db.String(254),unique=True)
    password = db.Column(db.String(254))
    name = db.Column(db.String(254))
    surname = db.Column(db.String(254))
    avatar = db.Column(db.String(254))
    email = db.Column(db.String(254),unique=True)
    linkedin_url = db.Column(db.String(254))
    github_url = db.Column(db.String(254))
    applications = db.relationship('Application', backref='developer', cascade = "all, delete, delete-orphan")#1tomany
    jobs = db.relationship('Contract', backref='developer')#1tomany
    blocked_companies = db.relationship('BlockedCompany', backref='developer', cascade = "all, delete, delete-orphan")#1tomany
    developer_languages = db.relationship('DeveloperLanguages', backref='developer', uselist=False, cascade = "all, delete, delete-orphan")#1to1

class Company(db.Model):
    company_id = db.Column(db.Integer,primary_key=True)
    password = db.Column(db.String(254))
    avatar = db.Column(db.String(254))
    industry = db.Column(db.String(254))
    email = db.Column(db.String(254),unique=True)
    company_name = db.Column(db.String(254),unique=True)
    blockings = db.relationship('BlockedCompany', backref='company', cascade = "all, delete, delete-orphan")#1tomany
    contracts = db.relationship('Contract', backref='company', cascade = "all, delete, delete-orphan")#1tomany

class Contract(db.Model):
    contract_id = db.Column(db.Integer,primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey('company.company_id'))
    developer_username = db.Column(db.String(254), db.ForeignKey('developer.username'))
    length = db.Column(db.Integer)
    value = db.Column(db.Integer)
    title = db.Column(db.String(254))
    description = db.Column(db.String(1000))
    remote = db.Column(db.Boolean)
    open = db.Column(db.Boolean)
    date_posted = db.Column(db.DateTime)
    applications = db.relationship('Application', backref='contract', cascade = "all, delete, delete-orphan")#1tomany
    contract_languages = db.relationship('ContractLanguages', backref='contract', uselist=False, cascade = "all, delete, delete-orphan" )#1to1

class DeveloperLanguages(db.Model):
    developer_id = db.Column(db.Integer, db.ForeignKey('developer.developer_id'),primary_key=True)
    python = db.Column(db.Integer)
    java = db.Column(db.Integer)
    javascript = db.Column(db.Integer)
    r = db.Column(db.Integer)
    c = db.Column(db.Integer)
    c_plusplus = db.Column(db.Integer)
    c_sharp = db.Column(db.Integer)
    swift = db.Column(db.Integer)
    objective_c = db.Column(db.Integer)
    php = db.Column(db.Integer)
    matlab = db.Column(db.Integer)
    typescript = db.Column(db.Integer)    
    go = db.Column(db.Integer)    
    rust = db.Column(db.Integer)    
    vba = db.Column(db.Integer) 
    ruby = db.Column(db.Integer) 
    kotlin = db.Column(db.Integer) 
    perl = db.Column(db.Integer) 
    lua = db.Column(db.Integer) 
    
class ContractLanguages(db.Model):
    contract_id = db.Column(db.Integer, db.ForeignKey('contract.contract_id'),primary_key=True)    
    python = db.Column(db.Integer)
    java = db.Column(db.Integer)
    javascript = db.Column(db.Integer)
    r = db.Column(db.Integer)
    c = db.Column(db.Integer)
    c_plusplus = db.Column(db.Integer)
    c_sharp = db.Column(db.Integer)
    swift = db.Column(db.Integer)
    objective_c = db.Column(db.Integer)
    php = db.Column(db.Integer)
    matlab = db.Column(db.Integer)
    typescript = db.Column(db.Integer)    
    go = db.Column(db.Integer)    
    rust = db.Column(db.Integer)    
    vba = db.Column(db.Integer) 
    ruby = db.Column(db.Integer) 
    kotlin = db.Column(db.Integer) 
    perl = db.Column(db.Integer) 
    lua = db.Column(db.Integer) 

class Application(db.Model):
    contract_id = db.Column(db.Integer, db.ForeignKey('contract.contract_id'),primary_key=True)   
    developer_id = db.Column(db.Integer, db.ForeignKey('developer.developer_id'),primary_key=True)

class BlockedCompany(db.Model):
    developer_id = db.Column(db.Integer, db.ForeignKey('developer.developer_id'),primary_key=True) 
    company_id = db.Column(db.Integer, db.ForeignKey('company.company_id'),primary_key=True)   

if __name__ == "__main__":
    db.create_all()