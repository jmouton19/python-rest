from flask import send_from_directory
from server import app

@app.route('/')
@app.route('/profile')
@app.route('/contracts')
@app.route('/addcontract')
@app.route('/signup')
@app.route('/login')
@app.route('/about')
def server():
    return send_from_directory(app.static_folder, 'index.html')
    
@app.route('/test')
def test():
    return "<h1>Testing</h1>"