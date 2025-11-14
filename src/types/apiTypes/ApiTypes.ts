
 export interface LoginType{
    email: string;
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
    confirmEmail : string;
    token?: string;
    [key: string]: any;
 }


