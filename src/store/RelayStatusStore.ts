import { makeAutoObservable } from "mobx";
import {type RelaySatusDTO } from "../hooks/signalRHooks/useSignalR";

export class RelayStatusStore{

       relayStatuses: RelaySatusDTO[] = [];
    constructor(){
        makeAutoObservable(this)
    }


    getAllRelayStatuses(){
        return this.relayStatuses;
    }

    getRelayStatusById(id: string){
        return this.relayStatuses.find(x=>x.id === id)  ;
    }

    getRelayStatusByStatus(status: string){
        return this.relayStatuses.filter(x=>x.status === status)
    }

    getRelayStatusByTime(fromTime: string | null, toTime: string | null){     
        let res = this.relayStatuses;

        if( fromTime){
            const fromDateTime = new Date(fromTime);
            if(!isNaN(fromDateTime.getTime()))
                res = this.relayStatuses.filter(x=>new Date(x.time) >= fromDateTime);
        }          

        if(toTime){
            const toDateTime = new Date(toTime);
            if(!isNaN(toDateTime.getTime()))
                res = res.filter(x=>new Date(x.time) <= toDateTime);
        }
        return res;
    }

    cleanRelayStatuses(){
        this.relayStatuses = [];
    }

    deleteRelayStatusById(relayStatus: RelaySatusDTO){
        this.relayStatuses = this.relayStatuses.filter(x => !this.isEqual(x, relayStatus));
    }


    private isEqual(a: RelaySatusDTO, b: RelaySatusDTO): boolean{
        return a.id === b.id && a.status === b.status && a.time === b.time;
    }
}