import os 
from flask import Flask
from flask_restful import Api
from flask_jwt import JWT
from flask_cors import CORS

from security import authenticate, identity

from resources.user import UserRegister
from resources.item import Item, ItemList
from resources.store import Store, StoreList, StoreItem


#DEPENDENCIES
# pip install flask-RESTful
# pip install flask 
# pip install flask-JWT - enables the ability to obfuscate data
# pip install Flask-SQLAlchemy - maps objects to database rows
# pip install flask-cors

#jsonify is a method to convert dicts into JSON

# the static_folder argument tells flask where the static React.JS build folder is
app = Flask(__name__, static_folder='react_frontend/build', static_url_path='') # create Flask object 
CORS(app, resources={r"/*": {"origins": "*"}}) # allow CORS for all domains on all routes
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI', 'sqlite:///data.db') # asks the OS for the defined environment variable
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # turns off flask sqlalchemy modification tracker 
api = Api(app) 

# load React app as soon as the Flask app starts
@app.route('/', methods["GET"])
def index(): 
    return app.send_static_file('index.html')

# load React app as soon as the Flask app starts
@app.errorhandler(404)
def not_found(e): 
    return app.send_static_file('index.html')

jwt = JWT(app, authenticate, identity) # JWT creates a new endpoint, /auth, and routes the payload to the authenticate and identity checks in security.py

api.add_resource(Store, '/store/<string:name>') # http://127.0.0.1:5000/store/
api.add_resource(Item, '/item/<string:name>') # http://127.0.0.1:5000/item/
api.add_resource(StoreItem, '/store/<string:name>/<string:item_name>')
api.add_resource(ItemList, '/items')
api.add_resource(StoreList, '/stores')
api.add_resource(UserRegister, '/register') # when we execute a post request to /register, the post request function in UserRegister class will be called

if __name__ == '__main__': # the file that gets executed is always named __main__
    from db import db
    db.init_app(app)
    app.run(port=5000, debug=True)


