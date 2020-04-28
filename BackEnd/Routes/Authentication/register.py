from flask import Flask, Blueprint, request
import psycopg2
from passlib.hash import argon2
import bcrypt


reg = Blueprint('register', __name__)

@reg.route("/api/register", methods=["POST"])
def register():
    database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")

    if database:
        cursor = database.cursor()
        response = dict()
        data = request.get_json()
        
        #the following will parse the json request data into their respective variables
        email = data['email']
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

        result = checkValidityOfData(email, "email")
        if result != None:
            return result, 400

        result = checkValidityOfData(password, "password")
        if result != None:
            return result, 400

        result = checkValidityOfData(firstName, "first_name")
        if result != None:
            return result, 400

        result = checkValidityOfData(lastName, "last_name")
        if result != None:
            return result, 400

        result = checkValidityOfData(personalStreetAddress, "personal_street_address")
        if result != None:
            return result, 400

        result = checkValidityOfData(personalCity, "personal_city")
        if result != None:
            return result, 400

        result = checkValidityOfData(personalState, "personal_state")
        if result != None:
            return result, 400

        result = checkValidityOfData(personalPostal, "personal_postal")
        if result != None:
            return result, 400

        result = checkValidityOfData(personalCountry, "personal_country")
        if result != None:
            return result, 400

        result = checkValidityOfData(phoneNumber, "phone_number")
        if result != None:
            return result, 400

        result = checkValidityOfData(status, "status")
        if result != None:
            return result, 400

        result = checkValidityOfData(gender, "gender")
        if result != None:
            return result, 400

        salt = generate_salt_string()
        encryptedPassword = encrypt_password(password, salt)
        salt = salt.decode("utf-8")


        cursor.execute(f"""SELECT * FROM public."Personal Information" WHERE email = '{email}' and first_name = '{firstName}'""")
        account = cursor.fetchone()

        #checks to see whether an account with this email and first name already exists in the database
        if account:
            response['status'] = False
            response['status_info'] = 'user already exists'
        else:
            cursor.execute(f"""INSERT INTO public."Personal Information" (email, password, first_name, last_name, personal_street_address, personal_state, personal_city, personal_postal, personal_country, phone_number, status, gender, salts ) VALUES ('{email}', '{encryptedPassword}', '{firstName}', '{lastName}', '{personalStreetAddress}', '{personalState}', '{personalCity}', '{personalPostal}', '{personalCountry}', '{phoneNumber}', '{status}', '{gender}', '{salt}')""")
            database.commit()
            response['status'] = True
            response['status_info'] = 'Account created successfully!'
    else:
        response['status']= False
        response['status_info'] = 'Connection to database failed!'
        
    return response  

def generate_salt_string():
    salt_string = bcrypt.gensalt()
    return salt_string

def encrypt_password(password_unencrypted, salt_string):
    encrypted_password = argon2.using(rounds=5, salt=salt_string).hash(password_unencrypted)
    return encrypted_password

def checkValidityOfData(requestData, typeOfData):
    print("this is request data: ", requestData)
    print("in here")
    if requestData == "":
        print("empty")
        print("this is request data!", requestData)
        error = typeOfData + " needs a value!"
        return error
    
