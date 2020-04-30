from flask import Flask, Blueprint, request
import psycopg2


fcp = Blueprint('fetchCandidateProfileInfo', __name__)

@fcp.route("/api/fetchCandidateProfileInfo", methods=["GET"])
def fetchCandidateProfileInfo():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")
        if database:
            cursor = database.cursor()
            response = dict()

            token = request.cookies.get('token')

            cursor.execute(f"""SELECT user_id FROM public."Personal Information" WHERE token='{token}'""")

            currentUserId = cursor.fetchone()[0]

            if currentUserId:
                cursor.execute(f"""SELECT candidate_school, candidate_highest_level_of_education, candidate_description, candidate_current_position, is_candidate_profile_deleted FROM public."Candidate Information" WHERE user_id={currentUserId} AND is_candidate_profile_deleted={False}""")
                queryResult = cursor.fetchall()
                
                if len(queryResult) != 0:
                    response['candidate_school'] = queryResult[0][0]
                    response['candidate_highest_level_of_education'] = queryResult[0][1]
                    response['candidate_description'] = queryResult[0][2]
                    response['candidate_current_position'] = queryResult[0][3]
                    response['is_candidate_profile_deleted'] = queryResult[0][4]

                    cursor.execute(f"""SELECT name_of_interest, is_deleted FROM public."Candidate Interests" WHERE user_id={currentUserId}""")
                    queryResult = cursor.fetchall()
                    constructInterests(response, queryResult[0], '1')
                    constructInterests(response, queryResult[1], '2')
                    constructInterests(response, queryResult[2], '3')

                    response['status'] = True
                    response['status_info'] = 'Candidate Profile Info Fetched Successfully'
                else:
                    error = "Candidate Profile Does Not Exist!"
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

def constructInterests(resObj, currRow, itemId):
    name_of_interest = 'name_of_interst_' + itemId
    is_deleted = 'is_deleted_' + itemId
    resObj[name_of_interest] = currRow[0]
    resObj[is_deleted] = currRow[1]
    