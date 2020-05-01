from flask import Flask, Blueprint, request, make_response
import psycopg2
from collections import defaultdict

qryrslt = Blueprint('queryResult', __name__)

@qryrslt.route("/api/queryResult", methods=["GET"])
def storeQuery():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")
        if database:
            cursor = database.cursor()
            response = dict()
            data = request.get_json()
            skills = []
            candidatesWithDesiredSkills = defaultdict(list)

            queryTitle = data['query_title']
            queryDescription = data['query_description']
            queryPayment = data['query_payment']
            queryDate = data['query_date']
            
            desiredSkill1 = data['desired_skill_1']
            desiredSkill2 = data['desired_skill_2']
            desiredSkill3 = data['desired_skill_3']
            desiredSkill4 = data['desired_skill_4']
            desiredSkill5 = data['desired_skill_5']
            desiredSkill6 = data['desired_skill_6']
            desiredSkill7 = data['desired_skill_7']
            desiredSkill8 = data['desired_skill_8']
            desiredSkill9 = data['desired_skill_9']
            desiredSkill10 = data['desired_skill_10']

            skills.insert(0, desiredSkill10)
            skills.insert(0, desiredSkill9)
            skills.insert(0, desiredSkill8)
            skills.insert(0, desiredSkill7)
            skills.insert(0, desiredSkill6)
            skills.insert(0, desiredSkill5)
            skills.insert(0, desiredSkill4)
            skills.insert(0, desiredSkill3)
            skills.insert(0, desiredSkill2)
            skills.insert(0, desiredSkill1)

            token = request.cookies.get('token')
            cursor.execute(f"""SELECT user_id FROM public."Personal Information" WHERE token='{token}'""")

            currentUserId = cursor.fetchone()[0]

            if currentUserId:
                cursor.execute(f"""SELECT query_id FROM public."Queries" WHERE user_id={currentUserId} AND query_title='{queryTitle}' AND query_description='{queryDescription}' AND query_payment='{queryPayment}' AND query_date='{queryDate}'""")
                queryID = cursor.fetchone()[0]

                for i in range(len(skills)):
                    cursor.execute(f"""SELECT skill_id FROM public."Skills" WHERE skill='{skills[i]}'""")
                    skillID = cursor.fetchone()[0]
                
                    cursor.execute(f"""SELECT user_id FROM public."Candidate Skills" WHERE skill_id={skillID}""")
                    queryResult = cursor.fetchall()
                    extractedUsers = extractUsersFromQueryResult(queryResult)
                    candidatesWithDesiredSkills[skills[i]].extend(extractedUsers)

                print(candidatesWithDesiredSkills)
                #Next need to search through users in candidatesWithDesiredSkills and get all of the users and their infomation
                #user with most matched skills gets highest priority

                response['status'] = True
                response['status_info'] = 'Query Stored Successfully!'
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


def extractUsersFromQueryResult(qryResult):
    newQryResult = []

    for i in range(len(qryResult)):
        user = qryResult[i][0]
        newQryResult.insert(0, user)

    newQryResult = newQryResult[::-1]
    return newQryResult

