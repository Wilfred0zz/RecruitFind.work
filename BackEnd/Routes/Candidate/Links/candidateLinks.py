from flask import Flask, Blueprint, request
import psycopg2
from flask_login import current_user, login_user, logout_user, login_required
import os

cl = Blueprint('candidateLinks', __name__)

@cl.route("/api/candidateLinks", methods=["POST"])
@login_required
def storeCandidateLinks():
    try: 
        database = psycopg2.connect(user = "bylinkvsjtfdia", password = "b441303bb98c6533e96fa5c476852dcc067180f3a036d5bde62d61e9c5f19d5f", host= os.getenv('DATABASE_IP', "172.17.0.1") , port = "5432", database = "dauhmnvct04jp4")
        if database:
            cursor = database.cursor()
            response = dict()
            data = request.get_json()

            if current_user.is_authenticated():

                typeOfLink1 = data['type_of_link_1']
                link1 = data['link_1']
                isDeleted1 = data['is_deleted_1']
                typeOfLink2= data['type_of_link_2']
                link2 = data['link_2']
                isDeleted2 = data['is_deleted_2']
                typeOfLink3 = data['type_of_link_3']
                link3 = data['link_3']
                isDeleted3 = data['is_deleted_3']
                
                currentUserId = current_user.get_id()

                if currentUserId:
                    cursor.execute(f"""INSERT INTO public."Candidate Links" (user_id, link, type_of_link, is_deleted) VALUES ('{currentUserId}', '{link1}', '{typeOfLink1}', {isDeleted1})""")
                    database.commit()
                    cursor.execute(f"""INSERT INTO public."Candidate Links" (user_id, link, type_of_link, is_deleted) VALUES ('{currentUserId}', '{link2}', '{typeOfLink2}', {isDeleted2})""")
                    database.commit()
                    cursor.execute(f"""INSERT INTO public."Candidate Links" (user_id, link, type_of_link, is_deleted) VALUES ('{currentUserId}', '{link3}', '{typeOfLink3}', {isDeleted3})""")
                    database.commit()
                    
                    response['status'] = True
                    response['status_info'] = 'Candidate Links Stored Successfully'
        else:
            error = "Connection To Database Failed!"
            response['error'] = error
            raise Exception(response)
    except Exception:
        return response, 400

    return response