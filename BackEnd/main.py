from flask import Flask, Blueprint
from flask_login import LoginManager
import psycopg2
from flask_login import current_user, login_user, logout_user, login_required

#Connection Route
from Routes.Connections.connection import connect

#Authentication Routes
from Routes.Authentication.register import reg
from Routes.Authentication.login import log, User
from Routes.Authentication.logout import logout

#Recruiter Routes
from Routes.Recruiter.recruiterProfile import rp
from Routes.Recruiter.fetchRecruiterProfile import frp
from Routes.Recruiter.updateRecruiterProfileInfo import urp
from Routes.Recruiter.deleteRecruiterProfileInfo import drp

#Candidate Routes

#Candidate Profile Routes
from Routes.Candidate.candidateProfile import cp
from Routes.Candidate.updateCandidateProfileInfo import ucp
from Routes.Candidate.fetchCandidateProfileInfo import fcp
from Routes.Candidate.deleteCandidateProfile import dcp
from Routes.Candidate.deleteCandidateInterests import dci

#Candidate Link Routes
from Routes.Candidate.Links.candidateLinks import cl
from Routes.Candidate.Links.updateCandidateLinks import ucl
from Routes.Candidate.Links.fetchCandidateLinks import fcl
from Routes.Candidate.Links.deleteCandidateLinks import dcl

#Candidate Experience Routes
from Routes.Candidate.Experiences.candidateExperiences import ce
from Routes.Candidate.Experiences.updateCandidateExperiences import uce
from Routes.Candidate.Experiences.fetchCandidateExperiences import fce
from Routes.Candidate.Experiences.deleteCandidateExperiences import dce

#Candidate Skill Routes
from Routes.Candidate.Skills.candidateSkills import cs
from Routes.Candidate.Skills.deleteCandidateSkill import dcs
from Routes.Candidate.Skills.fetchCandidateSkills import fcs

#Query Routes
from Routes.Queries.query import qry
from Routes.Queries.computeQuery import cptQry
from Routes.Queries.fetchQueries import fqrys
from Routes.Queries.deleteQuery import dQry

#Match Routes
from Routes.Matches.match import mat
from Routes.Matches.fetchCandidateMatches import fcm

app = Flask(__name__)
app.secret_key = b'Y\xf7\xec\xe3m\x99r\x19A\x9d*l[\xdd\xa1\xf9\xe7P\x8a\x88\xd7\x067<'
login_manager = LoginManager(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(id):
    try:
        database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")
        if database:
            response = dict()
            cursor = database.cursor()
            cursor.execute(f"""SELECT email from public."Personal Information" WHERE user_id={id}""")
            result = cursor.fetchone()
            if result == None:
                return None
            else:
                return User(result[0])
        else:
            error = "Connection To Database Failed!"
            response['error'] = error
            raise Exception(response)
    except Exception:
        return response, 400


#Connection Blueprint
app.register_blueprint(connect)

##Authentication BluePrints
app.register_blueprint(reg)
app.register_blueprint(log)
app.register_blueprint(logout)

#Recruiter Blueprints
app.register_blueprint(rp)
app.register_blueprint(frp)
app.register_blueprint(urp)
app.register_blueprint(drp)

#Candidate Blueprints

#Candidate Profile Blueprints
app.register_blueprint(cp)
app.register_blueprint(ucp)
app.register_blueprint(fcp)
app.register_blueprint(dci)
app.register_blueprint(dcp)

#Candidate Link Blueprints
app.register_blueprint(cl)
app.register_blueprint(ucl)
app.register_blueprint(fcl)
app.register_blueprint(dcl)

#Candidate Experience Blueprints
app.register_blueprint(ce)
app.register_blueprint(uce)
app.register_blueprint(fce)
app.register_blueprint(dce)

#Candidate Skill Blueprints
app.register_blueprint(cs)
app.register_blueprint(dcs)
app.register_blueprint(fcs)

#Query Blueprints
app.register_blueprint(qry)
app.register_blueprint(cptQry)
app.register_blueprint(fqrys)
app.register_blueprint(dQry)

#Match Blueprints
app.register_blueprint(mat)
app.register_blueprint(fcm)


if __name__ == '__main__':
    app.run(debug=True)