var hexX = 25;
var hexY = 25;
var R = 15;
var offset = 15;
var mywidth = R * 2;
var mydist = mywidth * (3 / 4)
var myheight = (Math.sqrt(3) / 2) * mywidth

var water = [1, 20, '#2E86C1', 'water'];
var flatland = [2, 0, '#DAF7A6', 'flatland'];
var mountain = [3, 15, '#BA4A00', 'mountain'];
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

function isvalid(level_map, x, y) {
    return (x >= 0 && x < level_map.length) &&
        (y >= 0 && y < level_map[0].length) ?
        true : false;
}

function smooth(level_map, smooth_strength = 1) {
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
            if (isvalid(level_map, lx, ly + 1)) {
                temp.push(level_map[lx][ly + 1] * smooth_strength);
            }
            if (isvalid(level_map, lx, ly - 1)) {
                temp.push(level_map[lx][ly - 1]* smooth_strength);
            }
            if (isvalid(level_map, lx + 1, ly + 1)) {
                temp.push(level_map[lx + 1][ly + 1]* smooth_strength);
            }
            if (isvalid(level_map, lx - 1, ly + 1)) {
                temp.push(level_map[lx - 1][ly + 1]* smooth_strength);
            }
            if (isvalid(level_map, lx + 1, ly)) {
                temp.push(level_map[lx + 1][ly]* smooth_strength);
            }
            if (isvalid(level_map, lx - 1, ly)) {
                temp.push(level_map[lx - 1][ly]* smooth_strength);
            }
            //smooth neighbours
            var temp_total = 0;
            temp.forEach(element => {
                temp_total += element
            });
            temp_total /= 1 + ((temp.length -1) * smooth_strength);

            smooth_level_map[lx][ly] = Math.round(temp_total)
        }
    }
    return smooth_level_map
}

//flat topped; W = 2 R, H = (2/3) R
function generateMap(xsize, ysize, maxHeight, minHeight) {
    //flat topped
    var hwratio = 1 / (Math.sqrt(3) / 2) * xsize;
    var realy = ysize * hwratio;

    var map = new Array(xsize);
    for (var i = 0; i < xsize; i++) {
        map[i] = new Array(ysize)
        for (var j = 0; j < ysize; j++) {
            map[i][j] = distribution[Math.round(Math.random() * (distribution.length - 1))];
        }
    }
    var pre_level = [9, 4, 6]
    for (var levels = 3; levels > 0; levels--) {
        var lerp = pre_level[levels - 1];
        var lerpX = pre_level[levels - 1];
        var lerpY = pre_level[levels - 1];
        var tempmap = new Array(lerpX);
        for (var lx = 0; lx < tempmap.length; lx++) {
            tempmap[lx] = new Array(lerpY);
            for (var ly = 0; ly < tempmap[lx].length; ly++) {
                tempmap[lx][ly] = distribution[Math.round(Math.random() * (distribution.length - 1))]
            }
        }

        var ratiox = map.length / tempmap.length;
        var ratioy = map[0].length / tempmap[0].length;
        for (var lx = 0; lx < map.length; lx++) {
            for (var ly = 0; ly < map[lx].length; ly++) {
                map[lx][ly] = tempmap[Math.floor(lx / ratiox)][Math.floor(ly / ratioy)] + map[lx][ly];
            }
        }
    }

    for(var lx = 0 ; lx < map.length; lx++){
        for(var ly =0 ; ly < map[0].length; ly++){
            map[lx][ly] /= 4;
            map[lx][ly] = Math.round(map[lx][ly]);
        }
    }

    return map;
}
var mapped = generateMap(25, 25, 3, 3);
var mapped2 = smooth(smooth(mapped, 0.25), 0.25)

console.log(mapped)

function setup() {
    createCanvas(1400, 700);
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
            fill(predist[mapped2[i][j] - 1][2])
            polygon((i * mydist) + 50 * R, (j * myheight) + reminderY + offset, R, 6);
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


