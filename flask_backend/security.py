from werkzeug.security import safe_str_cmp  # enables comparison of strings across different python versions: ascii, unicode
from models.user import UserModel # provide access to all functions defined in the User class under a singular object, user





def authenticate(username, password):
    user = UserModel.find_by_username(username)
    if user and safe_str_cmp(user.password, password): 
        return user 

def identity(payload): # identity function is used to authenticate 
    user_id = payload['identity']
    return UserModel.find_by_id(user_id)