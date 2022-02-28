from flask import send_from_directory
from server import app

@app.route('/')
def server():
    return send_from_directory(app.static_folder, 'index.html')
    
@app.route('/test')
def test():
    return "<h1>Testing</h1>"