from flask import Flask, Blueprint, request, make_response
import psycopg2

qry = Blueprint('query', __name__)

@qry.route("/api/query", methods=["POST"])
def storeQuery():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")
        if database:
            cursor = database.cursor()
            response = dict()
            data = request.get_json()
            skills = []
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
                cursor.execute(f"""INSERT INTO public."Queries" (user_id, query_title, query_description, query_payment, query_date, is_deleted) VALUES ({currentUserId}, '{queryTitle}', '{queryDescription}', '{queryPayment}', '{queryDate}', {False})""")
                database.commit()
                cursor.execute(f"""SELECT query_id FROM public."Queries" WHERE user_id={currentUserId} AND query_title='{queryTitle}' AND query_description='{queryDescription}' AND query_payment='{queryPayment}' AND query_date='{queryDate}'""")
                queryID = cursor.fetchone()[0]

                for i in range(len(skills)):
                    print(skills[i])
                    cursor.execute(f"""SELECT skill_id FROM public."Skills" WHERE EXISTS (SELECT skill FROM public."Skills" WHERE skill='{skills[i]}')""")
                    skillID = cursor.fetchone()
                    if cursor.fetchone() != None:
                        skillID = skillID[0]
                        cursor.execute(f"""INSERT INTO public."Query Skills" (query_id, skill_id, is_deleted) VALUES ({queryID}, {skillID}, {False})""")
                        database.commit()
                    else:
                        nonExistentSkill = skills[i] 
                        print(i)
                        if nonExistentSkill == "":
                            continue
                        error = "No User With " + nonExistentSkill + " Skills Exists Within Our Database!"
                        response['error'] = error
                        raise Exception(response)

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