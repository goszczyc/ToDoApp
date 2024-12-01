import { ImCancelCircle } from "react-icons/im";
import AddToDoFormGroup from "./AddToDoFormGroup";
import AddToDoLabel from "./AddToDoLabel";

const PRIORITY_LEVELS = [1, 2, 3, 4];

type ToDoAddFormProps = {
    addToDoHandle: (event: React.SyntheticEvent) => void;
    closeModal: (event: React.SyntheticEvent) => void;
};

const inputStyles =
    "appearance-none border border-mblue rounded-lg text-center font-bold text-mblue  bg-dblue outline-none shadow-md py-4 focus-within:shadow-mblue transition-shadow duration-75";

function ToDoAddForm({ addToDoHandle, closeModal }: ToDoAddFormProps) {
    return (
        <form
            onSubmit={addToDoHandle}
            action=""
            className="shadow-md absolute top-10 left-1/2 -translate-x-1/2 rounded-xl px-8 py-20 bg-dblue bg-opacity-[0.75] backdrop-blur-sm flex flex-col gap-5 z-[9000]"
        >
            <button
                type="button"
                onClick={closeModal}
                className="absolute top-4 right-4 active:scale-95 transition-transform duration-75"
            >
                <ImCancelCircle size="34px" color="mblue" />
            </button>
            <AddToDoFormGroup>
                <AddToDoLabel htmlFor="title">Title</AddToDoLabel>
                <input
                    className="border border-mblue rounded-lg font-bold text-mblue px-12 py-4 bg-dblue text-center outline-none shadow-md shadow-transparent focus-within:shadow-mblue transition-shadow duration-75"
                    type="text"
                    name="title"
                    id="title"
                />
            </AddToDoFormGroup>
            <AddToDoFormGroup>
                <AddToDoLabel htmlFor="status">Status</AddToDoLabel>
                <select
                    id="status"
                    name="status"
                    className={inputStyles}
                    defaultValue="to-do"
                >
                    <option value="To do">To do</option>
                    <option value="Done">Done</option>
                </select>
            </AddToDoFormGroup>
            <AddToDoFormGroup>
                <AddToDoLabel htmlFor="priority">Priority</AddToDoLabel>
                <select name="priority" id="priority" className={inputStyles}>
                    {PRIORITY_LEVELS.map((priority) => (
                        <option value={priority}>{priority}</option>
                    ))}
                </select>
            </AddToDoFormGroup>
            <AddToDoFormGroup>
                <AddToDoLabel htmlFor="due-date">Due date</AddToDoLabel>
                <input
                    type="date"
                    name="due-date"
                    id="due-date"
                    className={inputStyles}
                />
            </AddToDoFormGroup>

            <button
                type="submit"
                className="block px-6 py-2 text-white rounded-xl bg-mblue active:scale-95 transition-transform duration-[30]"
            >
                Save
            </button>
        </form>
    );
}

export default ToDoAddForm;
