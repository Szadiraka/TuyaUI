import { useEffect, useState } from "react";
import { useAllDevices } from "../hooks/deviceHooks/useDevices";
import {
  PermissionLevel,
  type DeviceUserType,
} from "../types/apiTypes/DeviceTypes";

const Devices = () => {
  let [items, setItems] = useState<DeviceUserType[]>([]);
  let [showError, setShowError] = useState<boolean>(false);
  let { fetchDevices, loadingDevices, errorLoadingDevices } = useAllDevices();

  useEffect(() => {
    const load = async () => {
      let result = await fetchDevices();
      setItems(result);
    };
    load();
  }, []);

  useEffect(() => {
    if (errorLoadingDevices) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [errorLoadingDevices]);

  return (
    <div className="w-full p-4 relative">
      {loadingDevices && (
        <div className="flex justify-center items-center p-4">
          <div className="w-8 h-8 border-3 border-blue-400 border-dashed rounded-full animate-spin"></div>
        </div>
      )}
      {showError && (
        <h2
          className={`text-xl text-white  bg-red-400 px-4 py-6 rounded-2xl absolute right-10 top-0 max-w-2/3 shadow-lg
                       transition-opacity duration-1000 ${
                         showError
                           ? "opacity-100"
                           : "opacity-0  pointer-events-none"
                       }`}
        >
          {errorLoadingDevices}
        </h2>
      )}
      {items.map((item) => (
        <div
          key={item.device.id}
          className="w-full p-2 border-2 border-gray-200 rounded-2xl relative flex flex-col pt-10"
        >
          <div className="flex gap-4 items-center">
            <label className="text-md p-2 w-[130px]">Назва: </label>
            <input
              type="text"
              className="border-1 border-gray-200  w-full p-1"
              disabled
              value={item.device.name}
            />
          </div>
          <div className="flex gap-4 items-center">
            <label className="text-md p-2 w-[130px]">Id пристрою: </label>
            <input
              type="text"
              className="border-1 border-gray-200  w-full p-1"
              disabled
              value={item.device.deviceUniqueId}
            />
          </div>

          <div className="flex gap-4 items-center">
            <label className="text-md p-2 w-[130px]">Рівень доступу: </label>
            <input
              type="text"
              className="border-1 border-gray-200  w-full p-1"
              disabled
              value={PermissionLevel[item.level]}
            />
          </div>
          <div className="flex gap-4 items-center">
            <label className="text-md p-2 w-[130px]">Потужність [кВт]: </label>
            <input
              type="number"
              min={0}
              max={10}
              step={0.1}
              className="border-1 border-gray-200  w-full p-1"
              disabled
              value={item.device.switchingPower}
            />
          </div>

          <div className="flex gap-4 items-center">
            <label className="text-md p-2 w-[130px]">Дата реєстрації: </label>
            <input
              type="string"
              className="border-1 border-gray-200  w-full p-1"
              disabled
              value={new Date(item.providedAt + "Z")
                .toISOString()
                .slice(1, 19)
                .replace("T", " ")}
            />
          </div>
          <div className="flex gap-4 items-center justify-around my-3">
            <button className="px-4 py-1  bg-red-200 rounded-md hover:cursor-pointer hover:bg-red-500">
              видалити
            </button>
            <button className="px-4 py-1 bg-blue-200 rounded-md hover:cursor-pointer hover:bg-blue-500">
              редагувати
            </button>
          </div>

          {/* ------------------------------ */}

          {item.device.accountId && (
            <button className="bg-green-400 text-white text-sm py-1 px-2 rounded-md  absolute top-1 right-6">
              прив'язаний
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Devices;
