from crypt import methods
from flask import Flask, send_from_directory, jsonify
from flask_sqlalchemy import SQLAlchemy

#######################################################################
app = Flask(__name__,static_folder='../client/build',static_url_path='')
@app.route('/')
def server():
    return send_from_directory(app.static_folder, 'index.html')
#######################################################################

app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:qwerty4862@localhost:5432/group8'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db=SQLAlchemy(app)

class User(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    email=db.Column(db.String(32),unique=True)
    password=db.Column(db.String(32))
    def __init__(self,email,password):
        self.email=email
        self.password=password


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
    db.create_all()
    app.run(debug=True)