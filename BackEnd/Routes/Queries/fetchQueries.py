from flask import Flask, Blueprint, request, make_response
import psycopg2
from collections import defaultdict
from flask_login import current_user, login_user, logout_user, login_required
import os

fqrys = Blueprint('fetchQueries', __name__)

@fqrys.route("/api/fetchQueries", methods=["GET"])
@login_required
def fetchAllQueriesForAUser():
    try:
        database = psycopg2.connect(user = "bylinkvsjtfdia", password = "b441303bb98c6533e96fa5c476852dcc067180f3a036d5bde62d61e9c5f19d5f", host= os.getenv('DATABASE_IP', "172.17.0.1") , port = "5432", database = "dauhmnvct04jp4")
        if database:
            cursor = database.cursor()
            response = defaultdict(list)
            
            if current_user.is_authenticated():
            
                currentUserId = current_user.get_id()

                if currentUserId:
                    cursor.execute(f"""SELECT query_id, query_title, query_description, query_payment, query_date FROM public."Queries" WHERE user_id={currentUserId} AND is_deleted={False}""")
                    queryResult = cursor.fetchall()

                    if len(queryResult) != 0:

                        response['queries'] = [ {
                            'query_id': row[0],
                            'queryTitle': row[1],
                            'queryDescription': row[2],
                            'queryPayment': row[3],
                            'queryDate': row[4]
                        } 
                        for row in queryResult ]
                     
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
    itemIdStr = str(itemId+1)
    queryInfo =  [{'query_id': currQuery[0], 'queryTitle': currQuery[1], 'queryDescription': currQuery[2], 'queryPayment': currQuery[3], 'queryDate': currQuery[4]} for x in range(1)]
    rspObj['query_' + itemIdStr + '_info'].extend(queryInfo)


