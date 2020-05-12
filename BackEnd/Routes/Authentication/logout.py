from flask import Flask, Blueprint, request, make_response
import psycopg2
from passlib.hash import argon2
import bcrypt
import secrets
from validate_email import validate_email
import json
import os
from flask_login import logout_user

logout = Blueprint('logout', __name__)

@logout.route("/api/logout", methods=["PUT"])
def signUserOut():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= os.getenv('DATABASE_IP', "172.17.0.1"), port = "5432", database = "recruitfindwork")
        if database:

            response = dict()

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

