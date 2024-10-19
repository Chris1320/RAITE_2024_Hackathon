#!/usr/bin/env python3

import json

from kybra import Opt, Principal, Record, StableBTreeMap, Vec, blob, query, update
from storage import users
from utils import generate_id, get_user, is_username_unique, update_user

from .models.users import User


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


@update
def register_user(register_string: str) -> str:
    """
    Add a new user to the database.

    :param register_string: a JSON string containing the user's information.

    :return: a JSON string containing whether the user was successfully registered.
    """

    data = json.loads(register_string)

    if not is_username_unique(data["username"]):
        json.dumps({"registered": False, "message": "Username is already registered"})

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
    return json.dumps({"registered": True})


@update
def login_user(login_payload: str) -> str:
    """
    Check if the user is registered and if the password is correct.
    """

    data = json.loads(login_payload)
    user = get_user(data["username"])

    if user is None:
        return json.dumps({"logged": False, "message": "Username is not registered"})

    if user["password"] != data["password"]:
        return json.dumps({"logged": False, "message": "Password is incorrect"})

    return json.dumps(
        {"logged": True, "message": "successful login", "token": user["username"]}
    )


@query
def retrieve_profile(username: str) -> str:

    if not username:
        return json.dumps({"message": "not authenticated"})

    user = get_user(username)
    if user is None:
        return json.dumps({"message": "user profile not found"})

    user.pop("id")
    return json.dumps(
        {"message": "retrieved user profile successfully", "payload": user}
    )


@update
def update_profile(username: str, payload: str) -> str:
    if not username:
        return json.dumps({"message": "not authenticated"})

    update_user(username, payload)


@query
def getImage(id: Principal) -> Opt[Test]:
    return sampleST.get(id)


@query
def getAllImages() -> Vec[Test]:
    return sampleST.values()


@update
def upload(image: blob) -> Test:
    id = generate_id()

    item: Test = {"id": id, "item": image}

    sampleST.insert(item["id"], item)
    return item


sampleST = StableBTreeMap[Principal, Test](
    memory_id=1, max_key_size=38, max_value_size=100_000_000
)
