from flask import Flask, Blueprint, request
import psycopg2


database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")

#creates a cursor object to execute PostgreSQL commands via python
cursor = database.cursor()

ucl = Blueprint('updateCandidateLinks', __name__)

@ucl.route("/api/updateCandidateLinks", methods=["PUT"])
def updateCandidateLinks():
    response = dict()
    data = request.get_json()

    token = request.cookies.get('token')
    print("this is the token from broswer: ", token)

    typeOfLink1 = data['type_of_link_1']
    link1 = data['link_1']
    isDeleted1 = data['is_deleted_1']
    typeOfLink2= data['type_of_link_2']
    link2 = data['link_2']
    isDeleted2 = data['is_deleted_2']
    typeOfLink3 = data['type_of_link_3']
    link3 = data['link_3']
    isDeleted3 = data['is_deleted_3']

    cursor.execute(f"""SELECT user_id FROM public."Personal Information" WHERE token='{token}'""")
    currentUserId = cursor.fetchone()[0]

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
        response['status'] = False
        response['status_info'] = 'Invalid token!'
    
    return response
