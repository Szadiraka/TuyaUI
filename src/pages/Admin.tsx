import Nav from "../components/Nav";
import { userStore } from "../store/UserStore";
import { observer } from "mobx-react-lite";

const Admin = observer(() => {
  const userData = userStore.getData();
  return (
    <>
      <Nav />

      <div className="mt-[100px]">
        <div>You are in Admin Panel</div>
        <div>Name:{userData.name}</div>
        <div>Email:{userData.email}</div>
        <div>Role:{userData.role}</div>
        <div>Id:{userData.id}</div>
        <div>Token:{userData.token}</div>
      </div>
    </>
  );
});

export default Admin;
