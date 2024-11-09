import mariadb
from db_connection.db_connection import ConnectToDb
from util.json_response import JsonResponse


class ToDoList:

    def __init__(self, db_connection: ConnectToDb, user_id: int):
        self.db_connection = db_connection
        self.conn = self.db_connection.get_db_connection()
        self.to_dos = []
        self.user_id = user_id

    def get_to_dos(self) -> JsonResponse:
        """ "
        Retrieve list of tasks from database by user id
        Saves each as object to a list
        """

        try:
            cursor = self.conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM `to-dos` WHERE user_id=%s ORDER BY id DESC", (self.user_id,))
            data = cursor.fetchall()
            if data is None:
                self.to_dos = None
                return JsonResponse(404, "No to-dos found", {"to-dos": None})
            return JsonResponse(
                200, "To-dos list retrived succesefully", {"to-dos": data}
            )
        except mariadb.Error as e:
            print(e)
            return JsonResponse(404, "No to-dos found :(", {"to-dos": None})
        finally:
            cursor.close()

    def add_to_do(self, title: str, status: str) -> JsonResponse:
        """
        Adds new to-do to database with privided title and status
        """
        try:
            cursor = self.conn.cursor()
            cursor.execute(
                "INSERT INTO `to-dos` (user_id, title, status) VALUES (%s, %s, %s)", (self.user_id, title, status)
            )
            self.conn.commit()
            id = cursor.lastrowid
            return JsonResponse(
                200,
                "To-do added successfully",
                {"id": id, "title": title, "status": status},
            )
        except mariadb.Error as e:
            print(e)
            return JsonResponse(500, "Error adding todo")
        finally:
            cursor.close()

    def delete_to_do(self, id: int) -> JsonResponse:
        """
        Removes to-do with provided ID from database
        """

        try:
            cursor = self.conn.cursor()
            cursor.execute("DELETE FROM `to-dos` WHERE id=%s", (id,))
            self.conn.commit()
            # Check if anything got deleted
            if cursor.rowcount == 0:
                raise mariadb.Error("No rows affected")

            return JsonResponse(200, "Item removed successfully")
        except mariadb.Error as e:
            print(e)
            return JsonResponse(500, "Error removing item")
        finally:
            cursor.close()
