from flask import Flask, Blueprint, request, make_response
import psycopg2
import traceback
from flask_login import current_user, login_user, logout_user, login_required
import os

rm = Blueprint('rejectMatch', __name__)

@rm.route("/api/rejectMatch", methods=["PUT"])
@login_required
def rejectMatch():
    try:
        database = psycopg2.connect(user = "bylinkvsjtfdia", password = "b441303bb98c6533e96fa5c476852dcc067180f3a036d5bde62d61e9c5f19d5f", host= os.getenv('DATABASE_IP', "172.17.0.1") , port = "5432", database = "dauhmnvct04jp4")
        if database:
            cursor = database.cursor()
            response = dict()
            data = request.get_json()

            if current_user.is_authenticated():
                matchId = data['match_id']

                if matchId <= 0:
                    error = "Invalid Match Id!"
                    response["error"] = error
                    raise Exception(response)
                
                candidateId = current_user.get_id()

                status = 'REJECTED'

                if candidateId:
                    cursor.execute(f"""UPDATE public."Matches" SET status='{status}', is_viewed={True}, hidden={True} WHERE match_id={matchId}""")
                    database.commit()
                    
                    response['status'] = True
                    response['status_info'] = 'Match Rejected Successfully!'
                
        else:
            error = "Connection To Database Failed!"
            response['error'] = error
            raise Exception(response)

    except Exception:
        print(traceback.format_exc())
        return response, 400
    return response