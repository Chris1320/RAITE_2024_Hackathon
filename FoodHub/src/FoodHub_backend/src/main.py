
from kybra import (
    query, 
    update,
    blob,
    ic,
    nat64,
    nat8,
    Opt,
    Principal,
    Record,
    StableBTreeMap,
    Variant,
    Vec,
)

import json
from storage import users
from utils import (
    is_username_unique, 
    generate_id, 
    get_user,
    encrypt,
    decrypt,
    generate_key
)
import User


class Test(Record):
    id: Principal
    item: blob
    
@query
def greet(name: str) -> str:
    return f"Hello, {name}!"

@query
def sample() -> str:
    print("something something")
    return "some has been done"

# register
@update
def registermethod(register_string: str) -> str: 
    result = {}
    #decode to json
    data = json.loads(register_string)
    
    if (is_username_unique(data["username"])):   
        id = generate_id()
        user: User = {
            "id": id,
            "firstName": data["firstName"],
            "lastName": data["lastName"],
            "password": data["password"],
            "hasOrganization": data["hasOrganization"],
            "organizationName": data["organizationName"],
            "organizationAddress": data["organizationAddress"],
            "username": data["username"],
        }
        users.insert(user["id"], user)
        result["registered"]= True
    else:
        result["registered"] = False
        result["message"] = "Username is already registered"
    return json.dumps(result)

#login
@update
def loginmethod(login_payload: str) -> str:
    data = json.loads(login_payload)
    result = {}
    user = get_user(data["username"])

    if(user == None):
        result["logged"] = False
        result["message"] = "Username is not registered"
    else:
        if(user["password"] != data["password"]):
            result["logged"] = False
            result["message"] = "Password is incorrect"
        else:
            result["logged"] = True
            result["message"] = "successful login"
            result["key"] = generate_key()
            user.pop("id")
            result["loggeduser"] = encrypt(user, result["key"])
            # will return { logged: true, message: "successful login", loggeduser: <some encrypted token>, key: <generated key> }
    return json.dumps(result)

#Authenticated route, pls include (payload, token, key) for every authenticated route.
# payload for anything submitted (serialized form values)

@query
def retrieve_profile(token: Vec[nat8], key: Vec[nat8]) -> str:

    result = {}
    
    if (not token and not key):
        result["message"] = "Token and Key are required"
        
    
    user_str = decrypt(token, key)
    result["message"] = "retrieved user profile successfully"
    result["payload"] = user_str
    return json.dumps(result)

@query
def getImage(id: Principal) -> Opt[Test]:
    return sampleST.get(id)

@query
def getAllImages() -> Vec[Test]:
    return sampleST.values()

@update
def upload(image: blob) -> Test:
    id = generate_id()
    
    item : Test = {
        "id": id,
        "item": image
    }
    
    sampleST.insert(item["id"], item)
    return item

sampleST = StableBTreeMap[Principal, Test] (
    memory_id=1, max_key_size=38, max_value_size=100_000_000
)

