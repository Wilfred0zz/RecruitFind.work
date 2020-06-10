from flask import Flask, Blueprint, request
import psycopg2
from flask_login import current_user, login_user, logout_user, login_required
import os

dcs = Blueprint('deleteCandidateSkill', __name__)

@dcs.route("/api/deleteCandidateSkill", methods=["PUT"])
@login_required
def deleteCandidateSkill():
    try:
        database = psycopg2.connect(user = "bylinkvsjtfdia", password = "b441303bb98c6533e96fa5c476852dcc067180f3a036d5bde62d61e9c5f19d5f", host= os.getenv('DATABASE_IP', "172.17.0.1") , port = "5432", database = "dauhmnvct04jp4")
        if database:
            cursor = database.cursor()
            response = dict()
            data = request.get_json()

            if current_user.is_authenticated():

                skill = data['skill']

                if len(skill) != 0:            
                    lcSkill = skill.lower()

                    currentUserId = current_user.get_id()

                    if currentUserId:
                        
                        cursor.execute(f"""SELECT skill_id FROM public."Skills" WHERE skill='{lcSkill}'""")
                        skillId = cursor.fetchone()[0]
                        cursor.execute(f"""UPDATE public."Candidate Skills" SET is_deleted={True} WHERE user_id={currentUserId} AND skill_id={skillId}""")
                        database.commit()
                        response['status'] = True
                        response['status_info'] = 'Deleted Candidate Skill Successfully'
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