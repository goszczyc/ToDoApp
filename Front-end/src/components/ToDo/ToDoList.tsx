import { useEffect, useState } from "react";
import apiRequest from "../../misc/apiRequest";
import NavBar from "../Navigation/NavBar";
import ToDo from "./ToDo";

interface ToDo {
    title: string;
    id: number;
}

function ToDoList() {
    const [toDoList, setToDoList] = useState<Array<ToDo>>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await apiRequest("api/to-dos/get");
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

    async function removeToDo(index: number, id: number) {
        // TODO: Add request to server to remove todo from db if it was removed successfully then remove from todo list
        console.log("ID:" + id)
        const data = new FormData();
        data.append("id", id.toString());
        const response = await apiRequest("api/to-dos/delete", {
            method: "POST",
            body: data,
        });

        if (!response.ok) return alert("Error removing to do");

        setToDoList(toDoList.filter((_, i) => i !== index));
    }

    return (
        <div className="container">
            <NavBar />
            <ul className="container flex flex-col py-6 max-w-[480px] gap-6">
                {toDoList.map((toDo, index) => (
                    <ToDo
                        key={index}
                        title={toDo.title}
                        onRemove={() => removeToDo(index, toDo.id)}
                        status="to-do"
                    />
                ))}
            </ul>
        </div>
    );
}

export default ToDoList;
