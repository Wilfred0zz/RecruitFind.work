from flask import Flask, Blueprint, request, make_response
import psycopg2
from passlib.hash import argon2
import bcrypt
import secrets
from validate_email import validate_email
import json
from datetime import timedelta
import os
from flask_login import current_user, login_user, logout_user, login_required

log = Blueprint('login', __name__)

class User():
    def __init__(self, email):
        self.email = email
    def is_authenticated(self):
        return True
    def is_active(self):
        return True
    def is_anonymous(self):
        return False
    def get_id(self):
        return self.email


@log.route("/api/login", methods=["POST", "GET"])
def login():
    try:
        database = psycopg2.connect(user = "bylinkvsjtfdia", password = "b441303bb98c6533e96fa5c476852dcc067180f3a036d5bde62d61e9c5f19d5f", host= os.getenv('DATABASE_IP', "172.17.0.1") , port = "5432", database = "dauhmnvct04jp4")
        if database:
            cursor = database.cursor()
            response = dict()
            data = request.get_json()

            email = data['email'].lower()

            if len(email) == 0:
                error = "Email Needs Value!"
                response["error"] = error
                raise Exception(response)

            isValid = validate_email(email)
            if(not isValid):
                response['error'] = "Entered Email Is Not Valid!" 
                raise Exception(response)

            password = data['password']
            if(len(password) == 0):
                error = "Password Needs Value!"
                response["error"] = error
                raise Exception(response)

            cursor.execute(f"""SELECT COUNT(1) FROM public."Personal Information" WHERE email = '{email}'""")

            if not cursor.fetchone()[0]:
                error = "User Doesn't Exist!"
                response['error'] = error
                raise Exception(response)
            
            else:
                
                cursor.execute(f"""SELECT password FROM public."Personal Information" WHERE email = '{email}'""")
                results = cursor.fetchall()

                cursor.execute(f"""SELECT salts FROM public."Personal Information" WHERE email = '{email}'""")
                salt_result = cursor.fetchone()[0]
                salt_result = str.encode(salt_result)
                for row in results:
                    if encrypt_function(password, salt_result) == row[0]:
                        cursor.execute(f"""SELECT status FROM public."Personal Information" WHERE email = '{email}'""")
                        statusInfo = cursor.fetchone()[0]
                        response = make_response(json.dumps({
                            'status_info': 'User Logged In',
                            'status': statusInfo
                        }))

                        login_user(User(email), remember=True, duration=timedelta(days=1))
                      
                    else:
                        error = "Incorrect Password"
                        response['error'] = error
                        raise Exception(response)

        else:
            error = "Connection to database failed!"
            response['error'] = error
            raise Exception(response)

    except Exception:            
        return (response, 400)
    
    return response

def generate_salt_string():
    salt_string = bcrypt.gensalt()
    return salt_string

def encrypt_function(unencrypted_value, salt_string):
    encrypted_value = argon2.using(rounds=5, salt=salt_string).hash(unencrypted_value)
    return encrypted_value