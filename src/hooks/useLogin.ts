import  {loginUser} from "../api/apiUser";
import {useState} from "react";
import { saveToken, parseToken } from "../services/tokenService";
import { useNavigate } from "react-router-dom";
import type { TokenPayLoad } from "../types/ApiTypes";



export const useLogin =()=>{
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

    const login = async (mail: string, password: string) =>{
        setLoading(true);
        setError(null);
        try{
            const result = await loginUser({mail, password});
            saveToken(result);
          
             let user: TokenPayLoad | null = parseToken(result)
             if(user?.role === "admin"){
                navigate("/admin");
             }else{
                navigate("/content");
             }


        }catch(error: any){
           setError(error.message);
           
        }finally{
            setLoading(false);
        }       
    };
    return {login, loading, error, setError};
}