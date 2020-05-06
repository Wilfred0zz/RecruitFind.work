from flask import Flask, Blueprint, request, make_response
import psycopg2
from collections import defaultdict
from flask_login import current_user, login_user, logout_user, login_required

fqrys = Blueprint('fetchQueries', __name__)

@fqrys.route("/api/fetchQueries", methods=["GET"])
@login_required
def fetchAllQueriesForAUser():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")
        if database:
            cursor = database.cursor()
            response = defaultdict(list)
            
            if current_user.is_authenticated:
            
                currentUserId = current_user.get_id()

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


