
import { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";


export type RelaySatusDTO ={
    id: string,
    status: string,
    time: string

};

export const useSignalR =()=>{
    const url: string = import.meta.env.VITE_SIGNALR_HUB_URL;

const [connection, setConnection] = useState<signalR.HubConnection | null>(null);


useEffect(()=>{
    const newConnection = new signalR.HubConnectionBuilder()
    .withUrl(url)
    .withAutomaticReconnect()
    .build();

    setConnection(newConnection);
    newConnection.start()
    .then(()=>console.log("SignalR connected"))
    .catch(error=>console.error("Error connecting to SignalR:", error));     

    return () => {
        newConnection.stop();
    }

},[url]);

useEffect(()=>{
  if(!connection) return;
    const handler = (message: RelaySatusDTO) =>{
        console.log(`Получение сообщения об уствройстве с id:${message.id} в состоянии:  ${message.status} время: ${message.time}`);

        //обновляем MobX        
    }

connection.on("DeviceEvent", handler);

return ()=>{
    connection.off("DeviceEvent", handler);
}

},[connection]);

}