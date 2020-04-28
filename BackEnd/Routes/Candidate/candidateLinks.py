from flask import Flask, Blueprint, request
import psycopg2

#database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")

#creates a cursor object to execute PostgreSQL commands via python
#cursor = database.cursor()

cl = Blueprint('candidateLinks', __name__)

@cl.route("/api/candidateLinks", methods=["POST"])
def storeCandidateLinks():
    response = dict()
    data = request.get_json()

    token = request.cookies.get('token')

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
        cursor.execute(f"""INSERT INTO public."Candidate Links" (user_id, link, type_of_link, is_deleted) VALUES ('{currentUserId}', '{link1}', '{typeOfLink1}', {isDeleted1})""")
        database.commit()
        cursor.execute(f"""INSERT INTO public."Candidate Links" (user_id, link, type_of_link, is_deleted) VALUES ('{currentUserId}', '{link2}', '{typeOfLink2}', {isDeleted2})""")
        database.commit()
        cursor.execute(f"""INSERT INTO public."Candidate Links" (user_id, link, type_of_link, is_deleted) VALUES ('{currentUserId}', '{link3}', '{typeOfLink3}', {isDeleted3})""")
        database.commit()
        
        response['status'] = True
        response['status_info'] = 'Candidate Links Stored Successfully'
    else:
        response['status'] = False
        response['status_info'] = 'Invalid token!'
    
    return response