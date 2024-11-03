import mariadb
from db_connection.db_connection import ConnectToDb

# from .to_do import ToDo


class ToDoList:

    def __init__(self, db_connection: ConnectToDb, user_id: int):
        self.db_connection = db_connection
        self.conn = self.db_connection.get_db_connection()
        self.to_dos = []
        self.user_id = user_id
        self.response = {"status": "", "message": "", "data": {}, "http-code": 0}

    def get_to_dos(self) -> dict:
        """ "
        Retrieve list of tasks from database by user id
        Saves each as object to a list
        """
        try:
            cursor = self.conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM `to-dos` WHERE user_id=%s", (self.user_id, ))
            data = cursor.fetchall()
            if data is None:
                self.response["status"] = "error"
                self.response["message"] = "No to dos found"
                self.response["data"] = {"to-dos": None}
                self.response["http-code"] = 404

            self.to_dos = data
            # self.to_dos = [
            #     ToDo(to_do["id"], to_do["title"], to_do["status"]) for to_do in data
            # ]

            self.response["status"] = "success"
            self.response["message"] = "To dos list retrieved successfully"
            self.response["data"] = {"to-dos": self.to_dos}
            self.response["http-code"] = 200
        except mariadb.Error as e:
            print(e)
            self.response["status"] = "error"
            self.response["message"] = "No to dos found"
            self.response["data"] = {"to-dos": None}
            self.response["http-code"] = 404
        finally:
            cursor.close()
            return self.response
