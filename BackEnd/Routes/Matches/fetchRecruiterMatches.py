from flask import Flask, Blueprint, request, make_response
import psycopg2
from flask_login import current_user, login_user, logout_user, login_required
import traceback
from collections import defaultdict

frm = Blueprint('fetchRecruiterMatches', __name__)

@frm.route("/api/fetchRecruiterMatches", methods=["GET"])
@login_required
def storeQuery():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")
        if database:
            cursor = database.cursor()
            response = defaultdict(list)
            
            skills = []

            if current_user.is_authenticated:
                recruiterId = current_user.get_id()

                if recruiterId:
                    cursor.execute(f"""SELECT candidate_id, query_id FROM public."Matches" WHERE status='PENDING' AND is_recruiter_deleted={False} AND recruiter_id={recruiterId}""")
                    queryResult = cursor.fetchall()
                    
                    for i in range(len(queryResult)):
                        currentMatch = queryResult[i]
                        candidateId = currentMatch[0]
                        queryId = currentMatch[1]
                        queryId = 72

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

                        constructReponse(response, candidateInfo, queryInfo, skills)
                
        else:
            error = "Connection To Database Failed!"
            response['error'] = error
            raise Exception(response)

    except Exception:
        print(traceback.format_exc())
        return response, 400
    return response


def constructReponse(respObj, candidate, query, skills):
    candidateInfo = []
    queryInfo = []
    candidate = candidate[::-1]
    query = query[::-1]

    for item in candidate:
        candidateInfo.insert(0, item)

    for item in query:
        queryInfo.insert(0, item)

    respObj['match'] = [{'candidate_info': candidateInfo, 'query_info': queryInfo, 'skills': skills} for x in range(1)]