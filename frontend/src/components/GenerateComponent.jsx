import { useState } from "react";
import { FiLink } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { IoQrCodeOutline } from "react-icons/io5";
import { PiCommandLight } from "react-icons/pi";
import Modal from "./Modal";

export default function GenerateComponent() {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState();

  const toggle = (type) => {
    setModal(!modal);
    setModalType(type);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="bg-[#1B48DA] h-[40px] rounded px-4 text-white flex items-center gap-2"
      >
        <GoPlus />
        <p>Generate new</p>
      </button>
      {open && (
        <div className="absolute bg-white w-[200px] rounded md:translate-x-[-50px] md:left-[15%] border border-[#ECECF2] translate-y-2 shadow">
          <ul>
            <li>
              <button
                onClick={() => toggle("link")}
                className="py-3 px-4 cursor-pointer flex items-center justify-between hover:bg-[#EFF6FF] w-full"
              >
                <div className="flex items-center gap-2 text-[#535576]">
                  <FiLink size={20} />
                  <p className="text-sm font-semibold">Shorten URL</p>
                </div>
                <div className="p-1 rounded border border-[#ECECF2] text-[#B1B3C8] flex items-center gap-2 text-[10px]">
                  <PiCommandLight />
                  <p>+</p>
                  <p>L</p>
                </div>
              </button>
            </li>
            <li>
              <button
                onClick={() => toggle("qrcode")}
                className="py-3 px-4 cursor-pointer flex items-center justify-between hover:bg-[#EFF6FF] w-full"
              >
                <div className="flex items-center gap-2 text-[#535576]">
                  <IoQrCodeOutline size={20} />
                  <p className="text-sm font-semibold">QR Code</p>
                </div>
                <div className="p-1 rounded border border-[#ECECF2] text-[#B1B3C8] flex items-center gap-2 text-[10px]">
                  <PiCommandLight />
                  <p>+</p>
                  <p>G</p>
                </div>
              </button>
            </li>
          </ul>
        </div>
      )}
      <div>
        {modal && <Modal modalType={modalType} handlClick={() => toggle("")} />}
      </div>
    </div>
  );
}
