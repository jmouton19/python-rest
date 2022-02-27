from flask import Flask
from flask_cors import CORS

app = Flask(__name__,static_folder='../client/build',static_url_path='')
app.config['SQLALCHEMY_DATABASE_URI']='postgresql://tqafvqemczrnoc:3505179c6cbe8351cd47495888ef496014877341e918f6dc9e76e2a1e342535f@ec2-3-220-214-162.compute-1.amazonaws.com:5432/dd2jk9t71796tm'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
cors = CORS(app)

from server.views import developer,main