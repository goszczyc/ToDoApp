import { Link } from "react-router-dom";

interface MenuItemProps {
    path: string;
    title: string;
    isActive?: boolean;
}

function MenuItem({ path, title, isActive = false }: MenuItemProps) {
    return (
        <Link
            className={
                "text-white text-lg font-bold px-10 py-3 border rounded-xl " +
                (isActive ? " border-white" : "border-transparent")
            }
            to={path}
        >
            {title}
        </Link>
    );
}

export default MenuItem;
