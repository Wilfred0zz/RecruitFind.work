from flask import Flask, Blueprint, request, make_response
import psycopg2
import traceback
from flask_login import current_user, login_user, logout_user, login_required

acm = Blueprint('acceptMatch', __name__)

@acm.route("/api/acceptMatch", methods=["PUT"])
@login_required
def acceptMatch():
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")
        if database:
            cursor = database.cursor()
            response = dict()
            data = request.get_json()

            if current_user.is_authenticated:
                matchId = data['match_id']

                if matchId <= 0:
                    error = "Invalid Match Id!"
                    response["error"] = error
                    raise Exception(response)
                
                candidateId = current_user.get_id()

                status = 'ACCEPTED'

                if candidateId:
                    cursor.execute(f"""UPDATE public."Matches" SET status='{status}', is_viewed={True} WHERE match_id={matchId}""")
                    database.commit()
                    
                    response['status'] = True
                    response['status_info'] = 'Match Accepted Successfully!'
                
        else:
            error = "Connection To Database Failed!"
            response['error'] = error
            raise Exception(response)

    except Exception:
        print(traceback.format_exc())
        return response, 400
    return response