from flask_restful import Resource,reqparse
from models.user import UserModel



class UserRegister(Resource):
    parser = reqparse.RequestParser() # initialize new object to parse request 
    parser.add_argument('username', type=str, required=True, help="This field can't be blank")
    parser.add_argument('password', type=str, required=True, help="This field can't be blank")

    @classmethod # cls now references the UserRegister class
    def post(cls):  
        request_data = cls.parser.parse_args()

        if UserModel.find_by_username(request_data['username'].lower()): # if the username already exists, return error message
            return {"message" : "User already exists"}, 400
            
        if len(request_data['username']) < 4 & len(request_data['password']) < 6:
            return {"message" : "Username must be at least 4 characters and password must be at least 6 characters"}, 400

        if len(request_data['password']) < 6:
            return {"message" : "Password must be at least 6 characters"}, 400

        if len(request_data['username']) < 4:
            return {"message" : "Username must be at least 4 characters"}, 400

        

        user = UserModel(request_data['username'].lower(), request_data['password'])
        user.save_to_db()

        return {"message" : "User created succesfully"}, 201

