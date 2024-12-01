import { FaTrash, FaCircleArrowDown } from "react-icons/fa6";
import { ChangeEvent, SyntheticEvent } from "react";
import { AVAILABLE_STATUSES } from "../../config";

type ToDoProps = {
    title: string;
    status: string;
    onRemove: (event: SyntheticEvent) => void;
    onChangeStatus: (event: ChangeEvent) => void;
};

function ToDoItem({ title, status, onRemove, onChangeStatus }: ToDoProps) {
    return (
        <li className="border border-[#06a19d] rounded-lg px-6 py-7 flex items-center gap-6 shadow-[2px_2px_7px_0_rgba(6,161,157,0.2)]">
            <p className="font-bold flex-grow">{title}</p>
            <div className="relative">
                <select
                    name="status"
                    className="appearance-none rounded-md bg-[#add9d8] ps-5 pe-10 py-2"
                    onChange={onChangeStatus}
                    value={status}
                >
                    {AVAILABLE_STATUSES.map((avStatus) => (
                        <option key={avStatus} value={avStatus}>{avStatus}</option>
                    ))}
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <FaCircleArrowDown />
                </div>
            </div>
            <button onClick={onRemove}>
                <FaTrash />
            </button>
        </li>
    );
}

export default ToDoItem;
