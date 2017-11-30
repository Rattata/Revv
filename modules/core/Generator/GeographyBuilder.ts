import {Distribution} from "./Distribution"
import { Hex, WaterHex } from "modules/core/Terrain";
export class GeographyBuilder {

    hexX: number = 26;
    hexY: number = 26;
    R: number = 15;
    offset: number = 15;
    width: number = this.R * 2;
    dist: number = this.width * (3 / 4)
    height: number = (Math.sqrt(3) / 2) * this.width

    lerps: number = 1;


    static water: Array<any> = [1, 20, '#2E86C1', 'water'];
    static flatland: Array<any> = [2, 0, '#DAF7A6', 'flatland'];
    static mountain: Array<any> = [3, 20, '#BA4A00', 'mountain'];
    static predist: Array<any> = [GeographyBuilder.water, GeographyBuilder.flatland, GeographyBuilder.mountain]

    private map : Array<Array<any>>;
    private distribution: Array<any>;
    // width
    // height
    // map
    // distribution
    // voronoi points
    constructor(width, height, distribution) {
        this.height = height;
        this.distribution = distribution;
        this.width = width;
        this.map = new Array(width)
        for (var x = 0; x < width; x++) {
            this.map[x] = new Array(height);
            for (var y = 0; y < height; y++) {
                this.map[x][y] = distribution[Math.round(Math.random() * (distribution.length - 1))];
            }
        }
    }

    static isvalid(map, x, y) : boolean {
        return (x >= 0 && x < map.length) &&
            (y >= 0 && y < map[0].length) ?
            true : false;
    }

    voronoi(randomPoints) : GeographyBuilder {
        var randomStore = new Array(randomPoints);
        for (var i = 0; i < randomPoints; i++) {
            var rX = Math.round(Math.random() * this.map.length);
            var rY = Math.round(Math.random() * this.map[rX].length);
            randomPoints[i] = [rX, rY]
        }
        return this
    }

    delauney() : GeographyBuilder {
        return this
    }

    static smooth(level_map, smooth_strength = 0.4) :Array<Array<any>>{
        var smooth_level_map = new Array(level_map.length)
        for (var lx = 0; lx < level_map.length; lx++) {
            smooth_level_map[lx] = new Array(level_map[0].length)
            for (var ly = 0; ly < level_map[lx].length; ly++) {
                //get neighbours
                /*
                y + 1
                y - 1
                x + 1, y + 1
                x - 1, y + 1
                x + 1
                x - 1
                */
                var temp = [];
                temp.push(level_map[lx][ly])
                if (GeographyBuilder.isvalid(level_map, lx, ly + 1)) {
                    temp.push(level_map[lx][ly + 1] * smooth_strength);
                }
                if (GeographyBuilder.isvalid(level_map, lx, ly - 1)) {
                    temp.push(level_map[lx][ly - 1] * smooth_strength);
                }
                if (GeographyBuilder.isvalid(level_map, lx + 1, ly + 1)) {
                    temp.push(level_map[lx + 1][ly + 1] * smooth_strength);
                }
                if (GeographyBuilder.isvalid(level_map, lx - 1, ly + 1)) {
                    temp.push(level_map[lx - 1][ly + 1] * smooth_strength);
                }
                if (GeographyBuilder.isvalid(level_map, lx + 1, ly)) {
                    temp.push(level_map[lx + 1][ly] * smooth_strength);
                }
                if (GeographyBuilder.isvalid(level_map, lx - 1, ly)) {
                    temp.push(level_map[lx - 1][ly] * smooth_strength);
                }
                //smooth neighbours
                var temp_total = 0;
                temp.forEach(element => {
                    temp_total += element
                });
                temp_total /= 1 + ((temp.length - 1) * smooth_strength);

                smooth_level_map[lx][ly] = Math.round(temp_total)
            }
        }
        return smooth_level_map
    }

    smooth(strength = 0.5) : GeographyBuilder{
        this.map = GeographyBuilder.smooth(this.map, strength)
        return this;
    }

    ///generate a random map with distribution, then interpolate to map at large
    noise(width, height, distribution = this.distribution, smooth = 0): GeographyBuilder {
        var lerpX = width;
        var lerpY = height;
        var tempmap = new Array(lerpX);
        for (var lx = 0; lx < tempmap.length; lx++) {
            tempmap[lx] = new Array(lerpY);
            for (var ly = 0; ly < tempmap[lx].length; ly++) {
                tempmap[lx][ly] = distribution[Math.round(Math.random() * (distribution.length - 1))]
            }
        }
        if (smooth != 0) {
            GeographyBuilder.smooth(tempmap, smooth);
        }

        var ratiox = this.map.length / tempmap.length;
        var ratioy = this.map[0].length / tempmap[0].length;
        for (var lx = 0; lx < this.map.length; lx++) {
            for (var ly = 0; ly < this.map[lx].length; ly++) {
                this.map[lx][ly] = tempmap[Math.floor(lx / ratiox)][Math.floor(ly / ratioy)] + this.map[lx][ly];
            }
        }
        this.lerps++;
        return this;
    }

    build() {
        var distributeMap = new Array<Array<number>>(this.map.length);
        for (var lx = 0; lx < this.map.length; lx++) {
            distributeMap[lx] = new Array<number>(this.map[lx].length);
            for (var ly = 0; ly < this.map[lx].length; ly++) {
                distributeMap[lx][ly] = Math.round(this.map[lx][ly] / this.lerps)
            }
        }
        return distributeMap;
    }
}