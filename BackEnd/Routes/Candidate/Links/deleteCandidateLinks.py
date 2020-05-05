from flask import Flask, Blueprint, request
import psycopg2

dcl = Blueprint('deleteCandidateLinks', __name__)

@dcl.route("/api/deleteCandidateLinks", methods=["PUT"])
def deleteCandidateLinks():
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

            isDeleted1 = data['is_deleted_1']
            isDeleted2 = data['is_deleted_2']
            isDeleted3 = data['is_deleted_3']

            cursor.execute(f"""SELECT user_id FROM public."Personal Information" WHERE token='{token}'""")
            currentUserId = cursor.fetchone()[0]

            if currentUserId:
                cursor.execute(f"""SELECT link_id FROM public."Candidate Links" WHERE user_id = '{currentUserId}'""")
                queryResult = cursor.fetchall()

                cursor.execute(f"""UPDATE public."Candidate Links" SET is_deleted='{isDeleted1}' WHERE link_id={queryResult[0][0]}""")
                database.commit()
                cursor.execute(f"""UPDATE public."Candidate Links" SET is_deleted='{isDeleted2}' WHERE link_id={queryResult[1][0]}""")
                database.commit()
                cursor.execute(f"""UPDATE public."Candidate Links" SET is_deleted='{isDeleted3}' WHERE link_id={queryResult[2][0]}""")
                database.commit()
                response['status'] = True
                response['status_info'] = 'The Appropriate Candidate Links Were Deleted Successfully'
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