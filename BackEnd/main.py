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

#Connection Blueprint
app.register_blueprint(connect)

##Authentication BluePrints
app.register_blueprint(reg)
app.register_blueprint(log)

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