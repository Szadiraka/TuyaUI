import { useEffect, useState } from "react";

interface ScenarioType {
  name: string;
}
const Scenarios = () => {
  let [scenarios, setScenarios] = useState<ScenarioType[]>([]);

  useEffect(() => {
    const sc = [{ name: "scenario1" }, { name: "scenario2" }];
    setTimeout(() => {
      setScenarios(sc);
    }, 2000);

    console.log("get Scenarious");
  }, []);
  return (
    <div className="w-full p-4">
      <h2 className="text-2xl pl-4">
        {scenarios.length > 0 ? "Scenarios" : "No Scenarios"}
      </h2>
      {scenarios.map((scenario) => (
        <p>Scenario: {scenario.name}</p>
      ))}
    </div>
  );
};

export default Scenarios;
