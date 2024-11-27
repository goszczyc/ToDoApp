import { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../misc/apiRequest";
function UserMenu() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuButtonRef = useRef<HTMLButtonElement | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

    function toggleMenu() {
        setIsMenuOpen((prev) => !prev);
    }

    function handleClickOutside(event: MouseEvent) {
        if (
            menuRef.current &&
            menuButtonRef.current &&
            !menuRef.current.contains(event.target as Node) &&
            !menuButtonRef.current.contains(event.target as Node)
        ) {
            setIsMenuOpen(false);
        }
    }

    async function handleLogout() {
        try {
            const response = await apiRequest("api/users/logout");
            sessionStorage.removeItem("user");
            navigate("/login");
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative ml-auto w-16">
            <button ref={menuButtonRef} onClick={toggleMenu}>
                <FaUserCircle color="white" size={68} />
            </button>
            {isMenuOpen && (
                <div
                    ref={menuRef}
                    className="absolute top-full right-0 bg-dblue p1 flex flex-col items-center min-w-56 z-10"
                >
                    <button
                        className="block px-3 py-2 w-full font-bold text-white text-lg cursor-pointer"
                        onClick={handleLogout}
                    >
                        Log out
                    </button>
                </div>
            )}
        </div>
    );
}

export default UserMenu;
