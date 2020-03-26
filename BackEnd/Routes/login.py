from flask import Flask, Blueprint

log = Blueprint('login', __name__)


@log.route("/api/login")
def login():
    return {'status': 'successfully logged in'}