import { observer } from "mobx-react-lite";
import Nav from "../components/Nav";

const ManageDevices = observer(() => {
  return (
    <>
      <Nav />
      <div className="mt-[100px]">Manage Devices</div>
    </>
  );
});

export default ManageDevices;
