
 export interface LoginType{
    mail: string;
    password: string;
 };

 export interface SuccessResponse{
   success: boolean;
   data: string;
 }

 export interface TokenPayLoad{
    id: string;
    name: string;
    email: string;
    role:string;
    [key: string]: any;
 }


