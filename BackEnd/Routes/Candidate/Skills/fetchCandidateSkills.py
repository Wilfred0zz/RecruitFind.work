from flask import Flask, Blueprint, request
import psycopg2

fcs = Blueprint('fetchCandidateSkills', __name__)

@fcs.route("/api/fetchCandidateSkills", methods=["GET"])
def fetchCandidateSkills():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")
        if database:
            cursor = database.cursor()
            response = dict()

            token = request.cookies.get('token')

            cursor.execute(f"""SELECT user_id FROM public."Personal Information" WHERE token='{token}'""")
            currentUserId = cursor.fetchone()[0]

            if currentUserId:
                cursor.execute(f"""SELECT skill_id, is_deleted FROM public."Candidate Skills" WHERE user_id={currentUserId}""")
                queryResult = cursor.fetchall()

                for i in range(len(queryResult)):
                    for j in range(len(queryResult[i])):
                        if j % 2 == 0:
                            query = (f"""SELECT skill FROM public."Skills" WHERE skill_id='{queryResult[i][j]}'""")
                            cursor.execute(query)
                            key = 'skill_' + str(i+1)
                            response[key] = cursor.fetchone()[0]
                        else:
                            key = 'is_deleted_' + str(i+1)
                            response[key] = queryResult[i][j]


                response['status'] = True
                response['status_info'] = 'Candidate Skills Fetched Successfully'

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