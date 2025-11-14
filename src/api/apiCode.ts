import axios from "axios";
import {type SuccessResponse } from "../types/apiTypes/ApiTypes";
import { userStore } from "../store/UserStore";




const API_URL: string = import.meta.env.VITE_API_BASEURL;

export const confirmCode = async( code : number):Promise<boolean | null>=>{
    try{
         let {id,token}=userStore.getData();
         if (!id || !token)
             return null;
        const response = await axios.post<SuccessResponse>(
            `${API_URL}/code/confirmEmail/${id}`,
            code,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });        
        return response.data.success;    
    }catch(error: any){
        const message = error.response?.data?.message || "Неизвестная ошибка";        
        throw new Error(message);
    }
    
};

export const generateCode = async():Promise<boolean | null>=>{
    try{
         let {id,token}=userStore.getData();
         if (!id || !token)
             return null;
        const response = await axios.post<SuccessResponse>(
            `${API_URL}/code/generateCode`,
            id,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });        
        return response.data.success;    
    }catch(error: any){
        const message = error.response?.data?.message || "Неизвестная ошибка";        
        throw new Error(message);
    }
    
};

