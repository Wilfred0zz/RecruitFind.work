from flask import Flask, Blueprint, request, make_response
import psycopg2
from passlib.hash import argon2
import bcrypt
import secrets
from validate_email import validate_email
import json
import os
from flask_login import current_user, login_user, logout_user, login_required

logout = Blueprint('logout', __name__)

@logout.route("/api/logout", methods=["PUT"])
@login_required
def signUserOut():
    try:
        database = psycopg2.connect(user = "bylinkvsjtfdia", password = "b441303bb98c6533e96fa5c476852dcc067180f3a036d5bde62d61e9c5f19d5f", host= os.getenv('DATABASE_IP', "172.17.0.1") , port = "5432", database = "dauhmnvct04jp4")
        if database:

            response = dict()

            if current_user.is_authenticated():

                logout_user()
                response = make_response(json.dumps({
                    'status_info': 'User Logged Out!'
                }))
        else:
            error = "Connection to database failed!"
            response['error'] = error
            raise Exception(response)

    except Exception:            
        return (response, 400)
    
    return response

