from flask import Flask, Blueprint, request
import psycopg2
from flask_login import current_user, login_user, logout_user, login_required
import os

uce = Blueprint('updateCandidateExperiences', __name__)

@uce.route("/api/updateCandidateExperiences", methods=["PUT"])
@login_required
def updateCandidateExperiences():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= os.getenv('DATABASE_IP', "172.17.0.1") , port = "5432", database = "recruitfindwork")
        if database:
            cursor = database.cursor()
            response = dict()
            data = request.get_json()

            if current_user.is_authenticated:

                roleTitle1 = data['role_title_1']
                description1 = data['description_1']
                startDate1 = data['start_date_1']
                endDate1 = data['end_date_1']
                present1 = data['present_1']
                isDeleted1 = data['is_deleted_1']

                roleTitle2 = data['role_title_2']
                description2 = data['description_2']
                startDate2 = data['start_date_2']
                endDate2 = data['end_date_2']
                present2 = data['present_2']
                isDeleted2 = data['is_deleted_2']

                roleTitle3 = data['role_title_3']
                description3 = data['description_3']
                startDate3 = data['start_date_3']
                endDate3 = data['end_date_3']
                present3 = data['present_3']
                isDeleted3 = data['is_deleted_3']

                roleTitle4 = data['role_title_4']
                description4 = data['description_4']
                startDate4 = data['start_date_4']
                endDate4 = data['end_date_4']
                present4 = data['present_4']
                isDeleted4 = data['is_deleted_4']

                roleTitle5 = data['role_title_5']
                description5 = data['description_5']
                startDate5 = data['start_date_5']
                endDate5 = data['end_date_5']
                present5 = data['present_5']
                isDeleted5 = data['is_deleted_5']
                
                currentUserId = current_user.get_id()
                print("this is the user's id: ", currentUserId)

                if currentUserId:
                    cursor.execute(f"""SELECT experience_id FROM public."Candidate Experiences" WHERE user_id = '{currentUserId}'""")
                    queryResult = cursor.fetchall()

                    cursor.execute(f"""UPDATE public."Candidate Experiences" SET user_id={currentUserId}, role_title='{roleTitle1}', description='{description1}', start_date='{startDate1}', end_date='{endDate1}', present='{present1}', is_deleted={isDeleted1} WHERE experience_id={queryResult[0][0]}""")
                    database.commit()
                    cursor.execute(f"""UPDATE public."Candidate Experiences" SET user_id={currentUserId}, role_title='{roleTitle2}', description='{description2}', start_date='{startDate2}', end_date='{endDate2}', present='{present2}', is_deleted={isDeleted2} WHERE experience_id={queryResult[1][0]}""")
                    database.commit()
                    cursor.execute(f"""UPDATE public."Candidate Experiences" SET user_id={currentUserId}, role_title='{roleTitle3}', description='{description3}', start_date='{startDate3}', end_date='{endDate3}', present='{present3}', is_deleted={isDeleted3} WHERE experience_id={queryResult[2][0]}""")
                    database.commit()
                    cursor.execute(f"""UPDATE public."Candidate Experiences" SET user_id={currentUserId}, role_title='{roleTitle4}', description='{description4}', start_date='{startDate4}', end_date='{endDate4}', present='{present4}', is_deleted={isDeleted4} WHERE experience_id={queryResult[3][0]}""")
                    database.commit()
                    cursor.execute(f"""UPDATE public."Candidate Experiences" SET user_id={currentUserId}, role_title='{roleTitle5}', description='{description5}', start_date='{startDate5}', end_date='{endDate5}', present='{present5}', is_deleted={isDeleted5} WHERE experience_id={queryResult[4][0]}""")
                    database.commit()
                    
                    response['status'] = True
                    response['status_info'] = 'Candidate Experiences Updated Successfully'
        else:
            error = "Connection To Database Failed!"
            response['error'] = error
            raise Exception(response)
    except Exception:
        return response, 400
    
    return response