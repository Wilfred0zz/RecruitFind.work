from flask import Flask, Blueprint, request
import psycopg2
from passlib.hash import argon2
import bcrypt

dcp = Blueprint('deleteCandidateProfile', __name__)

@dcp.route("/api/deleteCandidateProfile", methods=["PUT"])
def deleteCandidateProfile():
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

            candidateSchool = data['candidate_school']
            candidateHighestLevelOfEducation = data['candidate_highest_level_of_education']
            candidateDescription = data['candidate_description']
            candidateCurrentPosition = data['candidate_current_position']
            
            
            cursor.execute(f"""SELECT user_id FROM public."Personal Information" WHERE token='{token}'""")

            currentUserId = cursor.fetchone()[0]
            print("this is the user's id: ", currentUserId)

            if currentUserId:
                
                cursor.execute(f"""UPDATE public."Candidate Information" SET user_id={currentUserId}, candidate_school='{candidateSchool}', candidate_highest_level_of_education='{candidateHighestLevelOfEducation}', candidate_description='{candidateDescription}', candidate_current_position='{candidateCurrentPosition}', "is_candidate_profile_deleted"={True}  WHERE user_id={currentUserId}""")
                database.commit()
                
                response['status'] = True
                response['status_info'] = 'Candidate Profile Deleted Successfully'
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
