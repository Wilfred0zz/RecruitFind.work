from flask import Flask, Blueprint, request
import psycopg2
import traceback
from flask_login import current_user, login_user, logout_user, login_required

cs = Blueprint('candidateSkills', __name__)

@cs.route("/api/candidateSkills", methods=["POST"])
@login_required
def storeCandidateSkills():
    print("ntkbnjtnktnkbtnk")
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")
    
        if database:
            cursor = database.cursor()
            response = dict()
            data = request.get_json()
            
            if current_user.is_authenticated:

                skill = data['skill']
                
                if len(skill) != 0:
                    
                    lcSkill = skill.lower()

                    
                    currentUserId = current_user.get_id()


                    if currentUserId:
                        query = (f"""SELECT skill_id FROM public."Skills" WHERE EXISTS (SELECT skill FROM public."Skills" WHERE skill='{lcSkill}')""")
                        cursor.execute(query)

                        if cursor.fetchone() != None:
                            cursor.execute(f"""SELECT skill_id FROM public."Skills" WHERE skill='{lcSkill}'""")
                            skillId = cursor.fetchone()[0]
                            cursor.execute(f"""SELECT user_id FROM public."Candidate Skills" WHERE skill_id={skillId} AND user_id={currentUserId}""")
                            alreadyExistingSkillForCandidate = cursor.fetchone()
            
                            if alreadyExistingSkillForCandidate == None:

                                cursor.execute(f"""INSERT INTO public."Candidate Skills" (user_id, skill_id, is_deleted) VALUES ({currentUserId}, {skillId}, {False})""")
                                database.commit()
                                response['status'] = True
                                response['status_info'] = 'Skill Already Exists! Skill Stored For Candidate Successfully'
                            else:
                                error = "Candidate Already Has That Skill!"
                                response['error'] = error
                                raise Exception(response)
                        else:
                            cursor.execute(f"""INSERT INTO public."Skills" (skill) VALUES ('{lcSkill}')""")
                            database.commit()
                            cursor.execute(f"""SELECT skill_id FROM public."Skills" WHERE skill='{lcSkill}'""")
                            skillId = cursor.fetchone()[0]
                            cursor.execute(f"""INSERT INTO public."Candidate Skills" (user_id, skill_id, is_deleted) VALUES ({currentUserId}, {skillId}, {False})""")
                            database.commit()
                            response['status'] = True
                            response['status_info'] = 'Candidate Skill Stored Successfully'
                else:
                    error = "Skills Needs A Value!"
                    response['error'] = error
                    raise Exception(response)

        else:
            error = "Connection To Database Failed!"
            response['error'] = error
            raise Exception(response)
    except Exception:
        print(traceback.format_exc())
        return response, 400
    
    return response