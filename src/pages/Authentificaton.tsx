import React from "react";
import { useState } from "react";
import { type UserProps } from "../types/UserProps";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { useLogin } from "../hooks/useLogin";
import { useRegistration } from "../hooks/useRegistration";
import { AiOutlineClose } from "react-icons/ai";

const Authentificaton: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [register, setRegister] = useState<boolean>(false);
  const [userProps, setUserProps] = useState<UserProps>({
    user: {
      name: "",
      mail: "",
      password: "",
      confirmPassword: "",
      roleName: null,
    },
    errors: {
      errorName: "",
      errorMail: "",
      errorPassword: "",
      errorConfirmPassword: "",
    },
  });

  const { login } = useLogin();
  const { registration } = useRegistration();
  // это временно, нужно будет убрать после отладки
  const [error, setErrors] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(
    "вы успешно зарегистрировались"
  );
  //--------------

  //-----------

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // логика, которая будет выполняться при отправке формы
    if (register) {
      compareData("name", userProps.user.name);
      compareData("mail", userProps.user.mail);
      compareData("password", userProps.user.password);
      compareData("confirmPassword", userProps.user.confirmPassword);

      if (
        userProps.errors.errorName ||
        userProps.errors.errorMail ||
        userProps.errors.errorPassword ||
        userProps.errors.errorConfirmPassword
      )
        return;
      // отправка запроса на сервер, если все ок - очищаем поля и переводим на поле входа, заполняя при этом полями email и пароле
      let message = await registration(userProps.user);
      if (message) {
        //показать сообщение- что все ок, и перевести на поле входа
        setRegister(false);
        setShowPassword(false);
        setMsg(message);
      }
    } else {
      let mail = userProps.user.mail;
      let password = userProps.user.password;
      // отправка запроса на сервер, если все ок - получаем jwt-токен и переводим на поле контента
      await login(mail, password);
      // тут нужно отбработатьь случай подтверждения почты!!!!

      // ----------------------//
    }
  };

  const setData = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setUserProps({ ...userProps, user: { ...userProps.user, [name]: value } });
  };

  const setError = (errorName: string, message: string) => {
    setUserProps({
      ...userProps,
      errors: { ...userProps.errors, [errorName]: message },
    });
  };

  const getErrorKey = (name: string): string => {
    return "error" + name.charAt(0).toUpperCase() + name.slice(1);
  };

  const resetError = (e: React.FocusEvent<HTMLInputElement>) => {
    let { name } = e.target;
    let errorName = getErrorKey(name);
    setError(errorName, "");
  };

  const checkData = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!register) return;
    const { name, value } = e.target;
    compareData(name, value);
  };

  const compareData = (name: string, value: string): void => {
    let errorName = getErrorKey(name);
    setError(errorName, "");
    switch (name) {
      case "name":
        if (!value) return setError(errorName, "This field is required");
        if (value.length < 3)
          return setError(errorName, "Minimum 3 characters");
        if (value.length > 20)
          return setError(errorName, "Maximum 20 characters");
        break;

      case "mail":
        if (!value) return setError(errorName, "This field is required");
        if (!isValidEmail(value))
          return setError(errorName, "Invalid email format");
        break;

      case "password":
        if (!value) return setError(errorName, "This field is required");
        if (value.length < 4)
          return setError(errorName, "Minimum 4 characters");
        break;

      case "confirmPassword":
        if (!value) return setError(errorName, "This field is required");
        if (value !== userProps.user.password)
          return setError(errorName, "Passwords do not match");
        break;
    }
  };

  const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const cleanAllFields = () => {
    setUserProps({
      user: {
        name: "",
        mail: "",
        password: "",
        confirmPassword: "",
        roleName: null,
      },
      errors: {
        errorName: "",
        errorMail: "",
        errorPassword: "",
        errorConfirmPassword: "",
      },
    });
  };

  const changePage = () => {
    cleanAllFields();
    if (register) setRegister(false);
    else setRegister(true);
  };

  return (
    <div
      className="w-screen h-screen bg-blue-50  flex flex-col justify-center items-center p-2 "
      onClick={() => {
        setErrors(null);
        setMsg(null);
      }}
    >
      <div className="w-full sm:max-w-[500px]  bg-gray-50  rounded-xl p-4  shadow-2xl border-2 border-gray-100 relative">
        <h2 className="text-3xl font-serif text-blue-500 font my-4 text-center">
          {register ? "Register" : "Login"}
        </h2>
        <form className="" onSubmit={handleSubmit}>
          {register && (
            <div className="gap-3 flex flex-row items-center">
              <label className="text-xl font-semibold  min-w-[100px]">
                Name
              </label>
              <input
                type="text"
                name="name"
                className={`border-2 border-gray-200 w-full outline-none p-2 rounded-md focus:ring-2 ${
                  userProps.errors.errorName !== ""
                    ? "border-red-400"
                    : "border-gray-200"
                } text-xl font-semibold text-black ring-blue-400`}
                placeholder="enter your name"
                value={userProps.user.name}
                onChange={setData}
                onFocus={resetError}
                onBlur={checkData}
              />
            </div>
          )}
          {userProps.errors.errorName && register && (
            <p className="text-red-500 ml-[110px]">
              {userProps.errors.errorName}
            </p>
          )}

          <div className="gap-3 flex flex-row items-center  mt-4">
            <label className="text-xl font-semibold min-w-[100px]">Mail</label>
            <input
              type="text"
              name="mail"
              className={`border-2 border-gray-200 w-full outline-none p-2 rounded-md focus:ring-2 ${
                userProps.errors.errorMail !== ""
                  ? "border-red-400"
                  : "border-gray-200"
              } text-xl font-semibold text-black ring-blue-400 bg-white`}
              placeholder="enter your mail"
              value={userProps.user.mail}
              onChange={setData}
              onFocus={resetError}
              onBlur={checkData}
            />
          </div>
          {userProps.errors.errorMail && register && (
            <p className="text-red-500 ml-[110px]">
              {userProps.errors.errorMail}
            </p>
          )}

          <div className="gap-3 flex flex-row items-center mt-4">
            <label className="text-xl font-semibold  min-w-[100px]">
              Password
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className={`border-2 border-gray-200 w-full outline-none p-2 rounded-md focus:ring-2 ${
                  userProps.errors.errorPassword !== ""
                    ? "border-red-400"
                    : "border-gray-200"
                } text-xl font-semibold text-black ring-blue-400 relative`}
                placeholder="enter your password"
                value={userProps.user.password}
                onChange={setData}
                onFocus={resetError}
                onBlur={checkData}
              />
              <div
                className="absolute right-1 top-1/2 -translate-y-1/2  cursor-pointer rounded-full text-2xl text-gray-500 hover:text-blue-500 z-10"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </div>
            </div>
          </div>
          {userProps.errors.errorPassword && register && (
            <p className="text-red-500 ml-[110px]">
              {userProps.errors.errorPassword}
            </p>
          )}

          {register && (
            <div className="gap-3 flex flex-row items-center mt-4">
              <label className="text-md font-semibold  min-w-[100px]">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                className={`border-2 border-gray-200 w-full outline-none p-2 rounded-md focus:ring-2 ${
                  userProps.errors.errorConfirmPassword !== ""
                    ? "border-red-400"
                    : "border-gray-200"
                } text-xl font-semibold text-black ring-blue-400`}
                placeholder="confirm your password"
                value={userProps.user.confirmPassword}
                onChange={setData}
                onFocus={resetError}
                onBlur={checkData}
              />
            </div>
          )}
          {userProps.errors.errorConfirmPassword && register && (
            <p className="text-red-500 ml-[110px]">
              {userProps.errors.errorConfirmPassword}
            </p>
          )}

          <div className="flex flex-row justify-end mt-4 ">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white text-xl  py-2 px-4 rounded"
            >
              {register ? "Register" : "Login"}
            </button>
          </div>
        </form>
        <p className="p-2 mt-4 text-right italic">
          {register
            ? "Have you already an account?"
            : "You don't have an account"}
          <button
            className="text-blue-500 hover:cursor-pointer pl-4 text-md font-semibold underline"
            onClick={changePage}
          >
            {register ? "Login" : "Register"}
          </button>
        </p>
        {/* модальное окно */}
        {(error || msg) && (
          <div
            className="p-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                       border-2 border-gray-100 rounded-xl z-20  h-full w-full bg-white shadow-2xl
                        flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {error && (
              <h2 className="text-2xl font-semibold text-red-500 text-center">
                Что-то пошло не так gfgdfgfdgddddddddddddd
              </h2>
            )}
            {msg && (
              <h2 className="text-2xl font-semibold text-green-500 text-center">
                Поздравляем!
              </h2>
            )}

            {(error || msg) && (
              <p className="mt-4 text-xl">
                {error} {msg}
              </p>
            )}

            <button
              className="absolute top-2 right-3 text-red-500 hover:cursor-pointer rounded-full border-2 border-gray-400
               hover:border-red-500"
              onClick={() => {
                setErrors(null);
                setMsg(null);
              }}
            >
              <AiOutlineClose size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Authentificaton;
