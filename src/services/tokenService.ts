import {jwtDecode} from "jwt-decode";
import {type TokenPayLoad } from "../types/ApiTypes";


const TOKEN_KEY ="auth_token";


export const saveToken = (token: string) => sessionStorage.setItem(TOKEN_KEY, token);


export const getToken = (): string | null => sessionStorage.getItem(TOKEN_KEY);

export const logout = () => sessionStorage.removeItem(TOKEN_KEY);

export const parseToken =(token: string): TokenPayLoad | null => jwtDecode<TokenPayLoad>(token);

export const getUserFromToken =(): TokenPayLoad | null =>{
    const token = getToken();
    if(!token) return null;
    try{
        return parseToken(token);
    }catch(e){
        return null;
    }
}



