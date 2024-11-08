import { ImCancelCircle } from "react-icons/im";

type ToDoAddFormProps = {
    addToDoHandle: (event: React.SyntheticEvent) => void;
    closeModal: (event: React.SyntheticEvent) => void;
};

function ToDoAddForm({ addToDoHandle, closeModal }: ToDoAddFormProps) {
    return (
        <form
            onSubmit={addToDoHandle}
            action=""
            className="shadow-md absolute top-10 left-1/2 -translate-x-1/2 rounded-xl px-8 py-20 bg-dblue bg-opacity-[0.75] backdrop-blur-sm flex flex-col gap-12"
        >
            <button
                type="button"
                onClick={closeModal}
                className="absolute top-4 right-4 active:scale-95 transition-transform duration-75"
            >
                <ImCancelCircle size="34px" color="mblue" />
            </button>
            <input
                className="border border-mblue rounded-lg font-bold text-mblue px-12 py-4 bg-dblue text-center outline-none shadow-md shadow-transparent focus-within:shadow-mblue transition-shadow duration-[30]"
                type="text"
                name="title"
                id="title"
            />
            <select
                name="status"
                className="appearance-none border border-mblue rounded-lg text-center font-bold text-mblue  bg-dblue outline-none shadow-md px-5 py-2 focus-within:shadow-mblue transition-shadow duration-[30]"
                defaultValue="to-do"
            >
                <option value="to-do">To do</option>
                <option value="done">Done</option>
            </select>
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
