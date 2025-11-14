import { makeAutoObservable, reaction } from "mobx";
import { parseTokenToUserData, getToken } from "../services/tokenService";
import type { TokenPayLoad } from "../types/apiTypes/ApiTypes";

export interface UserStoreData{
    id: number | null;
    name: string | null;
    role: string | null;
    email: string | null;
}

class UserStore implements UserStoreData
{

    id: number | null = null;
    name: string | null = null;
    role: string | null = null;
    email: string | null = null;
    token: string | null = null;
    activePath: string = "/welcome";


    constructor(){
        makeAutoObservable(this);

        reaction(() =>getToken(),
            (token) => {
            if (!token) {
                this.clear();
                return;
            }          
            const user: TokenPayLoad | null = parseTokenToUserData(token);
            if (user) {
              this.setData(+user.id, user.name, user.role, user.email, user.token);
            }
           },
            {
                fireImmediately: true,
            }
        );
    }


    setData(id?: number|null, name?: string | null, role?: string | null, email?: string | null, token?: string | null){
        if(id)
        this.id = id;
     if(name)
        this.name = name;
     if(role)
        this.role = role;
     if(email)
        this.email = email;
     if(token)
        this.token = token;
    
    }

    getData(){
       return {id: this.id, name: this.name, role: this.role, email: this.email, token: this.token, activePath: this.activePath};
    }

    clear(){
        this.id = null;
        this.name = null;
        this.role = null;
        this.email = null;
        this.token = null;
        this.activePath = "/welcome";
    }

    getActivePath(){
        return this.activePath;
    }
    setActivePath(path: string){
        this.activePath = path;
    }
}

export const userStore = new UserStore();

