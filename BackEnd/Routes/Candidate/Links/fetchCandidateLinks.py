from flask import Flask, Blueprint, request
import psycopg2
from flask_login import current_user, login_user, logout_user, login_required

fcl = Blueprint('fetchCandidateLinks', __name__)

@fcl.route("/api/fetchCandidateLinks", methods=["GET"])
@login_required
def fetchCandidateLinks():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")
        if database:
            cursor = database.cursor()
            response = dict()

            if current_user.is_authenticated:

                currentUserId = current_user.get_id()

                if currentUserId:
                    cursor.execute(f"""SELECT link, type_of_link, is_deleted FROM public."Candidate Links" WHERE user_id={currentUserId} AND is_deleted={False}""")
                    queryResult = cursor.fetchall()
                    print("this is query result: ", queryResult)

                    if len(queryResult) != 0:
                        if len(queryResult) == 1:
                            linkId1 = queryResult[0][0]
                            cursor.execute(f"""SELECT link, type_of_link, is_deleted FROM public."Candidate Links" WHERE link_id={linkId1}""")
                            queryResultFromLinkId = cursor.fetchall()
                            print(queryResultFromLinkId)
                            constructLinksResponse(response, queryResultFromLinkId[0], '1')

                            cursor.execute(f"""SELECT link, type_of_link, is_deleted FROM public."Candidate Links" WHERE user_id={currentUserId} AND is_deleted={True}""")
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

                            cursor.execute(f"""SELECT link, type_of_link, is_deleted FROM public."Candidate Links" WHERE user_id={currentUserId} AND is_deleted={True}""")
                            queryResultForDeletedLinks = cursor.fetchall()
                            constructLinksResponse(response, queryResultForDeletedLinks[0], '3')

                        else:
                            constructLinksResponse(response, queryResult[0], '1')
                            constructLinksResponse(response, queryResult[1], '2')
                            constructLinksResponse(response, queryResult[2], '3')
                        response['status'] = True
                        response['status_info'] = 'Candidate Links Fetched Successfully'
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

def constructLinksResponse(resObj, currRow, itemId):
    link = 'link_' + itemId
    type_of_link = 'type_of_link_' + itemId
    is_deleted = 'is_deleted_' + itemId

    resObj[link] = currRow[0]
    resObj[type_of_link] = currRow[1]
    resObj[is_deleted] = currRow[2]
