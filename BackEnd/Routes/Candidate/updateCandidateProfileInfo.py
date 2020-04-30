from flask import Flask, Blueprint, request
import psycopg2
from passlib.hash import argon2
import bcrypt

ucp = Blueprint('updateCandidateProfileInfo', __name__)

@ucp.route("/api/updateCandidateProfileInfo", methods=["PUT"])
def updateCandidateProfileInfo():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")
        if database:
            cursor = database.cursor()
            response = dict()
            data = request.get_json()

            token = request.cookies.get('token')
            print("this is the token from broswer: ", token)

            candidateSchool = data['candidate_school']
            candidateHighestLevelOfEducation = data['candidate_highest_level_of_education']
            candidateDescription = data['candidate_description']
            candidateCurrentPosition = data['candidate_current_position']
            
            nameOfInterest1 = data['name_of_interest_1']
            isDeleted1 = data['is_deleted_1']
            nameOfInterest2 = data['name_of_interest_2']
            isDeleted2 = data['is_deleted_2']
            nameOfInterest3 = data['name_of_interest_3']
            isDeleted3 = data['is_deleted_3']
            
            cursor.execute(f"""SELECT user_id FROM public."Personal Information" WHERE token='{token}'""")

            currentUserId = cursor.fetchone()[0]
            print("this is the user's id: ", currentUserId)

            if currentUserId:
                cursor.execute(f"""SELECT interest_id FROM public."Candidate Interests" WHERE user_id = '{currentUserId}'""")
                queryResult = cursor.fetchall()
            
                cursor.execute(f"""UPDATE public."Candidate Information" SET user_id={currentUserId}, candidate_school='{candidateSchool}', candidate_highest_level_of_education='{candidateHighestLevelOfEducation}', candidate_description='{candidateDescription}', candidate_current_position='{candidateCurrentPosition}', is_candidate_profile_deleted={False} WHERE user_id={currentUserId}""")
                database.commit()
                cursor.execute(f"""UPDATE public."Candidate Interests" SET user_id={currentUserId}, name_of_interest='{nameOfInterest1}', is_deleted={isDeleted1} WHERE interest_id={queryResult[0][0]}""")
                database.commit()
                cursor.execute(f"""UPDATE public."Candidate Interests" SET user_id={currentUserId}, name_of_interest='{nameOfInterest2}', is_deleted={isDeleted2} WHERE interest_id={queryResult[1][0]}""")
                database.commit()
                cursor.execute(f"""UPDATE public."Candidate Interests" SET user_id={currentUserId}, name_of_interest='{nameOfInterest3}', is_deleted={isDeleted3} WHERE interest_id={queryResult[2][0]}""")
                database.commit()
                response['status'] = True
                response['status_info'] = 'Candidate Profile Info Updated Successfully'
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
