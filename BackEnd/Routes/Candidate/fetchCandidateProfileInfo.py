from flask import Flask, Blueprint, request
import psycopg2


#database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")

#creates a cursor object to execute PostgreSQL commands via python
#cursor = database.cursor()

fcp = Blueprint('fetchCandidateProfileInfo', __name__)

@fcp.route("/api/fetchCandidateProfileInfo", methods=["GET"])
def fetchCandidateProfileInfo():
    response = dict()

    token = request.cookies.get('token')

    cursor.execute(f"""SELECT user_id FROM public."Personal Information" WHERE token='{token}'""")

    currentUserId = cursor.fetchone()[0]

    if currentUserId:
        cursor.execute(f"""SELECT candidate_school, candidate_highest_level_of_education, candidate_description, candidate_current_position FROM public."Candidate Information" WHERE user_id={currentUserId}""")
        queryResult = cursor.fetchall()
        response['candidate_school'] = queryResult[0][0]
        response['candidate_highest_level_of_education'] = queryResult[0][1]
        response['candidate_description'] = queryResult[0][2]
        response['candidate_current_position'] = queryResult[0][3]

        cursor.execute(f"""SELECT name_of_interest, is_deleted FROM public."Candidate Interests" WHERE user_id={currentUserId}""")
        queryResult = cursor.fetchall()
        constructInterests(response, queryResult[0], '1')
        constructInterests(response, queryResult[1], '2')
        constructInterests(response, queryResult[2], '3')

        response['status'] = True
        response['status_info'] = 'Candidate Profile Info Fetched Successfully'
    else:
        response['status'] = False
        response['status_info'] = 'Invalid token!'
    
    return response

def constructInterests(resObj, currRow, itemId):
    name_of_interest = 'name_of_interst_' + itemId
    is_deleted = 'is_deleted_' + itemId
    resObj[name_of_interest] = currRow[0]
    resObj[is_deleted] = currRow[1]
    