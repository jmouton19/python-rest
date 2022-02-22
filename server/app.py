from flask import Flask, send_from_directory
from flask_cors import CORS, cross_origin
import os

app = Flask(__name__,static_folder='../client/build',static_url_path='')

cors = CORS(app)

@app.route('/api/')
@cross_origin()
def Welcome():
    return "Welcome to the API!!!"

@app.route('/api/getData/')
@cross_origin()
def SampleData():
    return {"Subject": "Computer Science", "Module": "CS334"}

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0')