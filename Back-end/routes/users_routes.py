from flask import Blueprint, request, jsonify, session
from users.users import UserAuthentication
from db_connection.db_connection import ConnectToDb

users_bp = Blueprint("users", __name__)


@users_bp.route("/add_user")
def add_user():
    print("DUPA")
    new_connection = ConnectToDb()
    new_connection.add_user("email@test.pl", "hardPass")
    return jsonify({"message": "User added successfully"}), 201


@users_bp.route("/get_user")
def get_user():
    db_connection = ConnectToDb()
    get = UserAuthentication(db_connection)
    user = get.get_user("szymon@email.pl")

    return jsonify({"message": "CIPA"})


@users_bp.route("/login", methods=["POST"])
def login():
    db_connection = ConnectToDb()
    user_authentication = UserAuthentication(db_connection)
    email = request.form.get("email")
    password = request.form.get("password")
    result = user_authentication.login_user(email, password)
    return result, result["http-code"]


@users_bp.route("/check_session")
def check_session():
    user_id = session["user"]
    return {"user": user_id}, 200


@users_bp.route("/logout")
def logout():
    if session["user"]:
        session["user"] = None
    return {"user": None}, 200
