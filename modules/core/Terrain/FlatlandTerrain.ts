import {Entity} from "../Entity"
import {BaseTerrain,ITerrain,Hex} from "./"

export class FlatlandTerrain implements ITerrain{
    
    public static radius : number = 1
    radius():number{return FlatlandTerrain.radius}

    public static height : number = 2
    height():number {
        return FlatlandTerrain.height
    }
    public static terrainName:string = FlatlandTerrain.name
    public TerrainName = ():string => {return FlatlandTerrain.terrainName}
}