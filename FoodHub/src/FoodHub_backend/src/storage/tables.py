#!/usr/bin/env python3

from kybra import Principal, StableBTreeMap

from models.users import User

users = StableBTreeMap[Principal, User](
    memory_id=2, max_key_size=38, max_value_size=1_000_000
)
