from flask import Flask, Blueprint, request, make_response
import psycopg2

fcm = Blueprint('fetchCandidateMatches', __name__)

@fcm.route("/api/fetchCandidateMatches", methods=["GET"])
def storeQuery():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")
        if database:
            cursor = database.cursor()
            response = dict()
            data = request.get_json()
            skills = []

            token = request.cookies.get('token')
            
            cursor.execute(f"""SELECT user_id FROM public."Personal Information" WHERE token='{token}'""")
            currentCandidateId = cursor.fetchone()[0]
            currentCandidateId = 128

            if currentCandidateId:
                cursor.execute(f"""SELECT recruiter_id, query_id FROM public."Matches" WHERE status='PENDING' AND is_candidate_deleted={False}""")
                queryResult = cursor.fetchall()
                
                for i in range(len(queryResult)):
                    currentMatch = queryResult[i]
                    recruiterId = currentMatch[0]
                    queryId = currentMatch[1]
                    cursor.execute(f"""SELECT email, first_name, last_name FROM public."Personal Information" WHERE user_id={recruiterId}""")
                    recruiterInfo = cursor.fetchone()
                    print(recruiterInfo)
                    cursor.execute(f"""SELECT query_title, query_description, query_payment, query_date FROM public."Personal Information" WHERE query_id={queryId}""")
                    queryInfo = cursor.fetchone()
                    print(queryInfo)
                    cursor.execute(f"""SELECT skill_id" FROM public."Query Skills" WHERE query_id={queryId}""")
                    skillIdsFromQueryInfo = cursor.fetchall()
                    print(skillIdsFromQueryInfo)

                    for i in range(len(skillIdsFromQueryInfo)):
                        cursor.execute(f"""SELECT skill" FROM public."Query Skills" WHERE skill_id={skillIdsFromQueryInfo[i]}""")
                        skill = cursor.fetchone()[0]
                        skills.insert(0, skill)
                    print(skills)

                

                
                response['status'] = True
                response['status_info'] = 'Candidate Matches Fetched Successfully!'
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