import axios from "axios";
import { type LoginType, type SuccessResponse } from "../types/ApiTypes";
import type { UserType } from "../types/UserType";



const API_URL: string = import.meta.env.VITE_API_BASEURL;

export const loginUser = async( dto : LoginType):Promise<string>=>{
    try{
        const response = await axios.post<SuccessResponse>(`${API_URL}/user/login`,dto);          
        return response.data.data;    
    }catch(error: any){
        const message = error.response?.data?.message || "Неизвестная ошибка";
        throw new Error(message);
    }
    
};

export const registrationUser = async (dto: UserType): Promise<string> => {
    try {
        const response = await axios.post<SuccessResponse>(`${API_URL}/user/register`, dto);
        return response.data.data;
    } catch (error: any) {
        const message = error.response?.data?.message || "Неизвестная ошибка";
        throw new Error(message);
    }
}