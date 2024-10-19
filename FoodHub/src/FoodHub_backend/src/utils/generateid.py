#!/usr/bin/env python3

from kybra import Principal, ic


def generate_id() -> Principal:
    return ic.caller()
