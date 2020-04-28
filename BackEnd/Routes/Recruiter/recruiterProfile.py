from flask import Flask, Blueprint, request
import psycopg2

rp = Blueprint('recruiterProfile', __name__)

@rp.route("/api/recruiterProfile", methods=["POST"])
def createRecruiterProfile():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")
        if database:
            cursor = database.cursor()
            response = dict()
            data = request.get_json()

            token = request.cookies.get('token')

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
                cursor.execute(f"""INSERT INTO public."Recruiter Company Information" (user_id, recruiter_company, recruiter_position, recruiter_company_street_address, recruiter_city, recruiter_postal, recruiter_country, recruiter_state) VALUES ({currentUserId} ,'{recruiterCompany}', '{recruiterPosition}', '{recruiterCompanyStreetAddress}', '{recruiterCity}', '{recruiterPostal}', '{recruiterCountry}', '{recruiterState}')""")
                database.commit()
                response['status'] = True
                response['status_info'] = 'Recruiter Profile Created Successfully'
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