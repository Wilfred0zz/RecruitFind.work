from flask import Flask, Blueprint, request
import psycopg2
from flask_login import current_user, login_user, logout_user, login_required
import os

urp = Blueprint('updateRecruiterProfileInfo', __name__)

@urp.route("/api/updateRecruiterProfileInfo", methods=["PUT"])
@login_required
def updateRecruiterProfileInfo():
    try:
        database = psycopg2.connect(user = "bylinkvsjtfdia", password = "b441303bb98c6533e96fa5c476852dcc067180f3a036d5bde62d61e9c5f19d5f", host= os.getenv('DATABASE_IP', "172.17.0.1") , port = "5432", database = "dauhmnvct04jp4")
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
                    response['status_info'] = 'Recruiter Profile Info Updated Successfully'
        else:
            error = "Connection To Database Failed!"
            response['error'] = error
            raise Exception(response)
    except Exception:
        return response, 400
    
    return response