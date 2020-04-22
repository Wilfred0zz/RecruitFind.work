from flask import Flask, Blueprint
from Routes.connection import connect
from Routes.register import reg
from Routes.login import log
from Routes.recruiterProfile import rp

app = Flask(__name__)

app.register_blueprint(connect)
app.register_blueprint(reg)
app.register_blueprint(log)
app.register_blueprint(rp)


if __name__ == '__main__':
    app.run(debug=True)