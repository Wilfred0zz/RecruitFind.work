from flask import Flask, Blueprint, request
import psycopg2
from passlib.hash import argon2
import bcrypt
from flask_login import current_user, login_user, logout_user, login_required
import os

dcp = Blueprint('deleteCandidateProfile', __name__)

@dcp.route("/api/deleteCandidateProfile", methods=["PUT"])
@login_required
def deleteCandidateProfile():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= os.getenv('DATABASE_IP', "172.17.0.1") , port = "5432", database = "recruitfindwork")
        if database:
            cursor = database.cursor()
            response = dict()
            data = request.get_json()

            if current_user.is_authenticated:

                candidateSchool = data['candidate_school']
                candidateHighestLevelOfEducation = data['candidate_highest_level_of_education']
                candidateDescription = data['candidate_description']
                candidateCurrentPosition = data['candidate_current_position']
                
                currentUserId = current_user.get_id()

                if currentUserId:
                    
                    cursor.execute(f"""UPDATE public."Candidate Information" SET user_id={currentUserId}, candidate_school='{candidateSchool}', candidate_highest_level_of_education='{candidateHighestLevelOfEducation}', candidate_description='{candidateDescription}', candidate_current_position='{candidateCurrentPosition}', "is_candidate_profile_deleted"={True}  WHERE user_id={currentUserId}""")
                    database.commit()
                    
                    response['status'] = True
                    response['status_info'] = 'Candidate Profile Deleted Successfully'
        else:
            error = "Connection To Database Failed!"
            response['error'] = error
            raise Exception(response)
    except Exception:
        return response, 400
    
    return response
