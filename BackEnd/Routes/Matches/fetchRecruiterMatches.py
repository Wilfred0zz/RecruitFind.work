from flask import Flask, Blueprint, request, make_response
import psycopg2
from flask_login import current_user, login_user, logout_user, login_required
import traceback
from collections import defaultdict
import os

frm = Blueprint('fetchRecruiterMatches', __name__)

@frm.route("/api/fetchRecruiterMatches", methods=["GET"])
@login_required
def fetchRecruiterMatches():
    try:
        database = psycopg2.connect(user = "bylinkvsjtfdia", password = "b441303bb98c6533e96fa5c476852dcc067180f3a036d5bde62d61e9c5f19d5f", host= os.getenv('DATABASE_IP', "172.17.0.1") , port = "5432", database = "dauhmnvct04jp4")
        if database:
            cursor = database.cursor()
            response = defaultdict(list)
            skills = []
            matches = []

            if current_user.is_authenticated():
                recruiterId = current_user.get_id()

                if recruiterId:
                    cursor.execute(f"""SELECT candidate_id, query_id, match_id, status FROM public."Matches" WHERE (status='PENDING' OR status='ACCEPTED') AND (is_recruiter_deleted={False} AND recruiter_id={recruiterId})""")
                    queryResult = cursor.fetchall()
                    
                    for i in range(len(queryResult)):
                        currentMatch = queryResult[i]
                        candidateId = currentMatch[0]
                        queryId = currentMatch[1]
                        matchId = currentMatch[2]
                        status = currentMatch[3]
                        matches.append(matchId)

                        cursor.execute(f"""SELECT email, first_name, last_name FROM public."Personal Information" WHERE user_id={candidateId}""")
                        candidateInfo = cursor.fetchone()
    
                        cursor.execute(f"""SELECT query_title, query_description, query_payment, query_date FROM public."Queries" WHERE query_id={queryId}""")
                        queryInfo = cursor.fetchone()
                  
                        cursor.execute(f"""SELECT skill_id FROM public."Query Skills" WHERE query_id={queryId}""")
                        skillIdsFromQueryInfo = cursor.fetchall()

                        for j in range(len(skillIdsFromQueryInfo)):
                            cursor.execute(f"""SELECT skill FROM public."Skills" WHERE skill_id='{skillIdsFromQueryInfo[j][0]}'""")
                            skill = cursor.fetchone()[0]
                            skills.insert(0, skill)

                        matchObj = { i : constructReponse(response, candidateInfo, queryInfo, skills, matchId, status)}
                        response.update(matchObj)
                        skills = []
                        
                
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

    for x in range(1):
        respOb = {'candidate_info': candidateInfo, 'query_info': queryInfo, 'skills': skills, 'match_id': match, 'match_status': status }

    return respOb