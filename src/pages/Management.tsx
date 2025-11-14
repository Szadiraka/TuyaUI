import { observer } from "mobx-react-lite";
import Nav from "../components/Nav";
import SideBar from "../components/SideBar";
import Addresses from "../components/Addresses";
import Devices from "../components/Devices";
import Scenarios from "../components/Scenarios";
import Logs from "../components/Logs";
import { useState } from "react";

const Management = observer(() => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const changePage = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <>
      <Nav />
      <div className="pt-[100px] w-full h-screen  grid grid-cols-[100px_1fr] md:grid-cols-[200px_1fr] ">
        {/* <SideBar /> */}

        <SideBar func={changePage} />
        {/* Main */}
        {currentPage === 1 && <Addresses />}
        {currentPage === 2 && <Devices />}
        {currentPage === 3 && <Scenarios />}
        {currentPage === 4 && <Logs />}
      </div>
    </>
  );
});

export default Management;
