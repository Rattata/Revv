import {Entity} from "./Entity"
export class EntityRegister {
    private register : Map<string,Entity> = new Map<string,Entity>()
    get(key:string):Entity{
        return this.register.get(key)
    }
}