from flask import Flask, Blueprint
from Routes.connection import connect
from Routes.register import reg
from Routes.login import log
from Routes.recruiterProfile import rp
from Routes.fetchRecruiterProfile import frp
from Routes.updateRecruiterProfileInfo import urp
from Routes.candidateProfile import cp
from Routes.candidateExperiences import ce
from Routes.updateCandidateProfileInfo import ucp
from Routes.updateCandidateExperiences import uce
from Routes.candidateLinks import cl
from Routes.updateCandidateLinks import ucl
from Routes.fetchCandidateExperiences import fce

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


if __name__ == '__main__':
    app.run(debug=True)