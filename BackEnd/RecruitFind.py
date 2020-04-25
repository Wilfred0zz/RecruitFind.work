from flask import Flask, Blueprint
from Routes.connection import connect
from Routes.Create.register import reg
from Routes.Read.login import log
from Routes.Create.recruiterProfile import rp
from Routes.Read.fetchRecruiterProfile import frp
from Routes.Update.updateRecruiterProfileInfo import urp
from Routes.Create.candidateProfile import cp
from Routes.Create.candidateExperiences import ce
from Routes.Update.updateCandidateProfileInfo import ucp
from Routes.Update.updateCandidateExperiences import uce
from Routes.Create.candidateLinks import cl
from Routes.Update.updateCandidateLinks import ucl
from Routes.Read.fetchCandidateExperiences import fce
from Routes.Read.fetchCandidateLinks import fcl
from Routes.Read.fetchCandidateProfileInfo import fcp

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


if __name__ == '__main__':
    app.run(debug=True)