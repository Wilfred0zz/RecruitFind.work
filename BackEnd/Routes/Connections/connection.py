from flask import Flask, Blueprint
import psycopg2

database = psycopg2.connect(user = "postgres", password = "htrvvC56nb02kqtA", host= "34.66.114.193", port = "5432", database = "recruitfindwork")

#creates a cursor object to execute PostgreSQL commands via python
cursor = database.cursor()

connect = Blueprint('connection', __name__)

@connect.route("/api/connection")
def connection():
    #checks whether connection to database was successful or not
    if(not database):
        return f'''Connection to database failed'''
    else:
        #extracts the current PostgreSQL version and database name
        cursor.execute("SELECT version();")
        version = cursor.fetchone()[0]
        version = version[0:16]
        cursor.execute("SELECT current_database();")
        dbName = cursor.fetchone()[0]

        return f'''
        You are now connected to database: {dbName}
        with version being {version}
        '''