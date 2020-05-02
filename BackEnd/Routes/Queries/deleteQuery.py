from flask import Flask, Blueprint, request, make_response
import psycopg2

dQry = Blueprint('deleteQuery', __name__)

@dQry.route("/api/deleteQuery", methods=["PUT"])
def deleteQuery():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")
        if database:
            cursor = database.cursor()
            response = dict()
            data = request.get_json()

            queryId = data['query_id']
            
            token = request.cookies.get('token')
            cursor.execute(f"""SELECT user_id FROM public."Personal Information" WHERE token='{token}'""")

            currentUserId = cursor.fetchone()[0]

            if currentUserId:
                cursor.execute(f"""UPDATE public."Queries" SET is_deleted={True} WHERE query_id={queryId}""")
                database.commit()

                cursor.execute(f"""UPDATE public."Query Skills" SET is_deleted={True} WHERE query_id={queryId}""")
                database.commit()

                response['status'] = True
                response['status_info'] = 'Query Deleted Successfully!'
              
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

