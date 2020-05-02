from flask import Flask, Blueprint, request, make_response
import psycopg2

fqrys = Blueprint('fetchQueries', __name__)

@fqrys.route("/api/fetchQueries", methods=["GET"])
def fetchAllQueriesForAUser():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")
        if database:
            cursor = database.cursor()
            response = dict()
            
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
    itemIdStr = str(itemId + 1)

    queryNumber = 'query_id_' + itemIdStr
    queryTitle = 'query_title_' + itemIdStr
    queryDescription = 'query_description_' + itemIdStr
    queryPayment = 'query_payment_' + itemIdStr
    queryDate = 'query_date_' + itemIdStr

    rspObj[queryNumber] = currQuery[0]
    rspObj[queryTitle] = currQuery[1]
    rspObj[queryDescription] = currQuery[2]
    rspObj[queryPayment] = currQuery[3]
    rspObj[queryDate] = currQuery[4]

