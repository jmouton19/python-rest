from flask import jsonify
from server import app

@app.route('/api/languages', methods=['GET'])
def languages():
   return jsonify(success=True,languages= ['C','C++','Go','Java','JavaScript','Kotlin','Lua','MATLAB','Objective-C','Perl','Python','PHP','Rust','Swift','VBA','C#','TypeScript','Ruby','R'])