import { Hex, MountainHex } from './Terrain/'
import * as _ from "lodash";

export class Map {
    private map: Array<Array<Hex>>
    private height: number;
    private width: number;

    constructor(map: Array<Array<number>>) {
        this.width = map.length;
        this.height = map[map.length - 1].length;
        var deadSquares = this.height / 2;
        this.map = new Array<Array<Hex>>(this.width + deadSquares)
        for(var x = 0 ; x < map.length ; x++){
            for(var y = 0 ; y < map[x].length ; y++){
                
                //horizontal
                var R = -Math.floor(x / 2)+y
                
                //vertical
                var Q = y
                
                /**
                 * first f[] = -floor(r / 2)
                 * col = q + r / 2
                 * row = r
                 */
                var tempHex = new MountainHex()
                this.map[x][y] = tempHex;
            }
        }
        
    }



    static Serialize(): string {
        return "";
    }

    static deserialize(): Array<Array<Hex>> {
        return 
    }
}