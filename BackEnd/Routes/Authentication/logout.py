from flask import Flask, Blueprint, request, make_response
import psycopg2
from passlib.hash import argon2
import bcrypt
import secrets
from validate_email import validate_email
import json

logout = Blueprint('logout', __name__)

@logout.route("/api/logout", methods=["PUT"])
def signUserOut():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")
        if database:
            cursor = database.cursor()
            response = dict()

            token = request.cookies.get('token')

            if token:
                cursor.execute(f"""UPDATE public."Personal Information" SET token=null WHERE token='{token}'""")
                database.commit()

                response = make_response(json.dumps({
                            'status_info': 'User Logged Out!'
                        }))
                response.set_cookie('token', '', expires=0)
            else:
                error = "Invalid Token!"
                response['error'] = error
                raise Exception(response)
        else:
            error = "Connection to database failed!"
            response['error'] = error
            raise Exception(response)

    except Exception:            
        return (response, 400)
    
    return response

