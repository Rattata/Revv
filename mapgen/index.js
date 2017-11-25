//import { map } from "bluebird";

var hexX = 26;
var hexY = 26;
var R = 15;
var offset = 15;
var mywidth = R * 2;
var mydist = mywidth * (3 / 4)
var myheight = (Math.sqrt(3) / 2) * mywidth

var levels = 4;

var water = [1, 20, '#2E86C1', 'water'];
var flatland = [2, 0, '#DAF7A6', 'flatland'];
var mountain = [3, 20, '#BA4A00', 'mountain'];
var predist = [water, flatland, mountain]

var distribution = (function () {
    var dist = []
    predist.forEach(element => {
        for (var i = 0; i < element[1]; i++) {
            dist.push(element[0]);
        }
    });
    return dist;
})()

class GeographyBuilder {
    // width
    // height
    // map
    // distribution
    constructor(width, height, distribution) {
        this.height = height;
        this.distribution = distribution;
        this.width = width;
        this.lerps = 1;
        this.map = new Array(width)
        for (var x = 0; x < width; x++) {
            this.map[x] = new Array(height);
            for (var y = 0; y < height; y++) {
                this.map[x][y] = distribution[Math.round(Math.random() * (distribution.length - 1))];
            }
        }
    }

    static isvalid(x, y) {
        return (x >= 0 && x < map.length) &&
            (y >= 0 && y < map[0].length) ?
            true : false;
    }

    static smooth(level_map = map, smooth_strength = 0.4) {
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

    smooth(strength = 0.5){
        this.map = GeographyBuilder.smooth(this.map,strength)
        return this;
    }

    ///generate a random map with distribution, then interpolate to map at large
    noise(width, height, distribution = distribution, smooth = 0) {
        var lerpX = width;
        var lerpY = height;
        var tempmap = new Array(lerpX);
        for (var lx = 0; lx < tempmap.length; lx++) {
            tempmap[lx] = new Array(lerpY);
            for (var ly = 0; ly < tempmap[lx].length; ly++) {
                tempmap[lx][ly] = distribution[Math.round(Math.random() * (distribution.length - 1))]
            }
        }
        if(smooth != 0){
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

    build(){
        for (var lx = 0; lx < this.map.length; lx++) {
            for (var ly = 0; ly < this.map[lx].length; ly++) {
                this.map[lx][ly] = Math.round(this.map[lx][ly] / this.lerps);
            }
        }
        return this.map;
    }
}


var mapped = new GeographyBuilder(hexX,hexY,distribution)
.noise(4,4,distribution,0.5)
.noise(7,7,distribution,0.3)
.noise(9,9,distribution,0.25)
.smooth(0.25).build();


function setup() {
    createCanvas(1800, 700);
}

function draw() {
    background(102);

    for (var i = 0; i < hexX; i++) {
        for (var j = 0; j < hexY; j++) {

            let reminderY = (i % 2) == 0 ? (1 / 2 * myheight) : 0;

            push();
            noStroke()
            fill(predist[mapped[i][j] - 1][2])
            polygon((i * mydist) + offset, (j * myheight) + reminderY + offset, R, 6);
            pop();
        }
    }

    for (var i = 0; i < hexX; i++) {
        for (var j = 0; j < hexY; j++) {

            let reminderY = (i % 2) == 0 ? (1 / 2 * myheight) : 0;

            push();
            noStroke()
            fill(predist[mapped[hexX - i - 1][hexY - j - 1] - 1][2])
            polygon((i * mydist) + 40 * R, (j * myheight) + reminderY + offset, R, 6);
            pop();
        }
    }
}

function polygon(x, y, radius, npoints) {
    var angle = TWO_PI / npoints;
    beginShape();
    for (var a = 0; a < TWO_PI; a += angle) {
        var sx = x + cos(a) * radius;
        var sy = y + sin(a) * radius;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}


