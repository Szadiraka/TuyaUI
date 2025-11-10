import { Navigate, Route, Routes } from "react-router-dom";
import Authentificaton from "../pages/Authentificaton";
import Welcome from "../pages/Welcome";
import { userStore } from "../store/UserStore";
import { observer } from "mobx-react-lite";
import { adminRoutes, clientRoutes } from "./routes";

const AppRoutes = observer(() => {
  const { role } = userStore.getData();
  const routes = role === "admin" ? adminRoutes : clientRoutes;
  return (
    <Routes>
      <Route path="/" element={<Authentificaton />} />
      <Route path="/welcome" element={<Welcome />} />

      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}

      <Route path="*" element={<Navigate to="/welcome" replace />} />
    </Routes>
  );
});

export default AppRoutes;
