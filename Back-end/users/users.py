from flask import Flask, jsonify, session
from db_connection.db_connection import ConnectToDb
import mariadb


class User:
    def __init__(self, user_id: int = 0, email: str = "", password: str = ""):
        self.user_id = user_id
        self.email = email
        self.password = password


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

    def login_user(self, email: str, password: str) -> dict:
        print(email, password)
        user = self.get_user(email)
        if user == None:
            return {
                "status": "error",
                "message": "User with privided email does not exist :(",
                "http-code": 404,
            }
        if not self.verify_password(user, password):
            return {
                "status": "error",
                "message": "Wrong password.",
                "http-code": 401,
            }
            
        session['user'] = user.user_id
        return {"status": "success", "message": "Login succesfull", "http-code": 200}
