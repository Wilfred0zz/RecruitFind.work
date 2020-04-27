from flask import Flask, Blueprint
#Connection Route
from Routes.Connections.connection import connect

#Authentication Routes
from Routes.Authentication.register import reg
from Routes.Authentication.login import log

#Recruiter Routes
from Routes.Recruiter.recruiterProfile import rp
from Routes.Recruiter.fetchRecruiterProfile import frp
from Routes.Recruiter.updateRecruiterProfileInfo import urp

#Candidate Routes
from Routes.Candidate.candidateProfile import cp
from Routes.Candidate.candidateExperiences import ce
from Routes.Candidate.updateCandidateProfileInfo import ucp
from Routes.Candidate.updateCandidateExperiences import uce
from Routes.Candidate.candidateLinks import cl
from Routes.Candidate.updateCandidateLinks import ucl
from Routes.Candidate.fetchCandidateExperiences import fce
from Routes.Candidate.fetchCandidateLinks import fcl
from Routes.Candidate.fetchCandidateProfileInfo import fcp
from Routes.Candidate.candidateSkills import cs

app = Flask(__name__)

app.register_blueprint(connect)
app.register_blueprint(reg)
app.register_blueprint(log)
app.register_blueprint(rp)
app.register_blueprint(frp)
app.register_blueprint(urp)
app.register_blueprint(cp)
app.register_blueprint(ce)
app.register_blueprint(ucp)
app.register_blueprint(uce)
app.register_blueprint(cl)
app.register_blueprint(ucl)
app.register_blueprint(fce)
app.register_blueprint(fcl)
app.register_blueprint(fcp)
app.register_blueprint(cs)


if __name__ == '__main__':
    app.run(debug=True)