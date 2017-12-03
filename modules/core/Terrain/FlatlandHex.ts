import { Hex } from "./Hex";
import {Entity} from "../Entity"
import {ITerrain} from "./ITerrain"

export class FlatlandHex extends Hex implements ITerrain{
    public static height : number = 2
    height():number {
        return FlatlandHex.height
    }
    public static terrainName:string = "flat"
    public container: Array<Entity> = new Array<Entity>() 
    public TerrainName = ():string => {return FlatlandHex.terrainName}
}