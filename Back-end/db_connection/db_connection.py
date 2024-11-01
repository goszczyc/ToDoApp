import mariadb

DB_HOST = "localhost"
DB_USER = "root"
DB_PASSWORD = ""
DB_NAME = "to_do_db"


class ConnectToDb:

    def __init__(self):
        self.connection = mariadb.connect(
            host=DB_HOST, user=DB_USER, password=DB_PASSWORD, database=DB_NAME
        )

    def get_db_connection(self):
        return self.connection

    def get_data(self):
        with self.connection.cursor(dictionaty=True) as cursor:
            cursor.execute("SELECT")

    def add_user(self, email, password):
        print("adding user")
        try:
            cursor = self.connection.cursor(dictionary=True)
            print(email, password)
            cursor.execute(
                "INSERT INTO users (email, password) VALUES (%s, %s)", (email, password)
            )
            self.connection.commit()
        except mariadb.Error as e:
            self.connection.rollback()  # Roll back if there’s an error
            print(f"Error adding user: {e}")
        finally:
            cursor.close()
            self.close_connection()

    # INSERT INTO `users` (`id`, `email`, `password`) VALUES ('2', 'szymon@email.pl', 'ahahaha');
