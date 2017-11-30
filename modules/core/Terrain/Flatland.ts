import { Hex } from "./Hex";

import {ITerrain} from "./ITerrain"
class FlatlandHex extends Hex{
    public static color: string = "#DAF7A6";
    public static height: number = 2;
    public static renderheight: number = 2;
    public static terrainName : string = "flatland"
}

export {FlatlandHex}