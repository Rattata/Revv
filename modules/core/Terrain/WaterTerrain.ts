import {Entity} from "../Entity"
import { FlatlandTerrain } from "../Terrain";
import {BaseTerrain,ITerrain,Hex} from "./"

export class WaterTerrain implements ITerrain{
    
    public static radius : number = 1
    radius():number{return WaterTerrain.radius}
    
    public static height: number= 1
    public static color : string = ""
    height():number {
        return WaterTerrain.height
    }
    public static terrainName:string = "water"
    public TerrainName = ():string => {return WaterTerrain.terrainName}
}