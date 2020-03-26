from flask import Flask, Blueprint
from Routes.register import reg
from Routes.login import log


app = Flask(__name__)

app.register_blueprint(reg)
app.register_blueprint(log)


if __name__ == '__main__':
    app.run(debug=True)