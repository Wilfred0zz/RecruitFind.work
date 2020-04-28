from flask import Flask, Blueprint, request
import psycopg2


#database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")

#creates a cursor object to execute PostgreSQL commands via python
#cursor = database.cursor()

rp = Blueprint('recruiterProfile', __name__)

@rp.route("/api/recruiterProfile", methods=["POST"])
def createRecruiterProfile():
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
    print("this is the user's id: ", currentUserId)

    if currentUserId:
        cursor.execute(f"""INSERT INTO public."Recruiter Company Information" (user_id, recruiter_company, recruiter_position, recruiter_company_street_address, recruiter_city, recruiter_postal, recruiter_country, recruiter_state) VALUES ({currentUserId} ,'{recruiterCompany}', '{recruiterPosition}', '{recruiterCompanyStreetAddress}', '{recruiterCity}', '{recruiterPostal}', '{recruiterCountry}', '{recruiterState}')""")
        database.commit()
        response['status'] = True
        response['status_info'] = 'Recruiter Profile Created Successfully'
    else:
        response['status'] = False
        response['status_info'] = 'Invalid token!'
    
    return response