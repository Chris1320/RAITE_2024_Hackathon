#!/usr/bin/env python3

import json

from storage import users

from models.users import User


def is_username_unique(username: str) -> bool:
    for user in users.values():
        if user["username"] == username:
            return False
    return True


def get_user(username: str) -> User:
    for user in users.values():
        if user["username"] == username:
            return user
    return None


def update_user(username: str, update_val: str) -> User:
    for user in users.values():
        if user["username"] == username:
            data = json.loads(update_val)
            updated_user: User = {
                "id": user["id"],
                "firstName": data["firstName"],
                "lastName": data["lastName"],
                "password": data["password"],
                "hasOrganization": data["hasOrganization"],
                "organizationName": data["organizationName"],
                "organizationAddress": data["organizationAddress"],
                "username": data["username"],
            }
            users.insert(updated_user["id"], updated_user)
            return user
    return None
