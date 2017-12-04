import { Hex, MountainTerrain, WaterTerrain, FlatlandTerrain, ITerrain } from './Terrain/'
import * as _ from "lodash";

/** stores geography data in XY -axial- format */
export class Map {
    private map: Array<Array<Hex>>
    private height: number;
    private width: number;
    public MountainTerrain : ITerrain 
    public WaterTerrain : ITerrain
    public FlatTerrain : ITerrain
    constructor(heightmap: Array<Array<number>>) {
        
        console.log(heightmap)
        this.map = new Array<Array<Hex>>(heightmap.length)
        this.MountainTerrain = new MountainTerrain();
        this.WaterTerrain = new WaterTerrain();
        this.FlatTerrain = new FlatlandTerrain();

        for(var x = 0 ; x < heightmap.length ; x++){
            this.map[x] = new Array();
            for(var y = 0 ; y < heightmap[x].length ; y++){
                //horizontal
                var R = -Math.floor(x / 2) - y
                var Rmap = R
                
                //vertical
                var Q = y
                var tempHex : Hex = new Hex(Q,R, -Q-R,x,y)
                
                switch (heightmap[x][y]){
                    case 1 : {
                        tempHex.terrainType = this.WaterTerrain
                        break;
                    }
                    case 2: {
                        tempHex.terrainType = this.FlatTerrain
                        break;
                    }
                    case 3: {
                        tempHex.terrainType = this.MountainTerrain
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