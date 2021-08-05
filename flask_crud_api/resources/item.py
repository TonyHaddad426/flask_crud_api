from flask_restful import Resource, reqparse
from flask_jwt import jwt_required
from models.item import ItemModel
from models.store import StoreModel
# resources map endpoints 
class Item(Resource): 
    parser = reqparse.RequestParser() # initialize new object to parse request 
    parser.add_argument('item_price', type=float, required=True, help="This field can't be blank")
    parser.add_argument('store_id', type=int, required=True, help="Every item needsa a store id")
    parser.add_argument('store_name', type=str, required=True, help="Every item needsa a store name")


    def get(self, name): 
        
        items = ItemModel.find_by_name(name)
        
        if items is None: 
            return {"message" : "{} not found".format(name)}, 404

        arr = [] 
        for item in items:
            arr.append(item.json(item.store.name))
        
        return arr, 200 # the row object stores the result of the select * into a list, 

    @jwt_required() # checks for JWT in request header
    def post(self,name): 
        request_data = Item.parser.parse_args() # parses through the payload and inserts valid args into request_data 
       
        # check to see if the item already exists in the store before creating a new one in database       
        for item in ItemModel.find_by_name(name):
            if item.store.id == request_data['store_id']:
                return {"message" : "{} already exists in this store".format(name)}, 400
        

        
        new_item = ItemModel(name, request_data['item_price'], request_data['store_id'], request_data['store_name']) # initializes ItemModel object 
        # since the item does not exist, insert the new item into the database
        try: 
            new_item.save_to_db() 
        except: 
            return {"message" : "An error occurred inserting the item"}, 500 
        
        return new_item.json(request_data['store_name']), 201 # 201 indicates an item has been created

    @jwt_required() # checks for JWT in request header
    def delete(self, name): 
        item = item.find_by_name(name) 
        if item: 
            item.delete_from_db() 
        
        return {'message' : 'Item deleted'}, 201

    @jwt_required() # checks for JWT in request header
    def put(self, name):
        request_data = Item.parser.parse_args() # parses through the payload and inserts valid args into request_data
        # VERIFY ITEM EXISTS
        item = ItemModel.find_by_name(name)
 
        if item is None: # If item does not exist, insert it into database
            item = ItemModel(name, request_data['item_price'], request_data['store_id'], request_data['store_name'])

        else: # else, if the item does exist, update the existing item with the new price
            item.price = request_data['item_price']
            #item.store_id = request_data['store_id']

        item.save_to_db()

        
        return item.json(), 200


class ItemList(Resource): 
    def get(self): 
        print(ItemModel.query.join(StoreModel).all())
        items = [] 
        for item in ItemModel.query.all():
            items.append(item.json(item.store.name))
        return {'items' : items}
