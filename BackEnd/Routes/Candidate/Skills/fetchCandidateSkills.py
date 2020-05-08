from flask import Flask, Blueprint, request
import psycopg2
from flask_login import current_user, login_user, logout_user, login_required

fcs = Blueprint('fetchCandidateSkills', __name__)

@fcs.route("/api/fetchCandidateSkills", methods=["GET"])
@login_required
def fetchCandidateSkills():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")
        if database:
            cursor = database.cursor()
            response = dict()

            if current_user.is_authenticated:

                currentUserId = current_user.get_id()

                if currentUserId:
                    cursor.execute(f"""SELECT skill_id, is_deleted FROM public."Candidate Skills" WHERE user_id={currentUserId} AND is_deleted={False}""")
                    queryResult = cursor.fetchall()

                    if len(queryResult) != 0:
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
                        response['status'] = True
                        response['status_info'] = 'User Has No Skills!'
        else:
            error = "Connection To Database Failed!"
            response['error'] = error
            raise Exception(response)
    except Exception:
        return response, 400
    
    return response