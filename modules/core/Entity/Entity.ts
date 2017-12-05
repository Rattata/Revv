import {UUID} from "../UUID"
export abstract class Entity{
    entityID: number
    getEntityID():number{
        return this.entityID
    }
}