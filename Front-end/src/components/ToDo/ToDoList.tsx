import { SERVER_ADD } from "../../config";
import { useEffect, useState } from "react";
import NavBar from "../Navigation/NavBar";
import ToDo from "./ToDo";

interface ToDo {
    title: string;
}

function ToDoList() {
    async function getToDoList() {
        const user = sessionStorage.getItem("user");

        // const result = await fetch(SERVER_ADD+"api/to-dos");
    }

    const [toDoList, setToDoList] = useState<Array<ToDo>>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(SERVER_ADD + "api/to-dos/get");
            const json = await response.json();

            if (!response.ok) {
                console.error(json.message);
            }

            setToDoList(json.data["to-dos"]);
        };

        fetchData().catch((e) => {
            console.error(e);
        });

        return () => {};
    }, []);

    function removeToDo(index: number) {
        // TODO: Add request to server to remove todo from db if it was removed successfully then remove from todo list
        setToDoList(toDoList.filter((_, i) => i !== index));
    }

    return (
        <div className="container">
            <NavBar />
            <ul className="flex flex-col py-6 items-center">
                {toDoList.map((toDo, index) => (
                    <ToDo key={index} title={toDo.title} onRemove={() => removeToDo(index)} status="to-do" />
                ))}
            </ul>
        </div>
    );
}

export default ToDoList;
