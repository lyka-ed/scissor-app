import { RiHome3Line, RiLogoutCircleRLine } from "react-icons/ri";
import logo from "../assets/logo.png";
import { FiLink } from "react-icons/fi";
import { IoQrCodeOutline, IoSettingsOutline } from "react-icons/io5";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

export default function SideBar() {
  const link = [
    {
      id: 0,
      icon: <RiHome3Line />,
      name: "Dashboard",
      link: "/",
    },
    {
      id: 1,
      icon: <FiLink />,
      name: "Links",
      link: "/links",
    },
    {
      id: 2,
      icon: <IoQrCodeOutline />,
      name: "QR Codes",
      link: "/qr-codes",
    },
    {
      id: 3,
      icon: <FaArrowTrendUp />,
      name: "Analytics",
      link: "/analytics",
    },
    {
      id: 4,
      icon: <IoSettingsOutline />,
      name: "Settings",
      link: "/settings",
    },
    {
      id: 5,
      icon: <RiLogoutCircleRLine />,
      name: "Logout",
      link: "",
    },
  ];
  return (
    <section className="hidden h-auto w-[200px] lg:w-[250px] lg:flex flex-col justify-between p-4 bg-white shadow">
      <div>
        <div className="w-[146px] h-[55px] overflow-hidden">
          <img className="w-full h-full object-cover" src={logo} alt="logo" />
        </div>
        <div className="mt-10 grid gap-7">
          <ul className="">
            {link.slice(0, 4).map((link) => (
              <li key={link.id}>
                <div className="flex items-center gap-2 text-[#3B3C51] font-medium hover:bg-[#EFF6FF] hover:text-[#1B48DA] h-[40px] px-4 cursor-pointer rounded">
                  {link.icon}
                  <p>{link.name}</p>
                </div>
              </li>
            ))}
          </ul>
          <ul className="">
            {link.slice(4, 6).map((link) => (
              <li key={link.id}>
                <div className="flex items-center gap-2 text-[#3B3C51] font-medium hover:bg-[#EFF6FF] hover:text-[#1B48DA] h-[40px] px-4 cursor-pointer rounded">
                  {link.icon}
                  <p>{link.name}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-[#F8F9FA] grid gap-3 p-3 rounded">
        <div className="flex items-center justify-between">
          <p className="text-[#181820] font-medium">2/10 links available</p>
          <button className="outline-none border-none">
            <IoMdClose size={20} color="#D6D6E1" />
          </button>
        </div>
        <p className="text-xs">
          Enjoying Shortener? Consider upgrading your plan so you can go
          limitless.
        </p>
        <button className="flex items-center gap-2 text-[#1B48DA]">
          <p className="text-base font-medium">Upgrade</p>
          <FaLongArrowAltRight />
        </button>
      </div>
    </section>
  );
}
