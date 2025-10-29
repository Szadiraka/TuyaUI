import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Content from "./pages/Content";
import Authentificaton from "./pages/Authentificaton";
import { useSignalR } from "./hooks/useSignalR";

const App = () => {
  useSignalR();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authentificaton />} />
        <Route path="/content" element={<Content />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
