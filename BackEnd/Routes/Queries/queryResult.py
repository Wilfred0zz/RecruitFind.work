from flask import Flask, Blueprint, request
import psycopg2

qryrst = Blueprint('queryResult', __name__)

@qryrst.route("/api/queryResult", methods=["GET"])
def computeQuery():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")
        if database:
            cursor = database.cursor()
            response = dict()
            data = request.get_json()

            #queryTitle = data[""]

            token = request.cookies.get('token')
            cursor.execute(f"""SELECT user_id FROM public."Personal Information" WHERE token='{token}'""")

            currentUserId = cursor.fetchone()[0]
            if currentUserId:
                response['status'] = True
                response['status_info'] = 'Query Result Computed Successfully!'
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