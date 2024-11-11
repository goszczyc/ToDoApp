from flask import Blueprint, request, jsonify, session
from db_connection.db_connection import ConnectToDb
from to_do.to_do_list import ToDoList

to_dos_bp = Blueprint("to-dos", __name__)


@to_dos_bp.route("/get")
def get_to_dos():
    db_connection = ConnectToDb()
    to_do_list = ToDoList(db_connection, session["user"])
    result = to_do_list.get_to_dos()
    return result.get_response()


@to_dos_bp.route("/delete", methods=["POST"])
def remove_to_do():
    db_connection = ConnectToDb()
    item_id = request.form.get("id")
    print(request.form)
    print(f"ID: {item_id}")
    to_do_list = ToDoList(db_connection, session["user"])
    result = to_do_list.delete_to_do(item_id)
    return result.get_response()


@to_dos_bp.route("/add", methods=["POST"])
def add_to_do():
    db_connection = ConnectToDb()
    todo_title = request.form.get("title")
    todo_status = request.form.get("status")
    to_do_list = ToDoList(db_connection, session["user"])
    result = to_do_list.add_to_do(todo_title, todo_status)
    return result.get_response()

@to_dos_bp.route("/change_status", methods=["POST"])
def change_status():
    db_connection = ConnectToDb()
    todo_id = request.form.get("id")
    todo_status = request.form.get("status")
    to_do_list = ToDoList(db_connection, session["user"])
    result = to_do_list.change_status(todo_id, todo_status)
    return result.get_response()