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
                    print(queryResult)
                    
                    for i in range(len(queryResult)):
                        print(i)
                        currentMatch = queryResult[i]
                        candidateId = currentMatch[0]
                        print(candidateId)
                        queryId = currentMatch[1]
                        print("this is the query id: ", queryId)
                        matchId = currentMatch[2]
                        print(matchId)
                        status = currentMatch[3]
                        print(status)
                        matches.append(matchId)

                        cursor.execute(f"""SELECT email, first_name, last_name FROM public."Personal Information" WHERE user_id={candidateId}""")
                        candidateInfo = cursor.fetchone()
                        #print("this is candidate info: ", candidateInfo)
    
                        cursor.execute(f"""SELECT query_title, query_description, query_payment, query_date FROM public."Queries" WHERE query_id={queryId}""")
                        queryInfo = cursor.fetchone()
                        #print("this is first query info: ", queryInfo)
                  
                        cursor.execute(f"""SELECT skill_id FROM public."Query Skills" WHERE query_id={queryId}""")
                        skillIdsFromQueryInfo = cursor.fetchall()
                        print("these are skills: ", skillIdsFromQueryInfo)
                        #print("this is query info: ", queryInfo)

                        for i in range(len(skillIdsFromQueryInfo)):
                            cursor.execute(f"""SELECT skill FROM public."Skills" WHERE skill_id='{skillIdsFromQueryInfo[i][0]}'""")
                            skill = cursor.fetchone()[0]
                            skills.insert(0, skill)

                        for i in range(len(matches)):
                            constructReponse(response, candidateInfo, queryInfo, skills, matches[i], status, i)
                
        else:
            error = "Connection To Database Failed!"
            response['error'] = error
            raise Exception(response)

    except Exception:
        print(traceback.format_exc())
        return response, 400
    return response


def constructReponse(respObj, candidate, query, skills, match, status, number):
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

    respObj['match_'+str(number)] = [{'candidate_info': candidateInfo, 'query_info': queryInfo, 'skills': skills, 'match_id': match, 'match_status': status} for x in range(1)]