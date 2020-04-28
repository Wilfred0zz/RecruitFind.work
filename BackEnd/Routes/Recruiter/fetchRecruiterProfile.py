from flask import Flask, Blueprint, request
import psycopg2

frp = Blueprint('fetchRecruiterProfile', __name__)

@frp.route("/api/fetchRecruiterProfileInfo", methods=["GET"])
def fetchRecruiterProfileInfo():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")
        if database:
            cursor = database.cursor()
            response = dict()

            token = request.cookies.get('token')

            cursor.execute(f"""SELECT user_id FROM public."Personal Information" WHERE token='{token}'""")

            currentUserId = cursor.fetchone()[0]

            if currentUserId:
                cursor.execute(f"""SELECT recruiter_company, recruiter_position, recruiter_company_street_address, recruiter_city, recruiter_postal, recruiter_country, recruiter_state FROM public."Recruiter Company Information" WHERE user_id={currentUserId}""")
                queryResult = cursor.fetchall()
                response['recruiter_company'] = queryResult[0][0]
                response['recruiter_position'] = queryResult[0][1]
                response['recruiter_company_street_address'] = queryResult[0][2]
                response['recruiter_city'] = queryResult[0][3]
                response['recruiter_postal'] = queryResult[0][4]
                response['recruiter_country'] = queryResult[0][5]
                response['recruiter_state'] = queryResult[0][6]

                response['status'] = True
                response['status_info'] = 'Recruiter Profile Info Fetched Successfully'
            else:
                error = "Invalid Token!"
                response['error'] = error
                raise Exception(response)
        else:
            error = "Connection To Database Failed!"
            response['error'] = error
            raise Exception(response)
    except Exception:
        return response, 400
    
    return response