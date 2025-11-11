import Nav from "../components/Nav";
import { MdEmail } from "react-icons/md";
import { FaViber } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
const MessageCentre = () => {
  return (
    <>
      <Nav />
      <div className="mt-[100px]  py-2 md:py-4 max-w-[1240px] mx-auto">
        <h2
          className="text-md text-center md:text-left md:text-2xl font-bold italic mb-4 border-b-1
         border-gray-200 p-2"
        >
          Варіанти отримання інформаційних повідомлень про роботу обладнання
        </h2>
        <div className=" w-full  flex items-center justify-between gap-3 p-3 border-b-1 border-gray-200  hover:bg-gray-50">
          <div className="flex items-center gap-3">
            <MdEmail className="text-blue-300 text-3xl " />
            <label className="text-sm md:text-lg ">
              Повідомлення на електронну почту
            </label>
          </div>

          <input
            type="checkbox"
            name="email"
            className="w-5 h-5 hover:cursor-pointer appearance-none border-2 border-gray-400 rounded-full p-2
            checked:bg-blue-400 checked:border-blue-400 focus:ring-green-300"
          />
        </div>
        <div className=" w-full flex items-center justify-between gap-3 p-3 border-b-1 border-gray-200 hover:bg-gray-50">
          <div className="flex items-center gap-3">
            <FaViber className="text-indigo-400 text-3xl " />
            <label className="text-sm md:text-lg">Повідомлення на Viber</label>
            <button className="text-sm md:text-lg text-indigo-400 hover:cursor-pointer">
              "Підключитись до Viber"
            </button>
          </div>
          <input
            type="radio"
            name="massager"
            id=""
            value={"viber"}
            className="w-5 h-5 hover:cursor-pointer appearance-none border-2 border-gray-400 rounded-full p-2
            checked:bg-blue-400 checked:border-blue-400"
          />
        </div>
        <div className=" w-full flex items-center justify-between gap-3 p-3 border-b-1 border-gray-200  hover:bg-gray-50">
          <div className="flex items-center gap-3">
            <FaTelegram className="text-blue-400 text-3xl" />
            <label className="text-sm md:text-lg">
              Повідомлення на Telegram
            </label>
            <button className="text-sm md:text-lg text-blue-400 hover:cursor-pointer">
              "Підключитись до Telegram"
            </button>
          </div>
          <input
            type="radio"
            name="massager"
            id=""
            value={"telegram"}
            className="w-5 h-5 hover:cursor-pointer appearance-none border-2 border-gray-400 rounded-full p-2
                      checked:bg-blue-400 checked:border-blue-400"
          />
        </div>
        <div className="flex flex-col items-center justify-сenter mt-4">
          <button
            className="py-2 px-4 text-lg hover:cursor-pointer border-1 border-gray-200 rounded-md  shadow-[inset_0_2px_5px_rgba(0,0,0,0.3)] 
                       active:shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)] "
          >
            Зберігти зміни
          </button>
        </div>
      </div>
    </>
  );
};

export default MessageCentre;
