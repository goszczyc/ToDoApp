from flask import Flask, jsonify, request, session
from db_connection.db_connection import ConnectToDb
from users.users import UserAuthentication
import mariadb
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app)
# app.config["CORS_HEADERS"] = "Content-Type"
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'


@app.route("/")
def get_data():
    pass


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

    return jsonify({"message": "CIPA"})


@app.route("/login", methods=["POST"])
def login():
    db_connection = ConnectToDb()
    user_authentication = UserAuthentication(db_connection)
    email = request.form.get("email")
    password = request.form.get("password")
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
