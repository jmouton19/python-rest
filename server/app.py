from crypt import methods
from flask import Flask, send_from_directory, jsonify, request
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
#######################################################################

app.config['SQLALCHEMY_DATABASE_URI']='postgresql://tqafvqemczrnoc:3505179c6cbe8351cd47495888ef496014877341e918f6dc9e76e2a1e342535f@ec2-3-220-214-162.compute-1.amazonaws.com:5432/dd2jk9t71796tm'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db=SQLAlchemy(app)

class User(Resource):
    def get(self,usr):
    #     result=db.session.query(User).filter(User.email==usr).one_or_none()
    #     if result
    #         print(result.email)
    #         return jsonify(email=result.email,
    #                     password=result.password)
    #     else
    #         print('User not found')
    #         return jsonify(email=None,
    #                     password=None)

    # def post(self)
    #     type=request.form['type']
    #     name=request.form['name']
    #     print(type,name)
    #     return {'ok''oke'}
        if usr=='pog':
            return {'stat''pog'}

api.add_resource(User, '/api/user=<usr>')

@app.route('/api/getData/')
def SampleData():
    return {'name':'Nicol','passowrd':"123456"}

@app.route('/test')
def test():
    return "<h1>Testing</h1>"

if __name__ == '__main__':
    app.run(host='0.0.0.0')