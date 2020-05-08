from flask import Flask, Blueprint, request, make_response
import psycopg2
from flask_login import current_user, login_user, logout_user, login_required
import traceback
from collections import defaultdict

frm = Blueprint('fetchRecruiterMatches', __name__)

@frm.route("/api/fetchRecruiterMatches", methods=["GET"])
@login_required
def fetchRecruiterMatches():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")
        if database:
            cursor = database.cursor()
            response = defaultdict(list)
            
            skills = []
            matches = []

            if current_user.is_authenticated:
                recruiterId = current_user.get_id()

                if recruiterId:
                    cursor.execute(f"""SELECT candidate_id, query_id, match_id, status FROM public."Matches" WHERE status='PENDING' OR status='ACCEPTED' AND is_recruiter_deleted={False} AND recruiter_id={recruiterId}""")
                    queryResult = cursor.fetchall()
                    
                    for i in range(len(queryResult)):
                        currentMatch = queryResult[i]
                        candidateId = currentMatch[0]
                        queryId = currentMatch[1]
                        queryId = 72
                        matchId = currentMatch[2]
                        status = currentMatch[3]
                        matches.append(matchId)

                        cursor.execute(f"""SELECT email, first_name, last_name FROM public."Personal Information" WHERE user_id={candidateId}""")
                        candidateInfo = cursor.fetchone()
    
                        cursor.execute(f"""SELECT query_title, query_description, query_payment, query_date FROM public."Queries" WHERE query_id={queryId}""")
                        queryInfo = cursor.fetchone()
                  
                        cursor.execute(f"""SELECT skill_id FROM public."Query Skills" WHERE query_id={queryId}""")
                        skillIdsFromQueryInfo = cursor.fetchall()

                        for i in range(len(skillIdsFromQueryInfo)):
                            cursor.execute(f"""SELECT skill FROM public."Skills" WHERE skill_id='{skillIdsFromQueryInfo[i][0]}'""")
                            skill = cursor.fetchone()[0]
                            skills.insert(0, skill)

                        for i in range(len(matches)):
                            constructReponse(response, candidateInfo, queryInfo, skills, matches[i], status)
                
        else:
            error = "Connection To Database Failed!"
            response['error'] = error
            raise Exception(response)

    except Exception:
        print(traceback.format_exc())
        return response, 400
    return response


def constructReponse(respObj, candidate, query, skills, match, status):
    candidateInfo = []
    queryInfo = []
    candidate = candidate[::-1]
    query = query[::-1]

    for item in candidate:
        candidateInfo.insert(0, item)

    for item in query:
        queryInfo.insert(0, item)

    respObj['match'] = [{'candidate_info': candidateInfo, 'query_info': queryInfo, 'skills': skills, 'match_id': match, 'match_status': status} for x in range(1)]