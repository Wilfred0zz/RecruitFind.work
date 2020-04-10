from flask import Flask, Blueprint, request, make_response
import psycopg2
from passlib.hash import argon2
import bcrypt
import secrets

database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")

#creates a cursor object to execute PostgreSQL commands via python
cursor = database.cursor()

log = Blueprint('login', __name__)

@log.route("/api/login", methods=["POST"])
def login():
    response = dict()
    data = request.get_json()

    email = data['email']
    cursor.execute(f"""SELECT COUNT(1) FROM public."Personal Information" WHERE email = '{email}'""")

    if not cursor.fetchone()[0]:
        response['status']= False
        response['status_info'] = 'User does not exist'
    
    else:
        password = data['password']
        cursor.execute(f"""SELECT password FROM public."Personal Information" WHERE email = '{email}'""")
        results = cursor.fetchall()

        if len(results) > 0:
            response['status']= False
            response['status_info'] = 'invalid password'
        cursor.execute(f"""SELECT salts FROM public."Personal Information" WHERE email = '{email}'""")
        salt_result = cursor.fetchone()[0]
        salt_result = str.encode(salt_result)
        for row in results:
            if encrypt_password(password, salt_result) == row[0]:
                response = make_response("Setting a cookie")
                response.set_cookie(secrets.token_hex(), 'Cookie')
                
    return response


def generate_salt_string():
    salt_string = bcrypt.gensalt()
    return salt_string

def encrypt_password(password_unencrypted, salt_string):
    encrypted_password = argon2.using(rounds=5, salt=salt_string).hash(password_unencrypted)
    return encrypted_password