import { Hex } from "./Hex";
import {Entity} from "../Entity"
import {ITerrain} from "./ITerrain"
import { FlatlandHex } from "../Terrain";

class WaterHex extends Hex implements ITerrain{
    public container: Array<Entity> = new Array<Entity>()
    public static height: number= 1
    height():number {
        return FlatlandHex.height
    }
    public static terrainName:string = "water"
    public TerrainName = ():string => {return WaterHex.terrainName}
}

export {WaterHex}