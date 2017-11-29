import { Hex } from './Terrain/'

export class Map {
    borderX: number; borderY: number;
    map;
    constructor(map : Array<Array<Hex>>) {
        this.map = map
    }


    getHexs() {
        var retHexes = new Array()
        for (var i = 0; i < this.map.length; i++) {
            for (var j = 0; j < this.map[i].length; j++) {
                if (this.map[i][j] !== undefined) {
                    retHexes.push(this.map[i][j])
                }
            }
        }
        return retHexes
    }

    getHex(R, Q) {
        return this.map[R][Q + R / 2]
    }

    printmap() {
        var printval = ""
        for (var u = 0; u < this.map.length; u++) {
            for (var y = 0; y < this.map[u].length; y++) {
                if (this.map[u][y] != undefined) {
                    printval = printval.concat(String(this.map[u][y]._H).substr(0, 3).concat('\t'))
                }
                else {
                    printval = printval.concat('000 \t')
                }
            }
            printval = printval.concat("\n")
        }
        console.log(printval)
    }

    static Deserialize(array : Array<Hex>[][]){

    }

    static Serialize () : Array<Hex> {
        return new Array<Hex>();
    }
}