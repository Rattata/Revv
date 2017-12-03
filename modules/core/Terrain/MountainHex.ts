import { Hex } from "./Hex";
import {ITerrain} from "./ITerrain"
import {Entity} from "../Entity"
class MountainHex extends Hex implements ITerrain{
    public static terrainName:string = "mountain"
    public static height : number = 3
    
    height():number {
        return MountainHex.height
    }
    public container: Array<Entity> = new Array<Entity>() 
    public TerrainName = ():string => {return MountainHex.terrainName}
}

export {MountainHex}