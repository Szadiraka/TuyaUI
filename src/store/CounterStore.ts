import { makeAutoObservable } from "mobx";

class ProductStore{
   counter: number = 0

    constructor()
    {
       makeAutoObservable(this)
    }


    getCounter(){
        return this.counter;
    }
    addCounter( item:number){
        this.counter+=item;
    }
    subtractCounter( item:number){
        this.counter-=item;
    }
    resetCounter(){
        this.counter=0;
    }
}

export const counterStore = new ProductStore();