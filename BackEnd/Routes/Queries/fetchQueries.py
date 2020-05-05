from flask import Flask, Blueprint, request, make_response
import psycopg2
from collections import defaultdict

fqrys = Blueprint('fetchQueries', __name__)

@fqrys.route("/api/fetchQueries", methods=["GET"])
def fetchAllQueriesForAUser():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")
        if database:
            cursor = database.cursor()
            response = defaultdict(list)
            
            token = request.cookies.get('token')
            cursor.execute(f"""SELECT user_id FROM public."Personal Information" WHERE token='{token}'""")

            currentUserId = cursor.fetchone()[0]

            if currentUserId:
                cursor.execute(f"""SELECT query_id, query_title, query_description, query_payment, query_date FROM public."Queries" WHERE user_id={currentUserId} AND is_deleted={False}""")
                queryResult = cursor.fetchall()

                if len(queryResult) != 0:
                    length = len(queryResult)

                    for i in range(length):
                        constructResponse(response, queryResult[i], i)

                    response['status'] = True
                    response['status_info'] = 'Queries Fetched Successfully!'
                else:
                    error = "User Has No Queries!"
                    response['error'] = error
                    raise Exception(response)
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


def constructResponse(rspObj, currQuery, itemId):
    queryIdStr = str(currQuery[0])
    queryInfo =  [{'queryTite': currQuery[1], 'queryDescription': currQuery[2], 'queryPayment': currQuery[3], 'queryDate': currQuery[4]} for x in range(1)]
    rspObj[queryIdStr].extend(queryInfo)


