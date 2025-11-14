
import {useState} from "react";
import { registrationUser } from "../../api/apiUser";
import {type UserType } from "../../types/localTypes/UserType";


export const useRegistration =()=>{
    const [loadingRegistration, setLoadingRegistration] = useState<boolean>(false);
    const [errorRegistration, setErrorRegistration] = useState<string | null>(null);




    const registration = async (user: UserType) =>{
        setLoadingRegistration(true);
        setErrorRegistration(null);
        try{
            const result = await registrationUser(user);  
            return result;    
        
        }catch(error: any){
           setErrorRegistration(error.message);
           return null;
        }finally{
            setLoadingRegistration(false);
        }       
    };
    return {registration, loadingRegistration, errorRegistration, setErrorRegistration};
}