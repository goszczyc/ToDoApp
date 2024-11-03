import { SERVER_ADD } from "../../config";
import { useEffect, useState } from "react";

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

            setToDoList(json.data['to-dos']);
        };

        fetchData().catch((e) => {
            console.error(e);
        });

        return () => {};
    }, []);

    return (
        <div className="container">
            <ul className="flex flex-col">
                {toDoList.map((toDo, index) => (
                    <li key={index}>{toDo.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default ToDoList;
