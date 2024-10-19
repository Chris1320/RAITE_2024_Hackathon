#!/usr/bin/env python3

from kybra import Opt, Principal, Record


class User(Record):
    id: Principal
    firstName: str
    lastName: str
    password: str
    hasOrganization: bool
    organizationName: Opt[str]
    organizationAddress: Opt[str]
    username: str
