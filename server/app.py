from flask import Flask, send_from_directory

app = Flask(__name__,static_folder='../client/build',static_url_path='')

@app.route('/api/')
def Welcome():
    return "Welcome to the API!!!"

@app.route('/api/getData/')
def SampleData():
    return {"Subject": "Computer Science", "Module": "CS334"}

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0')