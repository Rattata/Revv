import { Hex } from "./Hex";

import {ITerrain} from "./ITerrain"
export class FlatlandHex extends Hex{
    public static color: string = "#DAF7A6";
    public static height: number = 2;
    public static RenderHeight: number = 2;
    public static terrainName:string = "flat"
    public TerrainName = ():string => {return FlatlandHex.terrainName}
}