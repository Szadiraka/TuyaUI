import Nav from "../components/Nav";
import { userStore } from "../store/UserStore";
import InfoLine from "../components/InfoLine";
import { useState } from "react";

const Profile = () => {
  const [showForm, setShowForm] = useState(false);
  const { id, name, role, email } = userStore.getData();

  const changeData = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <Nav />
      <div className="pt-[100px]  bg-gray-50 grid grid-cols-[100px_1fr] sm:grid-cols-[200px_1fr] gap-4">
        <div className="p-2">
          <div className=" w-[90px] h-[90px] sm:w-[180px] sm:h-[180px] flex items-center justify-center  mx-auto">
            <img
              src="/image/avatar.jpg"
              alt="avatar"
              className="w-[90px] h-[90px] sm:w-[180px] sm:h-[180px] rounded-full"
            />
          </div>
        </div>
        <div className="p-2 ">
          <div className="max-w-[600px] border-2 border-gray-200 rounded-lg">
            <h2 className="text-xl italic  mb-3 pl-6 text-center">
              Інформація про користувача:
            </h2>
            <InfoLine
              classes="text-lg flex  border-b-1 border-gray-200 px-2 py-3"
              label="Id"
              txt={id}
            />
            <InfoLine
              classes="text-lg flex  border-b-1 border-gray-200 px-2 py-3"
              label="Name"
              txt={name}
            />
            <InfoLine
              classes="text-lg flex  border-b-1 border-gray-200 px-2 py-3"
              label="Role"
              txt={role}
            />
            <InfoLine
              classes="text-lg flex  border-b-1 border-gray-200 px-2 py-3"
              label="Email"
              txt={email}
            />
          </div>
        </div>
      </div>
      <div
        className="flex flex-col gap-2 md:gap-4 justify-center w-full mt-4 md:max-w-[820px] border-2 border-gray-200 rounded-xl
       p-2 m-2 md:m-4 md:p-4"
      >
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 hover:cursor-pointer w-[150px]"
        >
          Редагувати дані
        </button>
        {showForm && (
          <form
            onSubmit={changeData}
            className="w-full h-[400px] bg-red-200"
          ></form>
        )}
      </div>
    </>
  );
};

export default Profile;
