#!/usr/bin/env python3

import User
from kybra import Principal, StableBTreeMap

users = StableBTreeMap[Principal, User](
    memory_id=2, max_key_size=38, max_value_size=1_000_000
)
