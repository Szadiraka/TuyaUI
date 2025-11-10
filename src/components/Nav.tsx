import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { userStore } from "../store/UserStore";
import { observer } from "mobx-react-lite";
import { logout } from "../services/tokenService";

const Nav = observer(() => {
  const navigate = useNavigate();
  const { role, activePath } = userStore.getData();
  const logoutUser = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    userStore.clear();
    navigate("/");
  };

  const getNavLinkClass = (path: string) => {
    return `hover:cursor-pointer hover:border-b-2 hover:border-green-500 pb-2 max-w-[100px] sm:max-w-max text-center  ${
      activePath === path ? "border-b-2 border-red-500" : "border-transparent "
    }`;
  };

  return (
    <div
      className="h-[80px] bg-gray-100 fixed top-0 left-0 right-0 z-50 
     shadow-xl shadow-gray-200  text-sm md:text-lg"
    >
      <div className="flex flex-row justify-between items-center py-2 px-4 h-full max-w-[1240px] mx-auto">
        <div className="flex flex-row gap-1 sm:gap-4 py-2 items-center ">
          <NavLink
            onClick={() => userStore.setActivePath("/welcome")}
            to={"/welcome"}
            className={getNavLinkClass("/welcome")}
          >
            <img
              src="/image/logo.png"
              alt="logo"
              className="h-[50px] w-[50px]  rounded-full"
            />
          </NavLink>
          {role !== null && role !== "admin" && (
            <NavLink
              onClick={() => userStore.setActivePath("/message_center")}
              to={"/message_center"}
              className={getNavLinkClass("/message_center")}
            >
              Центр повідомлень
            </NavLink>
          )}
          {role !== null && role !== "admin" && (
            <NavLink
              onClick={() => userStore.setActivePath("/manage_devices")}
              to={"/manage_devices"}
              className={getNavLinkClass("/manage_devices")}
            >
              Керування пристроями
            </NavLink>
          )}

          {role !== null && role === "admin" && (
            <NavLink
              onClick={() => userStore.setActivePath("/admin")}
              to={"/admin"}
              className={getNavLinkClass("/admin")}
            >
              Панель адміністратора
            </NavLink>
          )}
        </div>
        <div className="flex flex-row gap-2 md:gap-4">
          <NavLink
            to={"/profile"}
            onClick={() => userStore.setActivePath("/profile")}
            className={getNavLinkClass("/profile")}
          >
            Профіль
          </NavLink>

          <NavLink
            to={"/"}
            onClick={logoutUser}
            className={getNavLinkClass("/")}
          >
            Вихід
          </NavLink>
        </div>
      </div>
    </div>
  );
});

export default Nav;
