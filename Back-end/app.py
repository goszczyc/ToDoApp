from flask import Flask, jsonify, request, session
from db_connection.db_connection import ConnectToDb
from users.users import UserAuthentication
import mariadb

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

# Configuration for MariaDB connection
app.config["DB_HOST"] = "localhost"
app.config["DB_USER"] = "root"
app.config["DB_PASSWORD"] = ""
app.config["DB_NAME"] = "to_do_db"


def get_db_connection():
    connection = mariadb.connect(
        host=app.config["DB_HOST"],
        user=app.config["DB_USER"],
        password=app.config["DB_PASSWORD"],
        database=app.config["DB_NAME"],
    )
    return connection


@app.route("/")
def get_data():
    # conn = get_db_connection()

    with get_db_connection() as conn:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM `to-dos`")
        rows = cursor.fetchall()
        return jsonify(rows)
    # cursor.close()
    # conn.close()


@app.route("/add_user")
def add_user():
    print("DUPA")
    new_connection = ConnectToDb()
    new_connection.add_user("email@test.pl", "hardPass")
    return jsonify({"message": "User added successfully"}), 201


@app.route("/get_user")
def get_user():
    db_connection = ConnectToDb()
    get = UserAuthentication(db_connection)
    user = get.get_user("szymon@email.pl")
    
    return jsonify({"message":"CIPA"})

@app.route("/login")
def login():
    db_connection = ConnectToDb()
    user_authentication = UserAuthentication(db_connection)
    email = request.args.get("email")
    password = request.args.get("password")
    result = user_authentication.login_user(email, password)
    return result, result["http-code"]

@app.route("/check_session")
def check_session():
    user_id = session["user"]
    return {"user": user_id}, 200

@app.route("/logout")
def logout():
    if session["user"]:
        session["user"] = None
    return {"user": None}, 200

if __name__ == "__main__":
    app.run(debug=True)
