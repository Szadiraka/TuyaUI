import {jwtDecode} from "jwt-decode";
import {type TokenPayLoad } from "../types/apiTypes/ApiTypes";


const TOKEN_KEY ="auth_token";


export const saveToken = (token: string) => sessionStorage.setItem(TOKEN_KEY, token);


export const getToken = (): string | null => sessionStorage.getItem(TOKEN_KEY);

export const logout = () => sessionStorage.removeItem(TOKEN_KEY);

export const parseToken =(token: string): TokenPayLoad | null => jwtDecode<TokenPayLoad>(token);


export const parseTokenToUserData=(token: string)=>{
    let decoded:TokenPayLoad | null = parseToken(token);
    if(decoded){
        const result:TokenPayLoad={
            id: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
            email: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
            name: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
            role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
            confirmEmail: decoded.confirmEmail,
            token: token
        }
        return result;
    }
    return null;
}



