from flask import Flask, Blueprint, request, make_response
import psycopg2
from passlib.hash import argon2
import bcrypt
import secrets
from BackEnd.Database.databaseConnection import database


#creates a cursor object to execute PostgreSQL commands via python
cursor = database.cursor()

log = Blueprint('login', __name__)

@log.route("/api/login", methods=["POST"])
def login():
    response = dict()
    data = request.get_json()

    email = data['email']
    cursor.execute(f"""SELECT COUNT(1) FROM public."Personal Information" WHERE email = '{email}'""")

    #checks to see whether or not the user exists
    if not cursor.fetchone()[0]:
        response['status']= False
        response['status_info'] = 'User does not exist'
    
    else:
        password = data['password']
        cursor.execute(f"""SELECT password FROM public."Personal Information" WHERE email = '{email}'""")
        results = cursor.fetchall()

        #fetches the salt that's associated with the user, creates a replica encrypted password, and compares it with the one that's already stored in the database
        cursor.execute(f"""SELECT salts FROM public."Personal Information" WHERE email = '{email}'""")
        salt_result = cursor.fetchone()[0]
        salt_result = str.encode(salt_result)
        for row in results:
            if encrypt_function(password, salt_result) == row[0]:
                tokenSalt = generate_salt_string()
                token = encrypt_function(email, tokenSalt)
                cursor.execute(f"""UPDATE public."Personal Information" SET token='{token}' WHERE token IS NULL""")
                database.commit()
                response = make_response("User Authenticated")
                response.set_cookie('token', token)
                
    return response

def generate_salt_string():
    salt_string = bcrypt.gensalt()
    return salt_string

def encrypt_function(unencrypted_value, salt_string):
    encrypted_value = argon2.using(rounds=5, salt=salt_string).hash(unencrypted_value)
    return encrypted_value