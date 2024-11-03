from flask import Blueprint, request, jsonify, session
from db_connection.db_connection import ConnectToDb
from to_do.to_do_list import ToDoList

to_dos_bp = Blueprint("to-dos", __name__)


@to_dos_bp.route("/get")
def get_to_dos():
    db_connection = ConnectToDb()
    to_do_list = ToDoList(db_connection, 1)
    result = to_do_list.get_to_dos()
    return result, result["http-code"]
