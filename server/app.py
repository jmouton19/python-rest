from crypt import methods
from flask import Flask, send_from_directory, jsonify
from flask_sqlalchemy import SQLAlchemy

#######################################################################
app = Flask(__name__,static_folder='../client/build',static_url_path='')
@app.route('/')
def server():
    return send_from_directory(app.static_folder, 'index.html')
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