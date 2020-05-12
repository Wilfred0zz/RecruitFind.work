from flask import Flask, Blueprint, request
import psycopg2
from flask_login import current_user, login_user, logout_user, login_required
import os

dce = Blueprint('deleteCandidateExperiences', __name__)

@dce.route("/api/deleteCandidateExperiences", methods=["PUT"])
@login_required
def deleteCandidateExperiences():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= os.getenv('DATABASE_IP', "172.17.0.1") , port = "5432", database = "recruitfindwork")
        if database:
            cursor = database.cursor()
            response = dict()
            data = request.get_json()

            if current_user.is_authenticated:

                isDeleted1 = data['is_deleted_1']
                isDeleted2 = data['is_deleted_2']
                isDeleted3 = data['is_deleted_3']
                isDeleted4 = data['is_deleted_4']
                isDeleted5 = data['is_deleted_5']

                currentUserId = current_user.get_id()
                print("this is the user's id: ", currentUserId)

                if currentUserId:
                    cursor.execute(f"""SELECT experience_id FROM public."Candidate Experiences" WHERE user_id = '{currentUserId}'""")
                    queryResult = cursor.fetchall()

                    cursor.execute(f"""UPDATE public."Candidate Experiences" SET is_deleted={isDeleted1} WHERE experience_id={queryResult[0][0]}""")
                    database.commit()
                    cursor.execute(f"""UPDATE public."Candidate Experiences" SET is_deleted={isDeleted2} WHERE experience_id={queryResult[1][0]}""")
                    database.commit()
                    cursor.execute(f"""UPDATE public."Candidate Experiences" SET is_deleted={isDeleted3} WHERE experience_id={queryResult[2][0]}""")
                    database.commit()
                    cursor.execute(f"""UPDATE public."Candidate Experiences" SET is_deleted={isDeleted4} WHERE experience_id={queryResult[3][0]}""")
                    database.commit()
                    cursor.execute(f"""UPDATE public."Candidate Experiences" SET is_deleted={isDeleted5} WHERE experience_id={queryResult[4][0]}""")
                    database.commit()

                    response['status'] = True
                    response['status_info'] = 'The Appropriate Candidate Experiences Were Deleted Successfully'
                
        else:
            error = "Connection To Database Failed!"
            response['error'] = error
            raise Exception(response)
    except Exception:
        return response, 400

    return response