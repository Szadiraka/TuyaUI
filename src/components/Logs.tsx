import { useEffect, useState } from "react";

interface LogType {
  name: string;
  data: string;
}
const Logs = () => {
  let [logs, setLogs] = useState<LogType[]>([]);

  useEffect(() => {
    const sc = [
      { name: "log1", data: "13:03:2025" },
      { name: "log2", data: "13:03:2022" },
    ];
    setTimeout(() => {
      setLogs(sc);
    }, 2000);

    console.log("get Logs");
  }, []);
  return (
    <div className="w-full p-4">
      <h2 className="text-2xl pl-4">{logs.length > 0 ? "Logs" : "No Logs"}</h2>
      {logs.map((logs) => (
        <p>Logs: {logs.name}</p>
      ))}
    </div>
  );
};

export default Logs;
