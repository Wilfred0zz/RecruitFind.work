from flask import Flask, Blueprint
import psycopg2
import os
connect = Blueprint('connection', __name__)

@connect.route("/api/connection")
def connection():
    database = psycopg2.connect(user = "bylinkvsjtfdia", password = "b441303bb98c6533e96fa5c476852dcc067180f3a036d5bde62d61e9c5f19d5f", host= os.getenv('DATABASE_IP', "172.17.0.1") , port = "5432", database = "dauhmnvct04jp4")
    if(not database):
        return f'''Connection to database failed'''
    else:
        cursor = database.cursor()
        cursor.execute("SELECT version();")
        version = cursor.fetchone()[0]
        version = version[0:16]
        cursor.execute("SELECT current_database();")
        dbName = cursor.fetchone()[0]

        return f'''
        You are now connected to database: {dbName}
        with version being {version}
        '''