import  {loginUser} from "../../api/apiUser";
import {useState} from "react";
import { saveToken, parseTokenToUserData } from "../../services/tokenService";
import { useNavigate } from "react-router-dom";
import type { TokenPayLoad } from "../../types/apiTypes/ApiTypes";
import {userStore} from "../../store/UserStore";





export const useLogin =()=>{
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setErrors] = useState<string | null>(null);
   
  const navigate = useNavigate();

    const login = async (email: string, password: string) =>{
        setLoading(true);
        setErrors(null);
        try{
            const result = await loginUser({email, password});  //получаем токен

            saveToken(result);  
          
             let userInfo: TokenPayLoad | null = parseTokenToUserData(result) ;   
             if(userInfo){
                console.log(userInfo);
                userStore.setData(+userInfo.id, userInfo.name, userInfo.role, userInfo.email, userInfo.token);        
             }                 
             if(userInfo?.confirmEmail === "True"){
              
                navigate("/welcome");                
               
             }
                
             if(userInfo?.confirmEmail === "False"){               
                return "Код подтверждения отправлен на вашу электронную почту.";
               
             }
               
     

        }catch(error: any){
            console.log(error.message);
           setErrors(error.message);
           
        }finally{
            setLoading(false);
        }       
    };



    return {login, loading, error, setErrors};
}