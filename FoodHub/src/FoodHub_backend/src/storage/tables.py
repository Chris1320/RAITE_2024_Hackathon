from kybra import (
    blob,
    ic,
    nat64,
    Opt,
    Principal,
    Record,
    StableBTreeMap,
    Variant,
    Vec
)
import User

users = StableBTreeMap[Principal, User](
    memory_id=2, max_key_size=38, max_value_size=1_000_000
)
