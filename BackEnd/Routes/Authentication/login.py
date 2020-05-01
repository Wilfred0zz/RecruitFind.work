from flask import Flask, Blueprint, request, make_response
import psycopg2
from passlib.hash import argon2
import bcrypt
import secrets
from validate_email import validate_email
import json

log = Blueprint('login', __name__)

@log.route("/api/login", methods=["POST"])
def login():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")
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

            cursor.execute(f"""SELECT COUNT(1) FROM public."Personal Information" WHERE email = '{email}'""")

            #checks to see whether or not the user exists
            if not cursor.fetchone()[0]:
                error = "User Doesn't Exist!"
                response['error'] = error
                raise Exception(response)
            
            else:
                password = data['password']
                if len(password) == 0:
                    error = "Password Needs Value!"
                    response["error"] = error
                    raise Exception(response)

                cursor.execute(f"""SELECT password FROM public."Personal Information" WHERE email = '{email}'""")
                results = cursor.fetchall()
                print("this is results: ", results)

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
                        response = make_response(json.dumps({
                            'status_info': 'User Logged In'
                        }))
                        response.set_cookie('token', token)
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