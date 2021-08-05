from db import db

class ItemModel(db.Model): 

    __tablename__ = 'items' # informs SQLAlchemy of the table, users
    id = db.Column(db.Integer, primary_key=True) 
    name = db.Column(db.String(80)) 
    price = db.Column(db.Float(precision=2))

    store_id = db.Column(db.Integer, db.ForeignKey('stores.id')) # links items to the respetive store in the stores table
    store = db.relationship('StoreModel') # every item model has a property store which matches to a store id


    def __init__(self, name, price, store_id, store_name):
        # initialize an object which holds data that will be stored in the database
        self.name = name
        self.price = price
        self.store_id = store_id
        

    def json(self, store_name):
        return {'item_name' : self.name, 'item_price' : self.price, 'store_id' : self.store_id, 'store_name' : store_name} 

    @classmethod 
    def find_by_name(cls, name): 
        # SELECT * FROM items WHERE name=name LIMIT 1
        # the query method is native to SQLAlchemy and enables you to build database functions
        return cls.query.filter_by(name=name).all() # returns a class object 


    def save_to_db(self): 
        db.session.add(self) # the session is a collection of objects that we are going to write to the database
        db.session.commit()


    def delete_from_db(self): 
        db.session.delete(self) # the session is a collection of objects that we are going to write to the database
        db.session.commit()


