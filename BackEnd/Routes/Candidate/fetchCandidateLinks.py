from flask import Flask, Blueprint, request
import psycopg2


database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")

#creates a cursor object to execute PostgreSQL commands via python
cursor = database.cursor()

fcl = Blueprint('fetchCandidateLinks', __name__)

@fcl.route("/api/fetchCandidateLinks", methods=["GET"])
def fetchCandidateLinks():
    response = dict()

    token = request.cookies.get('token')

    cursor.execute(f"""SELECT user_id FROM public."Personal Information" WHERE token='{token}'""")

    currentUserId = cursor.fetchone()[0]

    if currentUserId:
        cursor.execute(f"""SELECT link, type_of_link, is_deleted FROM public."Candidate Links" WHERE user_id={currentUserId}""")
        queryResult = cursor.fetchall()
        constructLinksResponse(response, queryResult[0], '1')
        constructLinksResponse(response, queryResult[1], '2')
        constructLinksResponse(response, queryResult[2], '3')
        
        print("this is the response: ", response)

        response['status'] = True
        response['status_info'] = 'Candidate Links Fetched Successfully'
    else:
        response['status'] = False
        response['status_info'] = 'Invalid token!'
    
    return response

def constructLinksResponse(resObj, currRow, itemId):
    link = 'link_' + itemId
    type_of_link = 'type_of_link_' + itemId
    is_deleted = 'is_deleted_' + itemId

    resObj[link] = currRow[0]
    resObj[type_of_link] = currRow[1]
    resObj[is_deleted] = currRow[2]
