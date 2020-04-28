from flask import Flask, Blueprint, request
import psycopg2

urp = Blueprint('updateRecruiterProfileInfo', __name__)

@urp.route("/api/updateRecruiterProfileInfo", methods=["PUT"])
def updateRecruiterProfileInfo():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")
        if database:
            cursor = database.cursor()
            response = dict()
            data = request.get_json()

            token = request.cookies.get('token')
            print("this is the token from broswer: ", token)

            recruiterCompany = data['recruiter_company']
            recruiterPosition = data['recruiter_position']
            recruiterCompanyStreetAddress = data['recruiter_company_street_address']
            recruiterCity = data['recruiter_city']
            recruiterPostal = data['recruiter_postal']
            recruiterCountry = data['recruiter_country']
            recruiterState = data['recruiter_state']

            cursor.execute(f"""SELECT user_id FROM public."Personal Information" WHERE token='{token}'""")

            currentUserId = cursor.fetchone()[0]

            if currentUserId:
                cursor.execute(f"""UPDATE public."Recruiter Company Information" SET recruiter_company='{recruiterCompany}', recruiter_position='{recruiterPosition}', recruiter_company_street_address='{recruiterCompanyStreetAddress}', recruiter_city='{recruiterCity}', recruiter_postal='{recruiterPostal}', recruiter_country='{recruiterCountry}', recruiter_state='{recruiterState}' WHERE user_id={currentUserId}""")
                database.commit()
                response['status'] = True
                response['status_info'] = 'Recruiter Profile Info Updated Successfully'
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