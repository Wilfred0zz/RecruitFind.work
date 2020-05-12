from flask import Flask, Blueprint, request
import psycopg2
from flask_login import current_user, login_user, logout_user, login_required

fcpage = Blueprint('fetchCandidatePage', __name__)

@fcpage.route("/api/fetchCandidatePage", methods=["POST"])
@login_required
def fetchCandidateProfileInfo():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")
        if database:
            cursor = database.cursor()
            data = request.get_json()
            response = dict()

            if current_user.is_authenticated():
                currentUserID = current_user.get_id()
                email = data['email']

                if currentUserID:
                    cursor.execute(f"""SELECT user_id FROM "Personal Information" WHERE email='{email}'""")
                    userID = cursor.fetchone()[0]

                    cursor.execute(f"""SELECT candidate_school, candidate_highest_level_of_education, candidate_description, candidate_current_position, is_candidate_profile_deleted FROM public."Candidate Information" WHERE user_id={userID} AND is_candidate_profile_deleted={False}""")
                    queryResult = cursor.fetchall()
                    
                    if len(queryResult) != 0:
                        response['candidate_school'] = queryResult[0][0]
                        response['candidate_highest_level_of_education'] = queryResult[0][1]
                        response['candidate_description'] = queryResult[0][2]
                        response['candidate_current_position'] = queryResult[0][3]
                        response['is_candidate_profile_deleted'] = queryResult[0][4]

                        cursor.execute(f"""SELECT name_of_interest, is_deleted FROM public."Candidate Interests" WHERE user_id={userID} AND is_deleted={False}""")
                        queryResult = cursor.fetchall()
                        if len(queryResult) != 0:
                            if len(queryResult) == 1:
                                interestId1 = queryResult[0][0]
                                cursor.execute(f"""SELECT name_of_interest, is_deleted FROM public."Candidate Interests" WHERE link_id={interestId1}""")
                                queryResultFromLinkId = cursor.fetchall()
                                constructInterests(response, queryResultFromLinkId[0], '1')

                                cursor.execute(f"""SELECT name_of_interest, is_deleted FROM public."Candidate Interests" WHERE user_id={userID} AND is_deleted={True}""")
                                queryResultForDeletedLinks = cursor.fetchall()
                                constructInterests(response, queryResultForDeletedLinks[0], '2')
                                constructInterests(response, queryResultForDeletedLinks[1], '3')

                            elif len(queryResult) == 2:
                                interestId1 = queryResult[0][0]
                                interestId2 = queryResult[1][0]
                                cursor.execute(f"""SELECT name_of_interest, is_deleted FROM public."Candidate Interests" WHERE link_id={interestId1} OR link_id={interestId2}""")
                                queryResultFromLinkId = cursor.fetchall()
                                constructInterests(response, queryResultFromLinkId[0], '1')
                                constructInterests(response, queryResultFromLinkId[1], '2')

                                cursor.execute(f"""SELECT name_of_interest, is_deleted FROM public."Candidate Interests" WHERE user_id={userID} AND is_deleted={True}""")
                                queryResultForDeletedLinks = cursor.fetchall()
                                constructInterests(response, queryResultForDeletedLinks[0], '3')

                            else:
                                constructInterests(response, queryResult[0], '1')
                                constructInterests(response, queryResult[1], '2')
                                constructInterests(response, queryResult[2], '3')

                            
                        else:
                            error = "Candidate Interests Do Not Exist!"
                            response['error'] = error 
                    
                    else:
                        error = "Candidate Profile Does Not Exist!"
                        response['error'] = error
                        raise Exception(response)


                cursor.execute(f"""SELECT first_name, last_name, email, phone_number, personal_street_address, personal_state, personal_city, personal_postal, personal_country, gender, status FROM public."Personal Information" WHERE user_id={userID} AND status='candidate' AND email='{email}'""")
                queryResult = cursor.fetchall()

                if len(queryResult) != 0:
                    response['first_name'] = queryResult[0][0]
                    response['last_name'] = queryResult[0][1]
                    response['email'] = queryResult[0][2]
                    response['phone_number'] = queryResult[0][3]
                    response['personal_street_address'] = queryResult[0][4]
                    response['personal_state'] = queryResult[0][5]
                    response['personal_city'] = queryResult[0][6]
                    response['personal_postal'] = queryResult[0][7]
                    response['personal_country'] = queryResult[0][8]
                    response['gender'] = queryResult[0][9]
                    response['status'] = queryResult[0][10]

                else:
                    error = "Either User No Longer Exists Or Is Not A Candidate!"
                    response['error'] = error
                    raise Exception(response)

                cursor.execute(f"""SELECT role_title, description, start_date, end_date, present, is_deleted FROM public."Candidate Experiences" WHERE user_id={userID} AND is_deleted={False}""")
                queryResult = cursor.fetchall()

                if len(queryResult) != 0:
                    if len(queryResult) == 1:
                        experienceId1 = queryResult[0][0]
                        cursor.execute(f"""SELECT role_title, description, start_date, end_date, present, is_deleted FROM public."Candidate Experiences" WHERE experience_id={experienceId1}""")
                        queryResultFromExperienceId = cursor.fetchall()
                        constructExperienceResponse(response, queryResultFromExperienceId[0], '1')

                        cursor.execute(f"""SELECT role_title, description, start_date, end_date, present, is_deleted FROM public."Candidate Experiences" WHERE user_id={userID} AND is_deleted={True}""")
                        queryResultForDeletedLinks = cursor.fetchall()
                        constructExperienceResponse(response, queryResultForDeletedLinks[0], '2')
                        constructExperienceResponse(response, queryResultForDeletedLinks[1], '3')
                        constructExperienceResponse(response, queryResultForDeletedLinks[2], '4')
                        constructExperienceResponse(response, queryResultForDeletedLinks[3], '5')
                    elif len(queryResult) == 2:
                        experienceId1 = queryResult[0][0]
                        experienceId2 = queryResult[1][0]
                        cursor.execute(f"""SELECT role_title, description, start_date, end_date, present, is_deleted FROM public."Candidate Experiences" WHERE experience_id={experienceId1} OR experience_id={experienceId2}""")
                        queryResultFromExperienceId = cursor.fetchall()
                        constructExperienceResponse(response, queryResultFromExperienceId[0], '1')
                        constructExperienceResponse(response, queryResultFromExperienceId[1], '2')

                        cursor.execute(f"""SELECT role_title, description, start_date, end_date, present, is_deleted FROM public."Candidate Experiences" WHERE user_id={userID} AND is_deleted={True}""")
                        queryResultForDeletedLinks = cursor.fetchall()
                        constructExperienceResponse(response, queryResultForDeletedLinks[0], '3')
                        constructExperienceResponse(response, queryResultForDeletedLinks[1], '4')
                        constructExperienceResponse(response, queryResultForDeletedLinks[2], '5')
                    elif len(queryResult) == 3:
                        experienceId1 = queryResult[0][0]
                        experienceId2 = queryResult[1][0]
                        experienceId3 = queryResult[2][0]
                        cursor.execute(f"""SELECT role_title, description, start_date, end_date, present, is_deleted FROM public."Candidate Experiences" WHERE experience_id={experienceId1} OR experience_id={experienceId2} OR experience_id={experienceId3}""")
                        queryResultFromExperienceId = cursor.fetchall()
                        constructExperienceResponse(response, queryResultFromExperienceId[0], '1')
                        constructExperienceResponse(response, queryResultFromExperienceId[1], '2')
                        constructExperienceResponse(response, queryResultFromExperienceId[2], '3')

                        cursor.execute(f"""SELECT role_title, description, start_date, end_date, present, is_deleted FROM public."Candidate Experiences" WHERE user_id={userID} AND is_deleted={True}""")
                        queryResultForDeletedLinks = cursor.fetchall()
                        constructExperienceResponse(response, queryResultForDeletedLinks[0], '4')
                        constructExperienceResponse(response, queryResultForDeletedLinks[1], '5')
                    elif len(queryResult) == 4:
                        
                        experienceId1 = queryResult[0][0]
                        experienceId2 = queryResult[1][0]
                        experienceId3 = queryResult[2][0]
                        experienceId4 = queryResult[3][0]
                        cursor.execute(f"""SELECT role_title, description, start_date, end_date, present, is_deleted FROM public."Candidate Experiences" WHERE experience_id={experienceId1} OR experience_id={experienceId2} OR experience_id={experienceId3} OR experience_id={experienceId4}""")
                        queryResultFromExperienceId = cursor.fetchall()
                        
                        constructExperienceResponse(response, queryResultFromExperienceId[0], '1')
                        constructExperienceResponse(response, queryResultFromExperienceId[1], '2')
                        constructExperienceResponse(response, queryResultFromExperienceId[2], '3')
                        constructExperienceResponse(response, queryResultFromExperienceId[3], '4')

                        cursor.execute(f"""SELECT role_title, description, start_date, end_date, present, is_deleted FROM public."Candidate Experiences" WHERE user_id={userID} AND is_deleted={True}""")
                        queryResultForDeletedLinks = cursor.fetchall()
                        constructExperienceResponse(response, queryResultForDeletedLinks[0], '5')
                    else:
                        constructExperienceResponse(response, queryResult[0], '1')
                        constructExperienceResponse(response, queryResult[1], '2')
                        constructExperienceResponse(response, queryResult[2], '3')
                        constructExperienceResponse(response, queryResult[3], '4')
                        constructExperienceResponse(response, queryResult[4], '5')

                else:
                    error = "Experiences No Longer Exist!"
                    response['error'] = error
                    raise Exception(response)


                cursor.execute(f"""SELECT skill_id, is_deleted FROM public."Candidate Skills" WHERE user_id={userID} AND is_deleted={False}""")
                queryResult = cursor.fetchall()

                if len(queryResult) != 0:
                    for i in range(len(queryResult)):
                        for j in range(len(queryResult[i])):
                            if j % 2 == 0:
                                query = (f"""SELECT skill FROM public."Skills" WHERE skill_id='{queryResult[i][j]}'""")
                                cursor.execute(query)
                                key = 'skill_' + str(i+1)
                                response[key] = cursor.fetchone()[0]
                            else:
                                key = 'is_deleted_' + str(i+1)
                                response[key] = queryResult[i][j]
                    

                else:
                    response['status'] = True
                    response['status_info'] = 'User Has No Skills!'

                


                cursor.execute(f"""SELECT link, type_of_link, is_deleted FROM public."Candidate Links" WHERE user_id={userID} AND is_deleted={False}""")
                queryResult = cursor.fetchall()
                print("this is query result: ", queryResult)

                if len(queryResult) != 0:
                    if len(queryResult) == 1:
                        linkId1 = queryResult[0][0]
                        cursor.execute(f"""SELECT link, type_of_link, is_deleted FROM public."Candidate Links" WHERE link_id={linkId1}""")
                        queryResultFromLinkId = cursor.fetchall()
                        print(queryResultFromLinkId)
                        constructLinksResponse(response, queryResultFromLinkId[0], '1')

                        cursor.execute(f"""SELECT link, type_of_link, is_deleted FROM public."Candidate Links" WHERE user_id={userID} AND is_deleted={True}""")
                        queryResultForDeletedLinks = cursor.fetchall()
                        constructLinksResponse(response, queryResultForDeletedLinks[0], '2')
                        constructLinksResponse(response, queryResultForDeletedLinks[1], '3')

                    elif len(queryResult) == 2:
                        linkId1 = queryResult[0][0]
                        linkId2 = queryResult[1][0]
                        cursor.execute(f"""SELECT link, type_of_link, is_deleted FROM public."Candidate Links" WHERE link_id={linkId1} OR link_id={linkId2}""")
                        queryResultFromLinkId = cursor.fetchall()
                        constructLinksResponse(response, queryResultFromLinkId[0], '1')
                        constructLinksResponse(response, queryResultFromLinkId[1], '2')

                        cursor.execute(f"""SELECT link, type_of_link, is_deleted FROM public."Candidate Links" WHERE user_id={userID} AND is_deleted={True}""")
                        queryResultForDeletedLinks = cursor.fetchall()
                        constructLinksResponse(response, queryResultForDeletedLinks[0], '3')

                    else:
                        constructLinksResponse(response, queryResult[0], '1')
                        constructLinksResponse(response, queryResult[1], '2')
                        constructLinksResponse(response, queryResult[2], '3')
                    
                else:
                    error = "Links No Longer Exist!"
                    response['error'] = error
                    raise Exception(response)


        else:
            error = "Connection To Database Failed!"
            response['error'] = error
            raise Exception(response)
    except Exception:
        return response, 400
    
    
    return response

def constructInterests(resObj, currRow, itemId):
    name_of_interest = 'name_of_interst_' + itemId
    is_deleted = 'is_deleted_' + itemId
    resObj[name_of_interest] = currRow[0]
    resObj[is_deleted] = currRow[1]

def constructExperienceResponse(resObj, currRow, itemId):
    role_title = 'role_title_' + itemId
    description = 'description_' + itemId
    start_date =  'start_date_' + itemId
    end_date = 'end_date_' + itemId
    present = 'present_' + itemId
    is_deleted = 'is_deleted_' + itemId

    resObj[role_title] = currRow[0]
    resObj[description] = currRow[1]
    resObj[start_date] = currRow[2]
    resObj[end_date] = currRow[3]
    resObj[present] = currRow[4]
    resObj[is_deleted] = currRow[5]

def constructLinksResponse(resObj, currRow, itemId):
    link = 'link_' + itemId
    type_of_link = 'type_of_link_' + itemId
    is_deleted = 'is_deleted_' + itemId

    resObj[link] = currRow[0]
    resObj[type_of_link] = currRow[1]
    resObj[is_deleted] = currRow[2]

    