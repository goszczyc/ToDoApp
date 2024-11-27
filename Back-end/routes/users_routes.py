from flask import Blueprint, request, jsonify, session
from users.users import UserAuthentication
from db_connection.db_connection import ConnectToDb
from util.login_required import login_required

users_bp = Blueprint("users", __name__)


@users_bp.route("/login", methods=["POST"])
def login():
    db_connection = ConnectToDb()
    user_authentication = UserAuthentication(db_connection)
    email = request.form.get("email")
    password = request.form.get("password")
    result = user_authentication.login_user(email, password)
    return result.get_response()


@users_bp.route("/check_session")
def check_session():
    user_id = session["user"]
    return {"user": user_id}, 200


@users_bp.route("/logout")
@login_required
def logout():
    if session["user"]:
        session["user"] = None
    return {"user": None}, 200


@users_bp.route("/signup", methods=["POST"])
def signup():
    db_connection = ConnectToDb()
    email = request.form.get("email")
    password = request.form.get("password")
    repeat_password = request.form.get("repeatPassword")
    user_auth = UserAuthentication(db_connection)
    result = user_auth.signup(email, password, repeat_password)
    return result.get_response()
