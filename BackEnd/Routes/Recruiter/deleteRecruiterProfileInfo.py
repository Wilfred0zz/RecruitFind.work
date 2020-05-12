from flask import Flask, Blueprint, request
import psycopg2
from flask_login import current_user, login_user, logout_user, login_required

drp = Blueprint('deleteRecruiterProfileInfo', __name__)

@drp.route("/api/deleteRecruiterProfileInfo", methods=["PUT"])
@login_required
def deleteRecruiterProfileInfo():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")
        if database:
            cursor = database.cursor()
            response = dict()
            data = request.get_json()

            if current_user.is_authenticated():
            
                currentUserId = current_user.get_id()

                recruiterCompany = data['recruiter_company']
                recruiterPosition = data['recruiter_position']
                recruiterCompanyStreetAddress = data['recruiter_company_street_address']
                recruiterCity = data['recruiter_city']
                recruiterPostal = data['recruiter_postal']
                recruiterCountry = data['recruiter_country']
                recruiterState = data['recruiter_state']
                isDeleted = data['is_deleted']

                if currentUserId:
                    cursor.execute(f"""UPDATE public."Recruiter Company Information" SET recruiter_company='{recruiterCompany}', recruiter_position='{recruiterPosition}', recruiter_company_street_address='{recruiterCompanyStreetAddress}', recruiter_city='{recruiterCity}', recruiter_postal='{recruiterPostal}', recruiter_country='{recruiterCountry}', recruiter_state='{recruiterState}', is_deleted={isDeleted} WHERE user_id={currentUserId}""")
                    database.commit()
                    response['status'] = True
                    response['status_info'] = 'Recruiter Profile Info Deleted Successfully'
        else:
            error = "Connection To Database Failed!"
            response['error'] = error
            raise Exception(response)
    except Exception:
        return response, 400

    return response 