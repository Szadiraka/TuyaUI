import axios from "axios";
import { userStore } from "../store/UserStore";
import {type DeviceUserResponse, type DeviceUserType } from "../types/apiTypes/DeviceTypes";

const API_URL: string = import.meta.env.VITE_API_BASEURL;

export const getAllDevices = async():Promise<DeviceUserType[]>=>{
    try{
         let {id, token}=userStore.getData();
         if (!id || !token)
             throw new Error("User or token  not found");
        const response = await axios.get<DeviceUserResponse>(
            `${API_URL}/userdevice/byuser/${id}`,          
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });   
              
        return response.data.data;    
    }catch(error: any){
        const message = error.response?.data?.message || "Невідома помилка";        
        throw new Error(message);
    }
    
};







// {
//     "success": true,
//     "data": [
//         {
//             "userId": 10,
//             "user": null,
//             "deviceId": 2,
//             "device": {
//                 "id": 2,
//                 "deviceUniqueId": "12121212",
//                 "name": "boiler",
//                 "accountId": null,
//                 "account": null,
//                 "switchingPower": 0.00,
//                 "deviceLogs": []
//             },
//             "level": 4,
//             "providedAt": "2025-11-13T16:28:18.9805733"
//         }
//     ]
// }



