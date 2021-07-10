import sqlite3
from db import db
class UserModel(db.Model): 

    __tablename__ = 'users' # informs SQLAlchemy of the table, users
    id = db.Column(db.Integer, primary_key=True) 
    username = db.Column(db.String(80)) 
    password = db.Column(db.String(80))

    def __init__(self, username, password): # this will act as a store of user data
        self.username = username
        self.password = password

    def save_to_db(self): 
        db.session.add(self) 
        db.session.commit()

    @classmethod # enables you to invoke a class within a function using a generic expression, cls, as opposed to the physical class name
    def find_by_username(cls, username): 
        return cls.query.filter_by(username=username).first() 

    @classmethod # enables you to invoke a class within a function using a generic expression, cls, as opposed to the physical class name
    def find_by_id(cls, _id): 
        return cls.query.filter_by(id=_id).first()

