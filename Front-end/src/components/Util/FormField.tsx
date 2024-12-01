import { ChangeEvent } from "react";
import ErrorTooltip from "./ErrorTooltip";

type FormFieldProps = {
    itemID: string;
    type: string;
    name: string;
    required: boolean;
    placeholder: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    validCondition: boolean;
    invalidMessage: string | null;
};

function FormField({
    itemID,
    type,
    name,
    required,
    placeholder,
    value,
    onChange,
    validCondition: validCondition = true,
    invalidMessage = "",
}: FormFieldProps) {
    return (
        <div className="relative flex flex-col items-center pb-6">
            <input
                itemID={itemID}
                type={type}
                name={name}
                required={required}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={"py-2 px-4 text-lg min-w-30 max-w-52 bg-lblue border border-lblue border-solid rounded-md text-center " + (validCondition ? "border-red-500" : "" )}
            />
            {validCondition && (
                <ErrorTooltip invalidMessage={invalidMessage} />
            )}
        </div>
    );
}

export default FormField;
