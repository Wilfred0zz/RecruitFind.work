from flask import Flask, Blueprint, request, make_response
import psycopg2
from flask_login import current_user, login_user, logout_user, login_required
import os

dQry = Blueprint('deleteQuery', __name__)

@dQry.route("/api/deleteQuery", methods=["PUT"])
@login_required
def deleteQuery():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= os.getenv('DATABASE_IP', "172.17.0.1") , port = "5432", database = "recruitfindwork")
        if database:
            cursor = database.cursor()
            response = dict()
            data = request.get_json()

            if current_user.is_authenticated():

                queryId = data['query_id']
                
                currentUserId = current_user.get_id()

                if currentUserId:
                    cursor.execute(f"""UPDATE public."Queries" SET is_deleted={True} WHERE query_id={queryId}""")
                    database.commit()

                    cursor.execute(f"""UPDATE public."Query Skills" SET is_deleted={True} WHERE query_id={queryId}""")
                    database.commit()

                    response['status'] = True
                    response['status_info'] = 'Query Deleted Successfully!'
        
        else:
            error = "Connection To Database Failed!"
            response['error'] = error
            raise Exception(response)

    except Exception:
        return response, 400

    return response

