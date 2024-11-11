import MenuItem from "./MenuItem";
import UserMenu from "./UserMenu";

function NavBar() {
    return (
        <div className="container bg-mblue rounded-3xl flex items-center gap-16 max-w-[980px] p-5 mt-8 ">
            <MenuItem path={"/"} title={"Home"} isActive/>
            <MenuItem path={"/settings"} title={"Settings"} />
            <MenuItem path={"/archive"} title={"Archive"} />

            <UserMenu />
        </div>
    );
}

export default NavBar;
