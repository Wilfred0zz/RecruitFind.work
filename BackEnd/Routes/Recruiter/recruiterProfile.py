from flask import Flask, Blueprint, request
import psycopg2
import traceback
from flask_login import current_user, login_user, logout_user, login_required


rp = Blueprint('recruiterProfile', __name__)

@rp.route("/api/recruiterProfile", methods=["POST"])
@login_required
def createRecruiterProfile():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")
        if database:
            print(request.headers)
            cursor = database.cursor()
            response = dict()
            data = request.get_json()

            if current_user.is_authenticated:
            
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
                    cursor.execute(f"""INSERT INTO public."Recruiter Company Information" (user_id, recruiter_company, recruiter_position, recruiter_company_street_address, recruiter_city, recruiter_postal, recruiter_country, recruiter_state, is_deleted) VALUES ({currentUserId} ,'{recruiterCompany}', '{recruiterPosition}', '{recruiterCompanyStreetAddress}', '{recruiterCity}', '{recruiterPostal}', '{recruiterCountry}', '{recruiterState}', {isDeleted})""")
                    database.commit()
                    response['status'] = True
                    response['status_info'] = 'Recruiter Profile Created Successfully'
        else:
            error = "Connection To Database Failed!"
            response['error'] = error
            raise Exception(response)
    except Exception as e:         
        print(traceback.format_exc())        
        return response, 400
    
    
    return response