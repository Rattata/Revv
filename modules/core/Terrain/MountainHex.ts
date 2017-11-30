import { Hex } from "./Hex";
import {ITerrain} from "./ITerrain"

class MountainHex extends Hex{
    public static Color: string = "#BA4A00";
    public static Height: number = 3;
    public static RenderHeight: number = 5;
    public static terrainName:string = "mountain"
    public TerrainName = ():string => {return MountainHex.terrainName}
}

export {MountainHex}