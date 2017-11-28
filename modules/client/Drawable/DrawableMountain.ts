export class DrawableMountain {
    public height: number = 10;

    public genPrism(radius, height, npoints) {
        var angle = Math.PI * 2 / npoints;
        var points = [];
        for (var a = 0; a < Math.PI * 2; a += angle) {
            var tempP = [];
            var sx = Math.cos(a) * radius;
            var sy = Math.sin(a) * radius;
            tempP.push(sx)
            tempP.push(sy)
            var tempPH = tempP.slice();
            tempP.push(0)
            tempPH.push(height)
            points.push(tempP)
            points.push(tempPH)
        }
        return points
    }


    private _HexagonalPrism = {
        "name": "Hexagonal Prism",
        "category": ["Prism"],
        "vertex": this.genPrism(this.height, 20, 6),
        "face": [[2,3,1,0], [4,5,3,2],[6,7,5,4],[8,9,7,6],[10,11,9,8],[0,1,11,10], [10,8,6,4,2,0], [1, 3, 5, 7, 9, 11]]
    }
}