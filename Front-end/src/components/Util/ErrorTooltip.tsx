import { FaCircleExclamation } from "react-icons/fa6";
import { FC } from "react";

type ErrorTooltipProps = {
    invalidMessage: string | null;
}

const ErrorTooltip: FC<ErrorTooltipProps> = ({ invalidMessage }) => {
    return (
        <div className="absolute -right-5 top-3 group">
            <FaCircleExclamation color="red"/>
            <div className="absolute left-0 w-max max-w-60 -top-2 rounded-md p-3 bg-red-200 border border-red-500 hidden group-hover:block z-50">{ invalidMessage }</div>
        </div>
    )
}

export default ErrorTooltip;