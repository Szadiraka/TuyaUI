
import {useState} from "react";
import { getAllDevices } from "../../api/apiDevice";


export const useAllDevices =()=>{
    const [loadingDevices, setLoadingDevices] = useState<boolean>(false);
    const [errorLoadingDevices, setErrorLoadingDevices] = useState<string | null>(null);


    const fetchDevices = async () =>{
        setLoadingDevices(true);
        setErrorLoadingDevices(null);        
        try{
            // await new Promise((resolve) => setTimeout(resolve, 2000));      
            return await getAllDevices(); 
        }catch(error: any){
           setErrorLoadingDevices(error.message);          
           return [];
        }finally{
            setLoadingDevices(false);            
        }  
     

    };

    return {fetchDevices, loadingDevices, errorLoadingDevices};
}