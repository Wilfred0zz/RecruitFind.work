from flask import Flask, Blueprint, request
import psycopg2

cp = Blueprint('candidateProfile', __name__)

@cp.route("/api/candidateProfile", methods=["POST"])
def createCandidateProfile():
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
                cursor.execute(f"""INSERT INTO public."Candidate Information" (user_id, candidate_school, candidate_highest_level_of_education, candidate_description, candidate_current_position, is_candidate_profile_deleted) VALUES ('{currentUserId}', '{candidateSchool}', '{candidateHighestLevelOfEducation}', '{candidateDescription}', '{candidateCurrentPosition}', {False})""")
                database.commit()
                cursor.execute(f"""INSERT INTO public."Candidate Interests" (user_id, name_of_interest, is_deleted) VALUES ('{currentUserId}', '{nameOfInterest1}', {isDeleted1})""")
                database.commit()
                cursor.execute(f"""INSERT INTO public."Candidate Interests" (user_id, name_of_interest, is_deleted) VALUES ('{currentUserId}', '{nameOfInterest2}', {isDeleted2})""")
                database.commit()
                cursor.execute(f"""INSERT INTO public."Candidate Interests" (user_id, name_of_interest, is_deleted) VALUES ('{currentUserId}', '{nameOfInterest3}', {isDeleted3})""")
                database.commit()
                response['status'] = True
                response['status_info'] = 'Candidate Profile Created Successfully'
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