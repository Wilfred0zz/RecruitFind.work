from flask import Flask, Blueprint, request
import psycopg2


cs = Blueprint('candidateSkills', __name__)

@cs.route("/api/candidateSkills", methods=["POST"])
def storeCandidateSkills():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")
        if database:
            cursor = database.cursor()
            response = dict()
            data = request.get_json()

            token = request.cookies.get('token')
            print("this is th token: ", token)

            if token == None:
                error = "User Not Authenticated!"
                response['error'] = error
                raise Exception(response)

            skill = data['skill']
            if len(skill) != 0:
                
                lcSkill = skill.lower()
                print(lcSkill)

                cursor.execute(f"""SELECT user_id FROM public."Personal Information" WHERE token='{token}'""")
                print(cursor.fetchone())
                print("1")
                currentUserId = cursor.fetchone()[0]
                print("3")
                print(currentUserId)

                if currentUserId:
                    query = (f"""SELECT skill_id FROM public."Skills" WHERE EXISTS (SELECT skill FROM public."Skills" WHERE skill='{lcSkill}')""")
                    cursor.execute(query)
                    print("1")
                    print(cursor.fetchone())

                    if cursor.fetchone() != None:
                        cursor.execute(f"""SELECT skill_id FROM public."Skills" WHERE skill='{lcSkill}'""")
                        skillId = cursor.fetchone()[0]
                        print(currentUserId)
                        cursor.execute(f"""SELECT skill_id FROM public."Candidate Skills" WHERE EXISTS (SELECT skill, user_id FROM public."Skills" WHERE skill='{lcSkill}' AND user_id={currentUserId})""")
                        alreadyExistingSkillForCandidate = cursor.fetchone()
                        print(alreadyExistingSkillForCandidate)
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
                        print(cursor.fetchone())
                        cursor.execute(f"""INSERT INTO public."Skills" (skill) VALUES ('{lcSkill}')""")
                        database.commit()
                        cursor.execute(f"""SELECT skill_id FROM public."Skills" WHERE skill='{lcSkill}'""")
                        skillId = cursor.fetchone()[0]
                        cursor.execute(f"""INSERT INTO public."Candidate Skills" (user_id, skill_id, is_deleted) VALUES ({currentUserId}, {skillId}, {False})""")
                        database.commit()
                        response['status'] = True
                        response['status_info'] = 'Candidate Skill Stored Successfully'
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