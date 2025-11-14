import React, { useRef } from "react";
import { useState } from "react";
import { type UserProps } from "../types/localTypes/UserProps";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { useLogin } from "../hooks/userHooks/useLogin";
import { useRegistration } from "../hooks/userHooks/useRegistration";
import { AiOutlineClose } from "react-icons/ai";

import { useGenerateCode } from "../hooks/codeHooks/useGenerateCode";
import { useConfirmCode } from "../hooks/codeHooks/useConfirmCode";
import { logout } from "../services/tokenService";
import { userStore } from "../store/UserStore";

const Authentificaton: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [register, setRegister] = useState<boolean>(false);
  const [userProps, setUserProps] = useState<UserProps>({
    user: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      roleName: null,
    },
    errors: {
      errorName: "",
      errorEmail: "",
      errorPassword: "",
      errorConfirmPassword: "",
    },
  });
  const [code, setCode] = useState<number | null>(null);
  const [seconds, setSeconds] = useState<string | null>(null);
  const { login, error, setErrors } = useLogin();
  const { registration, errorRegistration, setErrorRegistration } =
    useRegistration();
  const { generate, errorGenerateCode } = useGenerateCode();
  const { confirm, errorConfirmCode } = useConfirmCode();
  const [msg, setMsg] = useState<string | null>(null);
  const [showTimer, setShowTimer] = useState<boolean>(false);
  //--------------
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // логика, которая будет выполняться при отправке формы
    if (register) {
      compareData("name", userProps.user.name);
      compareData("email", userProps.user.email);
      compareData("password", userProps.user.password);
      compareData("confirmPassword", userProps.user.confirmPassword);

      if (
        userProps.errors.errorName ||
        userProps.errors.errorEmail ||
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
        setShowTimer(false);
      }
    } else {
      let email = userProps.user.email;
      let password = userProps.user.password;
      // отправка запроса на сервер, если все ок - получаем jwt-токен и переводим на поле контента

      let msg = await login(email, password);
      if (msg) {
        setMsg(msg);
        setShowTimer(true);
        //функция отсчета времени подтверждения
        counter(300);
      }
    }
  };

  const counter = (seconds: number) => {
    cleanAllFields();
    if (timerRef.current) clearInterval(timerRef.current);
    let current = seconds;
    timerRef.current = setInterval(() => {
      if (current <= 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        setSeconds(null);
        return;
      }
      let min = Math.floor(current / 60);
      let sec = current % 60;
      let min_s = "",
        sec_s = "";
      min_s = min < 10 ? "0" + min : min.toString();
      sec_s = sec < 10 ? "0" + sec : sec.toString();
      setSeconds(`${min_s}:${sec_s}`);
      current--;
    }, 1000);
  };

  const checkCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (seconds === null) {
      //отправить запрос на сервер, для отправки нового кода

      let result = await generate();
      if (result) {
        setMsg("Код отправлен на почту");
        counter(300);
        return;
      } else {
        setMsg(errorGenerateCode || "Не удалось отправить код.");
      }
    } else {
      //отправить запрос на сервер, для подтверждения
      if (!code) {
        setMsg("Введите код");
        return;
      }

      const result = await confirm(code);
      if (!result) {
        setMsg(errorConfirmCode || "Код неверный или истёк срок действия");
      }
    }

    setCode(null);
    setSeconds(null);
    if (timerRef.current) clearInterval(timerRef.current);
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

      case "email":
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
        email: "",
        password: "",
        confirmPassword: "",
        roleName: null,
      },
      errors: {
        errorName: "",
        errorEmail: "",
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
        setErrorRegistration(null);
        setMsg(null);
        setCode(null);
        logout();
        userStore.clear();
        if (timerRef.current) clearInterval(timerRef.current);
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
              name="email"
              className={`border-2 border-gray-200 w-full outline-none p-2 rounded-md focus:ring-2 ${
                userProps.errors.errorEmail !== ""
                  ? "border-red-400"
                  : "border-gray-200"
              } text-xl font-semibold text-black ring-blue-400 bg-white`}
              placeholder="enter your mail"
              value={userProps.user.email}
              onChange={setData}
              onFocus={resetError}
              onBlur={checkData}
            />
          </div>
          {userProps.errors.errorMail && register && (
            <p className="text-red-500 ml-[110px]">
              {userProps.errors.errorEmail}
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
        {(error || errorRegistration || msg) && (
          <div
            className="p-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                       border-2 border-gray-100 rounded-xl z-20  h-full w-full bg-white shadow-2xl
                        flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {(error || errorRegistration) && (
              <h2 className="text-2xl font-semibold text-red-500 text-center">
                {error} {errorRegistration}
              </h2>
            )}
            {/* /--------------------------------------------------------- */}
            {msg && (
              <div className="flex flex-col items-center justify-center p-4  mt-2 gap-2 w-full">
                <h2 className="text-xl font-semibold text-green-500 ">{msg}</h2>
                {showTimer && (
                  <>
                    <div className="gap-3 flex flex-row items-center mt-4  w-full">
                      <label className="text-xl font-semibold  min-w-[100px]">
                        Timer
                      </label>
                      <p className="border-2 border-gray-200 w-full px-2 rounded-md  text-xl py-2 min-h-[44px]  ">
                        {seconds}
                      </p>
                    </div>
                    <form
                      onSubmit={checkCode}
                      className="flex flex-col items-center gap-4  w-full"
                    >
                      <div className="gap-3 flex flex-row items-center mt-4  w-full ">
                        <label className="text-xl font-semibold  min-w-[100px]">
                          Code
                        </label>
                        <input
                          className="border-2 border-gray-200 w-full outline-none p-2 rounded-md focus:ring-2  text-xl font-semibold text-black ring-blue-400"
                          type="number"
                          name="code"
                          min={100000}
                          max={999999}
                          value={code ? code : ""}
                          onChange={(e) => setCode(+e.target.value)}
                        />
                      </div>
                      <div className="flex flex-row justify-end mt-4 ">
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white text-xl  py-2 px-4 rounded"
                        >
                          {seconds === null || seconds === ""
                            ? "Прислать новый"
                            : "Подтвердить"}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            )}

            <button
              className="absolute top-2 right-3 text-red-500 hover:cursor-pointer rounded-full border-2 border-gray-400
               hover:border-red-500"
              onClick={() => {
                setErrors(null);
                setErrorRegistration(null);
                setMsg(null);
                setCode(null);
                logout();
                userStore.clear();
                if (timerRef.current) clearInterval(timerRef.current);
                console.log(userStore.getData());
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
