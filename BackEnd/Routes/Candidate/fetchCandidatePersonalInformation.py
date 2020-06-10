from flask import Flask, Blueprint, request
import psycopg2
from flask_login import current_user, login_user, logout_user, login_required
import os

fcpi = Blueprint('fetchCandidatePersonalInformation', __name__)

@fcpi.route("/api/fetchCandidatePersonalInformation", methods=["GET"])
@login_required
def fetchCandidatePersonalInformation():
    try:
        database = psycopg2.connect(user = "bylinkvsjtfdia", password = "b441303bb98c6533e96fa5c476852dcc067180f3a036d5bde62d61e9c5f19d5f", host= os.getenv('DATABASE_IP', "172.17.0.1") , port = "5432", database = "dauhmnvct04jp4")
        if database:
            cursor = database.cursor()
            response = dict()

            if current_user.is_authenticated():
            
                currentUserId = current_user.get_id()

                if currentUserId:
                    cursor.execute(f"""SELECT first_name, last_name, email, phone_number, personal_street_address, personal_state, personal_city, personal_postal, personal_country, gender, status FROM public."Personal Information" WHERE user_id={currentUserId} AND status='candidate'""")
                    queryResult = cursor.fetchall()

                    if len(queryResult) != 0:
                        response['first_name'] = queryResult[0][0]
                        response['last_name'] = queryResult[0][1]
                        response['email'] = queryResult[0][2]
                        response['phone_number'] = queryResult[0][3]
                        response['personal_street_address'] = queryResult[0][4]
                        response['personal_state'] = queryResult[0][5]
                        response['personal_city'] = queryResult[0][6]
                        response['personal_postal'] = queryResult[0][7]
                        response['personal_country'] = queryResult[0][8]
                        response['gender'] = queryResult[0][9]
                        response['status'] = queryResult[0][10]

                    else:
                        error = "Either User No Longer Exists Or Is Not A Candidate!"
                        response['error'] = error
                        raise Exception(response)
        else:
            error = "Connection To Database Failed!"
            response['error'] = error
            raise Exception(response)
    except Exception:
        return response, 400
    
    return response