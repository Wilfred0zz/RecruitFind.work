from flask import Flask, Blueprint, request
import psycopg2

dce = Blueprint('deleteCandidateExperiences', __name__)

@dce.route("/api/deleteCandidateExperiences", methods=["PUT"])
def deleteCandidateExperiences():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")
        if database:
            cursor = database.cursor()
            response = dict()
            data = request.get_json()

            token = request.cookies.get('token')
            print("this is the token from broswer: ", token)


            isDeleted1 = data['is_deleted_1']
            isDeleted2 = data['is_deleted_2']
            isDeleted3 = data['is_deleted_3']
            isDeleted4 = data['is_deleted_4']
            isDeleted5 = data['is_deleted_5']

            cursor.execute(f"""SELECT user_id FROM public."Personal Information" WHERE token='{token}'""")

            currentUserId = cursor.fetchone()[0]
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