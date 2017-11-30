import { Hex, MountainHex, WaterHex, FlatlandHex } from './Terrain/'
import * as _ from "lodash";

export class Map {
    private map: Array<Array<Hex>>
    private height: number;
    private width: number;

    constructor(heightmap: Array<Array<number>>) {
        this.width = heightmap.length;
        this.height = heightmap[heightmap.length - 1].length;
        var deadSquares = this.height / 2;
        this.map = new Array<Array<Hex>>(this.width + deadSquares)
        _.fill(this.map,new Array<Hex>(heightmap[0].length));
        for(var x = 0 ; x < heightmap.length ; x++){
            
            for(var y = 0 ; y < heightmap[x].length ; y++){
                
                //horizontal
                var R = -Math.floor(x / 2)+y
                var Rmap = R + deadSquares
                
                //vertical
                var Q = y
                console.log([R,Q])
                var tempHex = undefined
                
                switch (heightmap[x][y]){
                    case 1 : {
                        tempHex = new WaterHex(Q,R, -Q-R)
                        break;
                    }
                    case 2: {
                        tempHex = new FlatlandHex(Q,R, -Q-R)
                        break;
                    }
                    case 3: {
                        tempHex = new MountainHex(Q,R, -Q-R)
                        break;
                    }
                    default: {
                        console.error("default fallthrough")
                        console.error([Q,R])

                    }
                }
                this.map[Rmap][Q] = tempHex;
            }
        }
        console.log(this.map)
        
    }



    static Serialize(): string {
        return "";
    }

    static deserialize(): Array<Array<Hex>> {
        return 
    }
}