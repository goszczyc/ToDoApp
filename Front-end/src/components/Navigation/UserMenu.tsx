import { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
function UserMenu() {
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
                    className="absolute top-full right-0 bg-dblue p-3 flex flex-col items-center min-w-56"
                >   
                    <button className="block px-3 py-1 font-bold text-white text-lg">
                        Log out
                    </button>
                </div>
            )}
        </div>
    );
}

export default UserMenu;
