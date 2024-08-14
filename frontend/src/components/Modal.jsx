import { AiOutlineClose } from "react-icons/ai";

export default function Modal({ handlClick, modalType }) {
  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mt-20">
        <div className="relative my-6 mx-auto md:w-[615px] w-[300px]">
          <div className="border-0 rounded shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*body*/}
            <div className="relative md:py-16 py-10 md:px-10 px-3 flex-auto  w-full align-middle flex flex-col mx-auto">
              <p className="md:text-3xl text-lg font-bold mb-[50px]">
                <span className="text-black">
                  {modalType === "link" ? "Shorten URL" : "QR Code"}
                </span>
              </p>
              <div className="grid gap-3">
                <p>
                  {modalType === "link" ? "Shorten URL" : "Generate QR Code"}
                </p>
                <div>
                  <textarea
                    className="md:h-[159px] w-full rounded border border-[#ECECF2] outline-none p-3"
                    name=""
                    id=""
                  ></textarea>
                </div>
                <button className="py-3 w-full bg-[#1B48DA] rounded text-white">
                  {modalType === "link" ? "Shorten" : "Generate QR Code"}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-end rounded-b absolute top-5 right-5 cursor-pointer">
              <AiOutlineClose
                size={24}
                onClick={handlClick}
                className=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-10 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
}
