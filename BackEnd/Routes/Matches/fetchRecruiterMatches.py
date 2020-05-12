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
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= os.getenv('DATABASE_IP', "172.17.0.1") , port = "5432", database = "recruitfindwork")
        if database:
            cursor = database.cursor()
            response = defaultdict(list)
            skills = []
            matches = []

            if current_user.is_authenticated():
                recruiterId = current_user.get_id()

                if recruiterId:
                    cursor.execute(f"""SELECT candidate_id, query_id, match_id, status FROM public."Matches" WHERE status='PENDING' OR status='ACCEPTED' AND is_recruiter_deleted={False} AND recruiter_id={recruiterId}""")
                    queryResult = cursor.fetchall()
                    #print("this is query result: ", queryResult)
                    
                    for i in range(len(queryResult)):
                        currentMatch = queryResult[i]
                        candidateId = currentMatch[0]
                        #print("this is candidat id: ", candidateId)
                        queryId = currentMatch[1]
                        #print("this is the query id: ", queryId)
                        matchId = currentMatch[2]
                        #print("this is match id: ", matchId)
                        status = currentMatch[3]
                        #print("this is status: ", status)
                        matches.append(matchId)

                        cursor.execute(f"""SELECT email, first_name, last_name FROM public."Personal Information" WHERE user_id={candidateId}""")
                        candidateInfo = cursor.fetchone()
                        #print("this is candidate info: ", candidateInfo)
    
                        cursor.execute(f"""SELECT query_title, query_description, query_payment, query_date FROM public."Queries" WHERE query_id={queryId}""")
                        queryInfo = cursor.fetchone()
                        #print("this is first query info: ", queryInfo)
                  
                        cursor.execute(f"""SELECT skill_id FROM public."Query Skills" WHERE query_id={queryId}""")
                        skillIdsFromQueryInfo = cursor.fetchall()
                        #print("these are skills: ", skillIdsFromQueryInfo)

                        for j in range(len(skillIdsFromQueryInfo)):
                            cursor.execute(f"""SELECT skill FROM public."Skills" WHERE skill_id='{skillIdsFromQueryInfo[j][0]}'""")
                            skill = cursor.fetchone()[0]
                            skills.insert(0, skill)
                            #print("this is ", candidateId, "'s skills ", skills)

                        matchObj = { i : constructReponse(response, candidateInfo, queryInfo, skills, matchId, status)}
                        response.update(matchObj)
                        skills = []

                        print("this is response: ", response)
                        
                
        else:
            error = "Connection To Database Failed!"
            response['error'] = error
            raise Exception(response)

    except Exception:
        print(traceback.format_exc())
        return response, 400
    return response


def constructReponse(respObj, candidate, query, skills, match, status):
    #print(respObj)
    #print(candidate)
    #print(query)
    #print(skills)
    #print(match)
    #print(status)

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