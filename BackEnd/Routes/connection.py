from flask import Flask, Blueprint


connect = Blueprint('connection', __name__)


@connect.route("/api/connection")
def connection():
    return {'status': 'successfully signed up'}