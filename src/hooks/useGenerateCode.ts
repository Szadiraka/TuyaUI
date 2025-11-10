
import {useState} from "react";
import { generateCode } from "../api/apiCode";


export const useGenerateCode =()=>{
    const [loadingGenerateCode, setLoadingGenerateCode] = useState<boolean>(false);
    const [errorGenerateCode, setErrorGenerateCode] = useState<string | null>(null);


    const generate = async () =>{
        let flag = false;
        setLoadingGenerateCode(true);
        setErrorGenerateCode(null); 
        try{
            const result = await generateCode();  
            if(result === false || result === null){  
                setErrorGenerateCode("Не удалось подтвердить электронную почту.");
                flag =false;
            } else{
                flag = true;
            }        
          
        
        }catch(error: any){
           setErrorGenerateCode(error.message);
           flag = false;
       
        }finally{
            setLoadingGenerateCode(false);
            return flag;
        }       
    };
    return {generate, loadingGenerateCode, errorGenerateCode};
}