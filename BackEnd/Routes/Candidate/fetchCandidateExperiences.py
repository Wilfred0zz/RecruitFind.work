from flask import Flask, Blueprint, request
import psycopg2

fce = Blueprint('fetchCandidateExperiences', __name__)

@fce.route("/api/fetchCandidateExperiences", methods=["GET"])
def fetchCandidateExperiences():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")
        if database:
            cursor = database.cursor()
            response = dict()

            token = request.cookies.get('token')

            cursor.execute(f"""SELECT user_id FROM public."Personal Information" WHERE token='{token}'""")

            currentUserId = cursor.fetchone()[0]

            if currentUserId:
                cursor.execute(f"""SELECT role_title, description, start_date, end_date, present, is_deleted FROM public."Candidate Experiences" WHERE user_id={currentUserId}""")
                queryResult = cursor.fetchall()

                if len(queryResult) != 0:
                    
                    constructExperienceResponse(response, queryResult[0], '1')
                    constructExperienceResponse(response, queryResult[1], '2')
                    constructExperienceResponse(response, queryResult[2], '3')
                    constructExperienceResponse(response, queryResult[3], '4')
                    constructExperienceResponse(response, queryResult[4], '5')

                    response['status'] = True
                    response['status_info'] = 'Candidate Experiences Fetched Successfully'
                else:
                    error = "Experiences No Longer Exist!"
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

def constructExperienceResponse(resObj, currRow, itemId):
    role_title = 'role_title_' + itemId
    description = 'description_' + itemId
    start_date =  'start_date_' + itemId
    end_date = 'end_date_' + itemId
    present = 'present_' + itemId
    is_deleted = 'is_deleted_' + itemId

    resObj[role_title] = currRow[0]
    resObj[description] = currRow[1]
    resObj[start_date] = currRow[2]
    resObj[end_date] = currRow[3]
    resObj[present] = currRow[4]
    resObj[is_deleted] = currRow[5]