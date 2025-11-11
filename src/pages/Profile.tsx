import Nav from "../components/Nav";
import { userStore } from "../store/UserStore";
import InfoLine from "../components/InfoLine";
import { useState } from "react";

const Profile = () => {
  const [showForm, setShowForm] = useState(false);
  const { id, name, role, email } = userStore.getData();
  const [userData, setUserData] = useState({ name: "", email: "" });

  const changeData = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const eventHandler = () => {
    setShowForm(!showForm);
    setUserData({
      ...userData,
      name: name ? name : "",
      email: email ? email : "",
    });
  };

  return (
    <>
      <Nav />
      <div className="pt-[100px]  bg-gray-50 grid grid-cols-1 sm:grid-cols-[100px_1fr] md:grid-cols-[200px_1fr] gap-2 ">
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
          <div className=" max-w-[600px] border-2 border-gray-200 rounded-lg">
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
        className="flex flex-col gap-2 md:gap-4 justify-center w-full mt-4 md:max-w-[820px] 
       p-2  md:m-4 md:p-4"
      >
        <button
          onClick={eventHandler}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 hover:cursor-pointer w-[150px]
          mx-auto"
        >
          Редагувати дані
        </button>

        {showForm && (
          <form
            onSubmit={changeData}
            className="w-full  border-2 border-gray-200 rounded-xl  p-4 "
          >
            <div className="gap-3 flex flex-row items-center  mt-4">
              <label className="text-xl font-semibold min-w-[100px]">
                Name
              </label>
              <input
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                value={userData.name}
                type="text"
                name="name"
                className={`border-2 border-gray-200 w-full outline-none p-2 rounded-md focus:ring-2 ${
                  // userProps.errors.errorEmail !== ""
                  //   ? "border-red-400"
                  //   : "border-gray-200"
                  "border-gray-200"
                } 
              text-lg font-semibold text-black ring-blue-400 bg-white`}
                placeholder="enter your new name"
              />
            </div>
            {/* {userProps.errors.errorMail && register && ( */}
            <p className="text-red-500 ml-[110px]"></p>

            <div className="gap-3 flex flex-row items-center  mt-4">
              <label className="text-xl font-semibold min-w-[100px]">
                Email
              </label>
              <input
                onChange={(e) => {
                  setUserData({ ...userData, email: e.target.value });
                  console.log(e.target.value);
                }}
                value={userData.email}
                type="email"
                name="email"
                className={`border-2 border-gray-200 w-full outline-none p-2 rounded-md focus:ring-2 ${
                  // userProps.errors.errorEmail !== ""
                  //   ? "border-red-400"
                  //   : "border-gray-200"
                  "border-gray-200"
                } 
              text-lg font-semibold text-black ring-blue-400 bg-white`}
                placeholder="enter your new email"
              />
            </div>
            {/* {userProps.errors.errorMail && register && ( */}
            <p className="text-red-500 ml-[110px]"></p>

            <div className="flex flex-row justify-around mt-4">
              <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 hover:cursor-pointer">
                Зміните
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 hover:cursor-pointer">
                Відмінити
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default Profile;
