import { FormEvent, ChangeEvent, useEffect, useState } from "react";
import apiRequest from "../../misc/apiRequest";
import NavBar from "../Navigation/NavBar";
import ToDoItem from "./ToDoItem";
import AddToDoButton from "./AddToDoButton";
import ToDoAddForm from "./ToDoAddForm";

interface ToDo {
    title: string;
    id: number;
    status: string;
    previousOption: string | null;
}

function ToDoList() {
    const [toDoList, setToDoList] = useState<Array<ToDo>>([]);
    const [isModalShown, setIsModalShown] = useState<boolean>(false);

    // Get to-dos
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

    /**
     * Succesfull request removes to-do with given id from database
     */
    async function handleRemoveToDo(id: number) {
        const data = new FormData();
        data.append("id", id.toString());
        const response = await apiRequest("api/to-dos/delete", {
            method: "POST",
            body: data,
        });

        if (!response.ok) return alert("Error removing to do");

        setToDoList((prev) => prev.filter((toDO) => toDO.id !== id));
    }

    /**
     * Succesfull request adds new to-do in data base and refreshes to-dos list
     */
    async function handleAddToDo(formEvent: FormEvent) {
        formEvent.preventDefault();
        const form = formEvent.currentTarget as HTMLFormElement;
        const data = new FormData(form);

        const response = await apiRequest("api/to-dos/add", {
            method: "POST",
            body: data,
        });

        if (!response.ok) return alert("Something is no yes :(");

        const res = await response.json();

        setToDoList((prev) => [res.data, ...prev]);
        handleModalToggle();
    }

    function handleModalToggle() {
        setIsModalShown((prev) => !prev);
    }

    async function handleStatusChange(
        event: ChangeEvent,
        id: number
    ): Promise<void> {
        const itemIndex = toDoList.findIndex((todo) => todo.id === id);
        const previousStatus = toDoList[itemIndex].status;
        const select = event.currentTarget as HTMLSelectElement;

        
        setToDoList((prev) =>
            prev.map((todo) =>
                todo.id === id
                    ? {
                          ...todo,
                          status: select.value,
                          previousStatus: previousStatus,
                      }
                    : todo
            )
        );

        const formData = new FormData();
        formData.append("status", select.value);
        formData.append("id", id.toString());
        const response = await apiRequest("api/to-dos/change_status", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            setToDoList((prev) =>
                prev.map((todo) =>
                    todo.id === id
                        ? {
                              ...todo,
                              status: previousStatus,
                          }
                        : todo
                )
            );
            alert("Error changing status");
            return;
        }
    }

    return (
        <div className="container">
            <NavBar />
            <div className="grid place-items-center py-3 relative">
                <AddToDoButton onClick={handleModalToggle} />
                {isModalShown && (
                    <ToDoAddForm
                        addToDoHandle={handleAddToDo}
                        closeModal={handleModalToggle}
                    />
                )}
            </div>
            <ul className="container flex flex-col py-6 max-w-[480px] gap-6">
                {toDoList.map((toDo) => (
                    <ToDoItem
                        key={toDo.id}
                        title={toDo.title}
                        onRemove={() => handleRemoveToDo(toDo.id)}
                        onChangeStatus={(e) => handleStatusChange(e, toDo.id)}
                        status={toDo.status}
                    />
                ))}
            </ul>
        </div>
    );
}

export default ToDoList;
