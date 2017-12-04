import {Entity} from "../Entity"
import { FlatlandTerrain } from "../Terrain";
import {BaseTerrain,ITerrain,Hex} from "./"
export class MountainTerrain implements ITerrain{
    
    public static terrainName:string = "mountain"
    public static height : number = 3
    public static radius : number = 1
    radius():number{return MountainTerrain.radius}
    
    height = ():number => {
        return MountainTerrain.height
    }
    
    public TerrainName = ():string => {
        return MountainTerrain.terrainName
    }
}