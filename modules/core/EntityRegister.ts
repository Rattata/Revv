import { Entity } from "./Entity"
import { injectable } from "inversify"
import { TYPES } from "./types";

@injectable()
export class EntityRegister {
    private xyRegister: Map<string, Array<any>>
    private entityRegister: Map<number, any>

    constructor(width: number, height: number) {
        this.entityRegister = new Map<number, any>()
        this.xyRegister = new Map<string, Array<any>>()
        if (width != undefined) {
            for (var i = 0; i < width; i++) {
                for (var j = 0; j < height; j++) {
                    var key = this.createKey(i, j);
                    this.xyRegister.set(key, new Array<any>())
                }
            }
        }
    }

    public add(X: number, Y: number, entity: Entity) {
        if(entity.entityID == undefined){
            this.generateEntityID(entity);
        }
        this.entityRegister.set(entity.entityID,entity);
        if (!this.xyRegister.has(this.createKey(X, Y))) {
            this.xyRegister.set(this.createKey(X, Y), new Array<Entity>())
        }
        this.xyRegister.get(this.createKey(X, Y)).push(entity);
    }


    public getByXY(X: number, Y: number): Array<Entity> {
        return this.xyRegister.get(this.createKey(X, Y))
    }


    public getByEntityID(entityID:number):any{
        return this.entityRegister.get(entityID);
    }


    public remove(entityID: number, X?: number, Y?: number): boolean {
        this.entityRegister.delete(entityID);
        var removed = false
        if (X != undefined && Y != undefined) {
            var temp: Array<Entity> = this.xyRegister.get(this.createKey(X, Y))
            var i_item: number = temp.findIndex(function (o: Entity) {
                if (o.entityID == entityID) {
                    return true
                }
                return false;
            })
            if (i_item == undefined) {
                console.error("could not find item for deletion! falling through to searching entire entityMap")
            } else {
                temp.splice(i_item, 1);
                return true;
            }
        }
        this.xyRegister.forEach(function(value:Entity[]){
          var i_item : number = value.findIndex(function(o:Entity){
            if(o.entityID == entityID) return true;
          }) 
          if(i_item != undefined){
              value.splice(i_item,1)
              removed = true;
              return 
          }
        })
        return removed
    }


    private currentID: number = 0;
    private generateEntityID(entity: Entity) {
        entity.entityID = this.currentID++;
    }


    private createKey(X: number, Y: number): string {
        return X + ":" + Y;
    }
}