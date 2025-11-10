import "./App.css";
import { BrowserRouter } from "react-router-dom";

import { useSignalR } from "./hooks/useSignalR";

import AppRoutes from "./routes/AppRoutes";

const App = () => {
  useSignalR();

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
