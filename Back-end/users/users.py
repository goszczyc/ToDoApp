from flask import Flask, jsonify, session
import mariadb
from db_connection.db_connection import ConnectToDb
from .user import User
from util.json_response import JsonResponse


class UserAuthentication:

    def __init__(self, db_connection: ConnectToDb):
        self.db_connection = db_connection
        self.conn = self.db_connection.get_db_connection()

    def get_user(self, email: str) -> User | None:
        """
        Retrieves user from database by email
        If email isn't in database method returns None
        """
        try:
            cursor = self.conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM `users` WHERE email=%s", (email,))
            user_data = cursor.fetchone()
            if user_data is None:
                return None
            return User(user_data["id"], user_data["email"], user_data["password"])
        except mariadb.Error as e:
            print(e)
            return None
        finally:
            cursor.close()

    def verify_password(self, user: User, password: str) -> bool:
        return password == user.password

    def login_user(self, email: str, password: str) -> JsonResponse:

        user = self.get_user(email)
        if user == None:
            return JsonResponse(404, "User with provided email does not exist :(")
        if not self.verify_password(user, password):
            return JsonResponse(401, "Wrong password")

        print(user.email, user.password)
        session["user"] = user.user_id
        return JsonResponse(200, "Login successfull", {"user": user.user_id})
