from flask_restful import Resource, reqparse
from flask_jwt import jwt_required
from models.item import ItemModel

# resources map endpoints 
class Item(Resource): 
    parser = reqparse.RequestParser() # initialize new object to parse request 
    parser.add_argument('price', type=float, required=True, help="This field can't be blank")
    parser.add_argument('store_id', type=int, required=True, help="Every item needsa a store id")

    @jwt_required() # checks for JWT in request header
    def get(self, name): 
        item = ItemModel.find_by_name(name)

        if item is None: 
            return {"message" : "{} not found".format(name)}, 404
        return item.json(), 200 # the row object stores the result of the select * into a list, 


    def post(self,name): 
        # check to see if the item already exists before creating a new one in database
        if ItemModel.find_by_name(name):
            return {"message" : "{} already exists".format(name)}, 400

        request_data = Item.parser.parse_args() # parses through the payload and inserts valid args into request_data 
        item = ItemModel(name, request_data['price'], request_data['store_id']) # initializes ItemModel object 
        # since the item does not exist, insert the new item into the database
        try: 
            item.save_to_db() 
        except: 
            return {"message" : "An error occurred inserting the item"}, 500 
        
        return item.json(), 201 # 201 indicates an item has been created


    def delete(self, name): 
        item = item.find_by_name(name) 
        if item: 
            item.delete_from_db() 
        
        return {'message' : 'Item deleted'}, 201


    def put(self, name):
        request_data = Item.parser.parse_args() # parses through the payload and inserts valid args into request_data
        # VERIFY ITEM EXISTS
        item = ItemModel.find_by_name(name)
 
        if item is None: # If item does not exist, insert it into database
            item = ItemModel(name, request_data['price'], request_data['store_id'])

        else: # else, if the item does exist, update the existing item with the new price
            item.price = request_data['price']
            #item.store_id = request_data['store_id']

        item.save_to_db()

        
        return item.json(), 200


class ItemList(Resource): 
    def get(self): 
        items = [] 
        for item in ItemModel.query.all():
            items.append(item.json())
        return {'items' : items}
