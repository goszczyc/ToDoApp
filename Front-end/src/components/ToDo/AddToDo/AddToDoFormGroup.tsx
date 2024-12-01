import { ReactNode } from "react";

function AddToDoFormGroup({ children }: { children: ReactNode }) {
    return <div className="flex flex-col">{children}</div>;
}

export default AddToDoFormGroup