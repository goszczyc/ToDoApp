from flask import Flask, jsonify, session
import mariadb
from db_connection.db_connection import ConnectToDb
from .user import User
from util.json_response import JsonResponse
from app import bcrypt


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
        return bcrypt.check_password_hash(user.password, password)

    def login_user(self, email: str, password: str) -> JsonResponse:
        user = self.get_user(email)
        if user == None:
            return JsonResponse(404, "User with provided email does not exist :(")
        if not self.verify_password(user, password):
            return JsonResponse(401, "Wrong password")
        session["user"] = user.user_id
        return JsonResponse(200, "Login successfull", {"user": user.user_id})

    def signup(self, email: str, password: str, password_repeat: str) -> JsonResponse:
        errors = {
        }
        if password == "" or password_repeat == "":
            errors["password"] = "Passwords cannot be empty"

        if password_repeat != password:
            errors["repeatPassword"] = "Passwords do not match"

        if email == "":
            errors["email"] = "Email cannot be empty"

        if len(errors) != 0:
            return JsonResponse(500, "Invalid data", errors)

        try:
            cursor = self.conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM `users` WHERE email=%s", (email,))
            user_data = cursor.fetchone()

            if user_data is not None:
                return JsonResponse(500, "User with that email already exists", {"email": "User with that email already exists"})

            hashed_password = bcrypt.generate_password_hash(password).decode("utf8")

            cursor.execute(
                "INSERT INTO `users` (`email`, `password`) VALUES (%s, %s)",
                (email, hashed_password),
            )
            self.conn.commit()
            if cursor.lastrowid == None:
                return JsonResponse(
                    500, "Unforrtunately the server has failed to sign you up 😭)"
                )

            user_id = cursor.lastrowid
            session["user"] = user_id
            return JsonResponse(200, "Successfully signed up", {"user": user_id})

        except mariadb.Error as e:
            print(e)
            return JsonResponse(500, "Error while signing up")
        finally:
            cursor.close()
