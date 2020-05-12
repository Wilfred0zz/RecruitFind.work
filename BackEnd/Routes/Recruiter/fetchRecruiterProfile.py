from flask import Flask, Blueprint, request
import psycopg2
from flask_login import current_user, login_user, logout_user, login_required
import os

frp = Blueprint('fetchRecruiterProfile', __name__)

@frp.route("/api/fetchRecruiterProfileInfo", methods=["GET"])
@login_required
def fetchRecruiterProfileInfo():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= os.getenv('DATABASE_IP', "172.17.0.1") , port = "5432", database = "recruitfindwork")
        if database:
            cursor = database.cursor()
            response = dict()

            if current_user.is_authenticated:
            
                currentUserId = current_user.get_id()

                if currentUserId:
                    cursor.execute(f"""SELECT recruiter_company, recruiter_position, recruiter_company_street_address, recruiter_city, recruiter_postal, recruiter_country, recruiter_state, is_deleted FROM public."Recruiter Company Information" WHERE user_id={currentUserId} AND is_deleted={False}""")
                    queryResult = cursor.fetchall()
                    if len(queryResult) != 0:
                        response['recruiter_company'] = queryResult[0][0]
                        response['recruiter_position'] = queryResult[0][1]
                        response['recruiter_company_street_address'] = queryResult[0][2]
                        response['recruiter_city'] = queryResult[0][3]
                        response['recruiter_postal'] = queryResult[0][4]
                        response['recruiter_country'] = queryResult[0][5]
                        response['recruiter_state'] = queryResult[0][6]
                        response['is_deleted'] = queryResult[0][7]
                        
                    else:
                        error = "Recruiter Profile No Longer Exists!"
                        response['error'] = error
                        raise Exception(response)
        else:
            error = "Connection To Database Failed!"
            response['error'] = error
            raise Exception(response)
    except Exception:
        return response, 400
    
    return response