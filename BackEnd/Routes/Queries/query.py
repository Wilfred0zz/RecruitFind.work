from flask import Flask, Blueprint, request, make_response
import psycopg2
from flask_login import current_user, login_user, logout_user, login_required
import os

qry = Blueprint('query', __name__)

@qry.route("/api/query", methods=["POST"])
@login_required
def storeQuery():
    try:
        database = psycopg2.connect(user = "bylinkvsjtfdia", password = "b441303bb98c6533e96fa5c476852dcc067180f3a036d5bde62d61e9c5f19d5f", host= os.getenv('DATABASE_IP', "172.17.0.1") , port = "5432", database = "dauhmnvct04jp4")
        if database:
            cursor = database.cursor()
            response = dict()
            data = request.get_json()
            skills = []
            skillIdTracker = []
            nonExistentSkillsTracker = []

            if current_user.is_authenticated():
            
                currentUserId = current_user.get_id()

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


                if currentUserId:
                    cursor.execute(f"""INSERT INTO public."Queries" (user_id, query_title, query_description, query_payment, query_date, is_deleted) VALUES ({currentUserId}, '{queryTitle}', '{queryDescription}', '{queryPayment}', '{queryDate}', {False})""")
                    database.commit()
                    cursor.execute(f"""SELECT query_id FROM public."Queries" WHERE user_id={currentUserId} AND query_title='{queryTitle}' AND query_description='{queryDescription}' AND query_payment='{queryPayment}' AND query_date='{queryDate}'""")
                    queryID = cursor.fetchone()[0]


                    for i in range(len(skills)):
                        cursor.execute(f"""SELECT skill_id FROM public."Skills" WHERE skill='{skills[i]}'""")
                        skillID = cursor.fetchone()
                        if skillID != None:
                            skillID = skillID[0]
                            skillIdTracker.insert(0, skillID)
                            cursor.execute(f"""INSERT INTO public."Query Skills" (query_id, skill_id, is_deleted) VALUES ({queryID}, {skillID}, {False})""")
                            database.commit()
                        else:
                            if i == 0 or i == 1 or i == 2 or i == 3 or i == 4 or i == 5 or i == 6 or i ==7 or i == 8:
                                nonExistentSkill = skills[i] 
                                if nonExistentSkill == "":
                                    nonExistentSkill = 'a' + str(i) +'z'
                                nonExistentSkillsTracker.insert(0, nonExistentSkill)
                                continue
                            if i == 9:
                                if len(nonExistentSkillsTracker) == 9:
                                    error = "No Users Have Any of the Skills That Were Entered!"
                                    response['error'] = error
                                    raise Exception(response)

                    response["query_id"] = queryID
                    response['status'] = True
                    response['status_info'] = 'Query Stored Successfully!'
        else:
            error = "Connection To Database Failed!"
            response['error'] = error
            raise Exception(response)

    except Exception:
        return response, 400
    return response



    
