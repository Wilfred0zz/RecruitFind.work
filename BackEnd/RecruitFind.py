from flask import Flask, Blueprint
from Routes.connection import connect
from Routes.register import reg
from Routes.login import log
from Routes.recruiterProfile import rp
from Routes.fetchRecruiterProfile import frp
from Routes.updateRecruiterProfileInfo import urp


app = Flask(__name__)

app.register_blueprint(connect)
app.register_blueprint(reg)
app.register_blueprint(log)
app.register_blueprint(rp)
app.register_blueprint(frp)
app.register_blueprint(urp)


if __name__ == '__main__':
    app.run(debug=True)