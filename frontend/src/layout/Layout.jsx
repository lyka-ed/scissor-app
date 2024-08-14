import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

export default function Layout() {
  return (
    <section className="h-auto bg-[#F6F6F9] flex">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <NavBar />
        <div className="w-full h-full border p-[20px] bg[#D6D6E1]">
          <Outlet />
        </div>
      </div>
    </section>
  );
}
