import { NavLink } from "react-router-dom";
import { counterStore } from "../store/CounterStore";
import { observer } from "mobx-react-lite";

const Content = observer(() => {
  return (
    <div>
      <h3 className="text-3xl font-serif text-blue-500">
        {counterStore.getCounter()}
      </h3>
      <NavLink to="/">Authentification</NavLink>
    </div>
  );
});

export default Content;
