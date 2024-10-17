from kybra import (
    nat64,
    Principal,
    Record,
    Vec,
    Opt
)

class User(Record):
    id: Principal
    firstName: str
    lastName: str
    password: str
    hasOrganization: bool
    organizationName: Opt[str]
    organizationAddress: Opt[str]
    username: str