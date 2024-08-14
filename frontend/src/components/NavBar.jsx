  import { CiSearch } from "react-icons/ci";
import sun from "../assets/sun.png";
import GenerateComponent from "./GenerateComponent";

export default function NavBar() {
  return (
    <div className="bg-white p-3 shadow-sm border-l flex justify-between items-center">
      <div className="hidden md:flex items-start gap-2">
        <div className="w-[16px] h-[16px] overflow-hidden">
          <img className="w-full h-full object-cover" src={sun} alt="weather" />
        </div>
        <div>
          <p className="font-medium text-[#181820] leading-5">
            Good morning, John
          </p>
          <p className="text-xs text-[#878BA9]">Mon, July 22</p>
        </div>
      </div>
      <div className="flex w-full md:w-auto items-center justify-between gap-5">
        <GenerateComponent />
        <div className="hidden lg:block lg:w-[340px] relative">
          <input
            className="w-full h-[40px] py-2 pl-10 pr-4 border border-[#D6D6E1] outline-none rounded"
            type="text"
            placeholder="Search"
          />
          <div className="absolute top-2 left-2">
            <CiSearch color="#B1B3C8" size={24} />
          </div>
        </div>
        <div className="w-[40px] h-[40px] rounded-full bg-[#FDE48A] grid place-items-center">
          <p className="text-[#923E0E] font-medium">JD</p>
        </div>
      </div>
    </div>
  );
}
