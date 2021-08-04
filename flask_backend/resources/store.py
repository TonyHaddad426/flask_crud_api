from flask_restful import Resource
from flask_jwt import jwt_required
from models.store import StoreModel
from models.item import ItemModel

class Store(Resource): 
    def get(self, name): 
        store = StoreModel.find_by_name(name)
        if store: 
            return store.json(), 200 
        return {'message' : 'Store not found'}, 401

    @jwt_required() # checks for JWT in request header
    def post(self, name):
        if StoreModel.find_by_name(name): 
            return {'message' : 'A store with name {} already exists'.format(name)}, 400
        
        store = StoreModel(name,None)
        try: 
            store.save_to_db()
        except: 
            return {'message' : 'An error occurred while creating the store.'}, 500

        return store.json(), 201
        
    @jwt_required() # checks for JWT in request header
    def delete(self, name): 
        if StoreModel.find_by_name(name): 
            StoreModel.find_by_name(name).delete_from_db() 
            return {'message' : 'Store deleted'}
        return {'message' : 'Store not found'}


class StoreList(Resource): 
    def get(self): 
        stores = [] 
        for store in StoreModel.query.all():
            stores.append(store.json())
        return {'items' : stores}, 200

class StoreItem(Resource): 
    def get(self, name, item_name): 
        
        store = StoreModel.find_by_name(name)
        print(store.items)
        if not store: 
            return {'message' : 'Store not found'}, 401
        for item in store.items:
            if item.name == item_name: 
                return {'store_id' : store.id, 'store_name' : store.name, 'item_name' : item.name, 'item_price' : item.price }, 200
        return {'message' : 'Store does not have item'}, 401


