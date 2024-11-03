from flask import Blueprint, request, jsonify, session
from db_connection.db_connection import ConnectToDb
from to_do.to_do_list import ToDoList

to_dos_bp = Blueprint("to-dos", __name__)


@to_dos_bp.route("/get")
def get_to_dos():
    db_connection = ConnectToDb()
    to_do_list = ToDoList(db_connection, session["user"])
    result = to_do_list.get_to_dos()
    return result, result["http-code"]


@to_dos_bp.route("/delete", methods=["POST"])
def remove_to_do():
    db_connection = ConnectToDb()
    item_id = request.form.get("id")
    print(request.form)
    print(f"ID: {item_id}")
    to_do_list = ToDoList(db_connection, session["user"])
    result = to_do_list.delete_to_do(item_id)
    return result
