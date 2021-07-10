from db import db

class StoreModel(db.Model): 

    __tablename__ = 'stores' # informs SQLAlchemy of the table, users
    id = db.Column(db.Integer, primary_key=True) 
    name = db.Column(db.String(80)) 

    items = db.relationship('ItemModel') 

    def __init__(self, name):
        self.name = name
    

    def json(self):
        return {'name' : self.name, 'items' : [item.json() for item in self.items]} 

    @classmethod 
    def find_by_name(cls, name): 
        # SELECT * FROM items WHERE name=name LIMIT 1
        # the query method is native to SQLAlchemy and enables you to build database functions
        return cls.query.filter_by(name=name).first() # returns a class object 


    def save_to_db(self): 
        db.session.add(self) # the session is a collection of objects that we are going to write to the database
        db.session.commit()


    def delete_from_db(self): 
        db.session.delete(self) # the session is a collection of objects that we are going to write to the database
        db.session.commit()


