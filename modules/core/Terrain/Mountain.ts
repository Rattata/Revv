import { Hex } from "./Hex";
import {ITerrain} from "./ITerrain"

class MountainHex extends Hex{
    public static color: string = "#BA4A00";
    public static height: number = 5;
    public static terrainName:string = "mountain"
}

export {MountainHex}