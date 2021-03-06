from flask import Flask, Blueprint, request
import psycopg2
from passlib.hash import argon2
import bcrypt
import os
from validate_email import validate_email
import phonenumbers

reg = Blueprint('register', __name__)

@reg.route("/api/register", methods=["POST"])
def register():
    try:
        database = psycopg2.connect(user = "bylinkvsjtfdia", password = "b441303bb98c6533e96fa5c476852dcc067180f3a036d5bde62d61e9c5f19d5f", host= os.getenv('DATABASE_IP', "172.17.0.1") , port = "5432", database = "dauhmnvct04jp4")
        if database:
            cursor = database.cursor()
            response = dict()
            data = request.get_json()
            
            for key, value in data.items():
                error = checkValidityOfData(value, key)
                response['error'] = error
                if error != None:
                    raise Exception(response)
            
            email = data['email'].lower()
            password = data['password']
            firstName = data['first_name']
            lastName = data['last_name']
            personalStreetAddress = data['personal_street_address']
            personalCity = data['personal_city']
            personalState = data['personal_state']
            personalPostal = data['personal_postal']
            personalCountry = data['personal_country']
            phoneNumber = data['phone_number']
            status = data['status']
            gender = data['gender']
            
            if (not phonenumbers.is_valid_number(phonenumbers.parse(phoneNumber, "US"))):
                response['error'] = "Invalid US Phone Number" 
                raise Exception(response)

            isValid = validate_email(email)
            
            if isValid:
                salt = generate_salt_string()
                encryptedPassword = encrypt_password(password, salt)
                salt = salt.decode("utf-8")


                cursor.execute(f"""SELECT * FROM public."Personal Information" WHERE email = '{email}' and first_name = '{firstName}'""")
                account = cursor.fetchone()

                if not account:
                    cursor.execute(f"""INSERT INTO public."Personal Information" (email, password, first_name, last_name, personal_street_address, personal_state, personal_city, personal_postal, personal_country, phone_number, status, gender, salts ) VALUES ('{email}', '{encryptedPassword}', '{firstName}', '{lastName}', '{personalStreetAddress}', '{personalState}', '{personalCity}', '{personalPostal}', '{personalCountry}', '{phoneNumber}', '{status}', '{gender}', '{salt}')""")
                    database.commit()
                    response['status'] = True
                    response['status_info'] = 'Account created successfully!'
                    return response
                else:
                    response['error'] = "User Already Exists!" 
                    raise Exception(response)
            else:
                response['error'] = "Entered Email Is Not Valid!" 
                raise Exception(response)
        else:
            error = "Connection to database failed!"
            response['error'] = error
            raise Exception(response)
                
    except Exception:
        return (response, 400)

def generate_salt_string():
    salt_string = bcrypt.gensalt()
    return salt_string

def encrypt_password(password_unencrypted, salt_string):
    encrypted_password = argon2.using(rounds=5, salt=salt_string).hash(password_unencrypted)
    return encrypted_password

def checkValidityOfData(requestData, typeOfData):
    if requestData == "":
        error = typeOfData + " needs a value!"
        return error
    else:
        return None
    
