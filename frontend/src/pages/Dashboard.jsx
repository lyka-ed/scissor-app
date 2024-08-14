import { BsThreeDotsVertical } from "react-icons/bs";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import LinkComponent from "../components/LinkComponent";
import QrComponent from "../components/QrComponent";
import Table from "../components/Table";

export default function Dashboard() {
  return (
    <section className="grid gap-[20px]">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-[20px]">
        <div className="bg-white rounded-xl overflow-hidden shadow">
          <div className="flex items-center justify-between p-6">
            <h2 className="text-lg font-semibold text-[#181820]">
              Latest links
            </h2>
            <div className="border border-[#ECECF2] rounded-md w-fit p-2 cursor-pointer shadow-sm">
              <BsThreeDotsVertical />
            </div>
          </div>
          <div>
            {Array.from({ length: 4 }, (_, i) => (
              <LinkComponent key={i} />
            ))}
            <button className="flex items-center gap-2 justify-center w-full py-3 text-[#686C8F] hover:bg-[#EFF6FF]">
              <p className="font-medium">See all links</p>
              <HiOutlineArrowNarrowRight size={20} />
            </button>
          </div>
        </div>
        <div className="bg-white rounded-xl overflow-hidden shadow">
          <div className="flex items-center justify-between p-6">
            <h2 className="text-lg font-semibold text-[#181820]">QR Codes</h2>
            <div className="border border-[#ECECF2] rounded-md w-fit p-2 cursor-pointer shadow-sm">
              <BsThreeDotsVertical />
            </div>
          </div>
          <div>
            {Array.from({ length: 4 }, (_, i) => (
              <QrComponent key={i} />
            ))}
            <button className="flex items-center gap-2 justify-center w-full py-3 text-[#686C8F] hover:bg-[#EFF6FF]">
              <p className="font-medium">See all QR Codes</p>
              <HiOutlineArrowNarrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
      <section className="bg-white rounded-xl overflow-hidden shadow">
        <div className="flex items-center justify-between p-6">
          <h2 className="text-lg font-semibold text-[#181820]">Latest links</h2>
          <button className="flex items-center gap-2 justify-center w-fit px-4 rounded-lg py-3 text-[#686C8F] hover:bg-[#EFF6FF]">
            <p className="font-medium">See all history</p>
            <HiOutlineArrowNarrowRight size={20} />
          </button>
        </div>
        <Table />
      </section>
    </section>
  );
}
