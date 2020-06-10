from flask import Flask, Blueprint, request, make_response
import psycopg2
from passlib.hash import argon2
import bcrypt
import secrets
from validate_email import validate_email
import json
import os
from flask_login import current_user, login_user, logout_user, login_required

stat = Blueprint('status', __name__)

@stat.route("/api/status", methods=["GET"])
@login_required
def fetchUserStatus():
    try:
        database = psycopg2.connect(user = "bylinkvsjtfdia", password = "b441303bb98c6533e96fa5c476852dcc067180f3a036d5bde62d61e9c5f19d5f", host= os.getenv('DATABASE_IP', "172.17.0.1") , port = "5432", database = "dauhmnvct04jp4")
        if database:
            cursor = database.cursor()
            response = dict()

            if current_user.is_authenticated():
                currentUserId = current_user.get_id()

                if currentUserId:
                    cursor.execute(f"""SELECT status FROM public."Personal Information" WHERE user_id={currentUserId}""")
                    queryResult = cursor.fetchone()

                    response['user_status'] = queryResult[0]
            
            
        else:
            error = "Connection to database failed!"
            response['error'] = error
            raise Exception(response)

    except Exception:            
        return (response, 400)
    
    return response

