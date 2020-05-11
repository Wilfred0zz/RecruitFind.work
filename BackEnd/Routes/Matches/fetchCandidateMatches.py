from flask import Flask, Blueprint, request, make_response
import psycopg2
from flask_login import current_user, login_user, logout_user, login_required
import traceback
from collections import defaultdict

fcm = Blueprint('fetchCandidateMatches', __name__)

@fcm.route("/api/fetchCandidateMatches", methods=["GET"])
@login_required
def fetchCandidateMatches():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")
        if database:
            cursor = database.cursor()
            response = defaultdict(list)
            
            skills = []
            matches = []

            if current_user.is_authenticated:
                currentCandidateId = current_user.get_id()
                currentCandidateId = 216

                if currentCandidateId:
                    cursor.execute(f"""SELECT recruiter_id, query_id, match_id, status FROM public."Matches" WHERE status='PENDING' OR status='ACCEPTED' AND is_candidate_deleted={False} AND candidate_id={currentCandidateId}""")
                    queryResult = cursor.fetchall()

                    if len(queryResult) != 0:
                    
                        for i in range(len(queryResult)):
                            currentMatch = queryResult[i]
                            recruiterId = currentMatch[0]
                            queryId = currentMatch[1]
                            queryId = 72
                            matchId = currentMatch[2]
                            status = currentMatch[3]
                            matches.append(matchId)

                            cursor.execute(f"""SELECT email, first_name, last_name FROM public."Personal Information" WHERE user_id={recruiterId}""")
                            recruiterInfo = cursor.fetchone()
        
                            cursor.execute(f"""SELECT query_title, query_description, query_payment, query_date FROM public."Queries" WHERE query_id={queryId}""")
                            queryInfo = cursor.fetchone()
                    
                            cursor.execute(f"""SELECT skill_id FROM public."Query Skills" WHERE query_id={queryId}""")
                            print("this is the query idz: ", queryId)
                            skillIdsFromQueryInfo = cursor.fetchall()

                            for i in range(len(skillIdsFromQueryInfo)):
                                cursor.execute(f"""SELECT skill FROM public."Skills" WHERE skill_id='{skillIdsFromQueryInfo[i][0]}'""")
                                skill = cursor.fetchone()[0]
                                skills.insert(0, skill)

                            for i in range(len(matches)):
                                constructReponse(response, recruiterInfo, queryInfo, skills, matches[i], status)
                    else:
                        response['status'] = True
                        response['status_info'] = "Candidate Has No Matches At This Time!"
                
        else:
            error = "Connection To Database Failed!"
            response['error'] = error
            raise Exception(response)

    except Exception:
        print(traceback.format_exc())
        return response, 400
    return response


def constructReponse(respObj, recruiter, query, skills, match, status):
    recruiterInfo = []
    queryInfo = []
    recruiter = recruiter[::-1]
    query = query[::-1]

    for item in recruiter:
        recruiterInfo.insert(0, item)

    for item in query:
        queryInfo.insert(0, item)

    respObj['match'] = [{'recruiter_info': recruiterInfo, 'query_info': queryInfo, 'skills': skills, 'match_id': match, 'match_status': status} for x in range(1)]