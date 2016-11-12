 import {Hex} from '../../core/Hex'

     var maxHeight = 5
     function generateMap(X : number, Y:number){
         var borderX = X + 2
        var borderY = Y + 2
        var map : Array<Array<Hex>>
        var maximumOffset = Math.floor(borderX / 2)
        //setup first rows
        var first_col = new Array()
        for (var row = 0; row < this.borderX; row++) {
            first_col[row] = -Math.floor(row / 2)
        }

        map = new Array(borderX)
        for (var row = 0; row < map.length; row++) {
            map[row] = new Array(borderY + (borderX / 2))
        }
        for (var row = 0; row < first_col.length; row++) {
            var Q = 0
            for (var col = first_col[row] + maximumOffset; col < borderY + first_col[row] + maximumOffset; col++) {
                map[row][col] = new Hex(Q + first_col[row], row, 1)
                var H = Math.floor(Math.random() * maxHeight)
                map[row][col]._H = H
                Q++
            }
        }
        return map;
     }
     export default generateMap
 