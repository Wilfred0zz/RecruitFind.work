from flask import Flask, Blueprint, request
import psycopg2

drp = Blueprint('deleteRecruiterProfileInfo', __name__)

@drp.route("/api/deleteRecruiterProfileInfo", methods=["PUT"])
def deleteRecruiterProfileInfo():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")
        if database:
            cursor = database.cursor()
            response = dict()
            data = request.get_json()

            token = request.cookies.get('token')

            if token == None:
                error = "User Not Authenticated!"
                response['error'] = error
                raise Exception(response)

            recruiterCompany = data['recruiter_company']
            recruiterPosition = data['recruiter_position']
            recruiterCompanyStreetAddress = data['recruiter_company_street_address']
            recruiterCity = data['recruiter_city']
            recruiterPostal = data['recruiter_postal']
            recruiterCountry = data['recruiter_country']
            recruiterState = data['recruiter_state']
            isDeleted = data['is_deleted']

            cursor.execute(f"""SELECT user_id FROM public."Personal Information" WHERE token='{token}'""")

            currentUserId = cursor.fetchone()[0]

            if currentUserId:
                cursor.execute(f"""UPDATE public."Recruiter Company Information" SET recruiter_company='{recruiterCompany}', recruiter_position='{recruiterPosition}', recruiter_company_street_address='{recruiterCompanyStreetAddress}', recruiter_city='{recruiterCity}', recruiter_postal='{recruiterPostal}', recruiter_country='{recruiterCountry}', recruiter_state='{recruiterState}', is_deleted={isDeleted} WHERE user_id={currentUserId}""")
                database.commit()
                response['status'] = True
                response['status_info'] = 'Recruiter Profile Info Deleted Successfully'
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