from flask import Flask, Blueprint, request
import psycopg2

dcs = Blueprint('deleteCandidateSkill', __name__)

@dcs.route("/api/deleteCandidateSkill", methods=["PUT"])
def deleteCandidateSkill():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")
        if database:
            cursor = database.cursor()
            response = dict()
            data = request.get_json()

            token = request.cookies.get('token')

            if token == None:
                error = "User Not Authenticated!"
                response['error'] = error
                raise Exception(response)

            skill = data['skill']

            if len(skill) != 0:            
                lcSkill = skill.lower()

                cursor.execute(f"""SELECT user_id FROM public."Personal Information" WHERE token='{token}'""")

                currentUserId = cursor.fetchone()[0]

                if currentUserId:
                    
                    cursor.execute(f"""SELECT skill_id FROM public."Skills" WHERE skill='{lcSkill}'""")
                    skillId = cursor.fetchone()[0]
                    cursor.execute(f"""UPDATE public."Candidate Skills" SET is_deleted={True} WHERE user_id={currentUserId} AND skill_id={skillId}""")
                    database.commit()
                    response['status'] = True
                    response['status_info'] = 'Deleted Candidate Skill Successfully'
                    
                else:
                    error = "Invalid Token!"
                    response['error'] = error
                    raise Exception(response)
            else:
                error = "Skills Needs A Value!"
                response['error'] = error
                raise Exception(response)

        else:
            error = "Connection To Database Failed!"
            response['error'] = error
            raise Exception(response)
    except Exception:
        return response, 400
    
    return response