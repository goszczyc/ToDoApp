import { ReactNode } from "react";

function AddToDoLabel({
    htmlFor,
    children,
}: {
    htmlFor: string;
    children: ReactNode;
}) {
    return (
        <label htmlFor={htmlFor} className="text-center text-lg mb-1">
            {children}
        </label>
    );
}

export default AddToDoLabel;
