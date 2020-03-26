from flask import Flask, Blueprint

reg = Blueprint('register', __name__)


@reg.route("/api/register")
def register():
    return {'status': 'successfully signed up'}