from flask import Flask, Blueprint, request
import psycopg2
from flask_login import current_user, login_user, logout_user, login_required
import os

ucl = Blueprint('updateCandidateLinks', __name__)

@ucl.route("/api/updateCandidateLinks", methods=["PUT"])
@login_required
def updateCandidateLinks():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= os.getenv('DATABASE_IP', "172.17.0.1") , port = "5432", database = "recruitfindwork")
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
                    cursor.execute(f"""SELECT link_id FROM public."Candidate Links" WHERE user_id = '{currentUserId}'""")
                    queryResult = cursor.fetchall()
                
                    cursor.execute(f"""UPDATE public."Candidate Links" SET user_id={currentUserId}, link='{link1}', type_of_link='{typeOfLink1}', is_deleted='{isDeleted1}' WHERE link_id={queryResult[0][0]}""")
                    database.commit()
                    cursor.execute(f"""UPDATE public."Candidate Links" SET user_id={currentUserId}, link='{link2}', type_of_link='{typeOfLink2}', is_deleted='{isDeleted2}' WHERE link_id={queryResult[1][0]}""")
                    database.commit()
                    cursor.execute(f"""UPDATE public."Candidate Links" SET user_id={currentUserId}, link='{link3}', type_of_link='{typeOfLink3}', is_deleted='{isDeleted3}' WHERE link_id={queryResult[2][0]}""")
                    database.commit()
                    response['status'] = True
                    response['status_info'] = 'Candidate Links Updated Successfully'
        else:
            error = "Connection To Database Failed!"
            response['error'] = error
            raise Exception(response)
    except Exception:
        return response, 400
    
    return response
