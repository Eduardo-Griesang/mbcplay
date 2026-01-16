import Logo from "../Logo";
import NavBar from "./NavBar";

export default function SideBar() {
    return (
        <nav className="py-10 bg-secondaryBackground flex flex-col col-span-1 items-center h-screen">
            <Logo />
            <NavBar />
        </nav>
    )
};