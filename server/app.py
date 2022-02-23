from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy

#######################################################################
app = Flask(__name__,static_folder='../client/build',static_url_path='')
@app.route('/')
def server():
    return send_from_directory(app.static_folder, 'index.html')
#######################################################################



app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:password@localhost/students'
db=SQLAlchemy(app)


@app.route('/api/getData/')
def SampleData():
    return {'name':'Nicol','passowrd':"123"}

@app.route('/test')
def test():
    return "<h1>Testing</h1>"


if __name__ == '__main__':
    app.run(debug=True)