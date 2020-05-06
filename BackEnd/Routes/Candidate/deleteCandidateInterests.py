from flask import Flask, Blueprint, request
import psycopg2
from passlib.hash import argon2
import bcrypt

dci = Blueprint('deleteCandidateInterests', __name__)

@dci.route("/api/deleteCandidateInterests", methods=["PUT"])
def deleteCandidateInterests():
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
            
                cursor.execute(f"""UPDATE public."Candidate Interests" SET user_id={currentUserId}, name_of_interest='{nameOfInterest1}', is_deleted={isDeleted1} WHERE interest_id={queryResult[0][0]}""")
                database.commit()
                cursor.execute(f"""UPDATE public."Candidate Interests" SET user_id={currentUserId}, name_of_interest='{nameOfInterest2}', is_deleted={isDeleted2} WHERE interest_id={queryResult[1][0]}""")
                database.commit()
                cursor.execute(f"""UPDATE public."Candidate Interests" SET user_id={currentUserId}, name_of_interest='{nameOfInterest3}', is_deleted={isDeleted3} WHERE interest_id={queryResult[2][0]}""")
                database.commit()
                response['status'] = True
                response['status_info'] = 'Candidate Interests Deleted Successfully'
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
