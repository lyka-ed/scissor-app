import { BsQrCode } from "react-icons/bs";
import { FaCopy } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";

export default function TableRow() {
  return (
    <div className="text-sm grid lg:grid-cols-table md:grid-cols-3 grid-cols-1 gap-3 md:gap-0 px-6 py-4 items-center border-y border-[#ECECF2] ">
      <div className="flex items-center gap-2 text-[#343446]">
        <p>https://linkly.com/Bn4Cs</p>
        <div className="p-2 bg-[#ECECF2] rounded-full">
          <FaCopy size={15} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div>
          <TbWorld size={20} />
        </div>
        <p>https://linkly.com/Bn4Cs</p>
      </div>
      <div>
        <BsQrCode size={30} />
      </div>
      <p className="text-sm text-[#343446] md:hidden lg:block">123</p>
      <p className="text-sm text-[#343446] md:hidden lg:block">Lagos</p>
      <p className="text-sm text-[#343446] md:hidden lg:block">
        Oct - 10 -2023
      </p>
    </div>
  );
}
