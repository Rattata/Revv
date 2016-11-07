/// <references path="./IMap.ts" />
/*
Hexagonal grid. For reference, http://www.redblobgames.com/grids/hexagons/
*/
var Map = (function () {
    function Map(X, Y) {
        var borderX = X + 2;
        var borderY = Y + 2;
        var maximumOffset = Math.floor(borderX / 2);
        //setup first rows
        var first_col = new Array();
        for (var row = 0; row < borderX; row++) {
            first_col[row] = -Math.floor(row / 2);
        }
        ;
        this.map = new Array(borderX);
        for (var row = 0; row < this.map.length; row++) {
            this.map[row] = new Array(borderY + (borderX / 2));
        }
        for (var row = 0; row < first_col.length; row++) {
            var Q = 0;
            for (var col = first_col[row] + maximumOffset; col < borderY + first_col[row] + maximumOffset; col++) {
                this.map[row][col] = new Hex(Q + first_col[row], row, 1);
                var H = 0.3 * Math.floor(Math.random() * 5);
                this.map[row][col]._H = H;
                Q++;
            }
        }
        //this.printmap(this.map);
        //console.log(this.map);
    }
    Map.prototype.getHexs = function () {
        var retHexes = new Array();
        for (var i = 0; i < this.map.length; i++) {
            for (var j = 0; j < this.map[i].length; j++) {
                if (this.map[i][j] !== undefined) {
                    retHexes.push(this.map[i][j]);
                }
            }
        }
        return retHexes;
    };
    ;
    Map.prototype.getHex = function (R, Q) {
        return this.map[R][Q + R / 2];
    };
    ;
    Map.prototype.printmap = function () {
        var printval = "";
        for (var u = 0; u < this.map.length; u++) {
            for (var y = 0; y < this.map[u].length; y++) {
                if (this.map[u][y] != undefined) {
                    printval = printval.concat(String(this.map[u][y]._H).substr(0, 3).concat('\t'));
                }
                else {
                    printval = printval.concat('000 \t');
                }
            }
            printval = printval.concat("\n");
        }
        console.log(printval);
    };
    return Map;
}());
//# sourceMappingURL=Map.js.map