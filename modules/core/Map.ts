import { Hex, MountainHex, WaterHex, FlatlandHex } from './Terrain/'
import * as _ from "lodash";

/** stores geography data in XY -axial- format */
export class Map {
    private map: Array<Array<Hex>>
    private height: number;
    private width: number;
    
    constructor(heightmap: Array<Array<number>>) {
        
        console.log(heightmap)
        this.map = new Array<Array<Hex>>(heightmap.length)
        for(var x = 0 ; x < heightmap.length ; x++){
            this.map[x] = new Array();
            for(var y = 0 ; y < heightmap[x].length ; y++){
                //horizontal
                var R = -Math.floor(x / 2) - y
                var Rmap = R
                
                //vertical
                var Q = y
                var tempHex : Hex = undefined
                
                switch (heightmap[x][y]){
                    case 1 : {
                        tempHex = new WaterHex(Q,R, -Q-R,x,y)
                        break;
                    }
                    case 2: {
                        tempHex = new FlatlandHex(Q,R, -Q-R,x,y)
                        break;
                    }
                    case 3: {
                        tempHex = new MountainHex(Q,R, -Q-R, x,y)
                        break;
                    }
                    default: {
                        console.error("default fallthrough")
                        // console.error([Q,R, heightmap[x][y]])
                    }
                }
                this.map[x][y] = tempHex;
            }
        }
        
    }

    getMap = () : Array<Array<Hex>> => {return this.map}


    static Serialize(): string {
        return "";
    }

    static deserialize(): Array<Array<Hex>> {
        return 
    }
}