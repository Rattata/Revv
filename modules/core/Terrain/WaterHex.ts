import { Hex } from "./Hex";

import {ITerrain} from "./ITerrain"
class WaterHex extends Hex{
    public static color: string = '#2E86C1';
    public static height: number = 1;
    public static RenderHeight: number = 1;
    public static terrainName:string = "water"
    public TerrainName = ():string => {return WaterHex.terrainName}
}

export {WaterHex}