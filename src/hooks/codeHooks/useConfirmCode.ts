
import {useState} from "react";
import { confirmCode } from "../../api/apiCode";
import { userStore } from "../../store/UserStore";
import { useNavigate } from "react-router-dom";



export const useConfirmCode =()=>{
    const [loadingCode, setLoadingCode] = useState<boolean>(false);
    const [errorConfirmCode, setErrorConfirmCode] = useState<string | null>(null);

  const navigate = useNavigate();

    const confirm = async (code: number) =>{
        setLoadingCode(true);
        setErrorConfirmCode(null); 
        let flag = false;
        try{
            const result = await confirmCode(code);  
            if(result === false || result === null) {
                setErrorConfirmCode("Не удалось подтвердить электронную почту.");
                flag= false;
            }else{
                flag = true;
            }
               
            //переводим на другую страницу 
            let {role} = userStore.getData();
            if(!role){
                setErrorConfirmCode("почта подтверждена но у вас нет роли.");
                flag = false;
            }
               navigate("/welcome") ;            
         
        
        }catch(error: any){
           setErrorConfirmCode(error.message);
           flag = false;
       
        }finally{
            setLoadingCode(false);
            return flag;
        }  

    };

    return {confirm, loadingCode, errorConfirmCode};
}