import { WaterHex, MountainHex, FlatlandHex } from "../../core/Terrain"
export class MeshFactory {

    public static hexRadius: () => number  = () => {return 1};
    public static hexWidth:() => number = () => {return ( MeshFactory.hexRadius() * 2)}  ;
    public static hexHeight: () => number = () => {return  (Math.sqrt(3) / 2 * MeshFactory.hexWidth())}
    public static hexDistance: () => number  = () => { return MeshFactory.hexWidth() * (3/4)};

    private static genHexPrism(radius, height) {
     
        var angle = (Math.PI * 2) / 6;
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

    private static geHexPrism(radius, height){
        var points = []
        for(var c = 0 ;c < 6; c++){
            var angle_deg = 60* c
            var angle_rad = Math.PI / 180 * angle_deg
            points.push([this.hexRadius() * Math.cos(angle_rad),    this.hexRadius() * Math.sin(angle_rad),    0])
            points.push([this.hexRadius() * Math.cos(angle_rad),    this.hexRadius() * Math.sin(angle_rad),    height])
        }
        console.log(points)
        return points;
    }

    static MountainMesh(scene: BABYLON.Scene): BABYLON.Mesh {
        var polyhedron = {
            "name": MountainHex.terrainName,
            "category": ["Prism"],
            "vertex": MeshFactory.geHexPrism(MeshFactory.hexRadius(), MountainHex.RenderHeight),
            "face": [[2, 3, 1, 0], [4, 5, 3, 2], [6, 7, 5, 4], [8, 9, 7, 6], [10, 11, 9, 8], [0, 1, 11, 10], [10, 8, 6, 4, 2, 0], [1, 3, 5, 7, 9, 11]]
        }
        var polygon = BABYLON.MeshBuilder.CreatePolyhedron(polyhedron.name, { custom: polyhedron}, scene);
        polygon.convertToFlatShadedMesh();
        polygon.scaling = new BABYLON.Vector3(1,1,1);
        return polygon
    }

    static WaterMesh(scene: BABYLON.Scene): BABYLON.Mesh {

        var polyhedron = {
            "name": WaterHex.terrainName,
            "category": ["Prism"],
            "vertex": MeshFactory.geHexPrism(MeshFactory.hexRadius(), WaterHex.RenderHeight),
            "face": [[2, 3, 1, 0], [4, 5, 3, 2], [6, 7, 5, 4], [8, 9, 7, 6], [10, 11, 9, 8], [0, 1, 11, 10], [10, 8, 6, 4, 2, 0], [1, 3, 5, 7, 9, 11]]
        }
        var polygon = BABYLON.MeshBuilder.CreatePolyhedron(polyhedron.name, { custom: polyhedron}, scene);
        polygon.convertToFlatShadedMesh();
        polygon.enableEdgesRendering();
        
        polygon.scaling = new BABYLON.Vector3(1,1,1);
        return polygon
    }

    static FlatlandMesh(scene: BABYLON.Scene): BABYLON.Mesh {
        var polyhedron = {
            "name": FlatlandHex.terrainName,
            "category": ["Prism"],
            "vertex": MeshFactory.geHexPrism(MeshFactory.hexRadius(), FlatlandHex.RenderHeight),
            "face": [[2, 3, 1, 0], [4, 5, 3, 2], [6, 7, 5, 4], [8, 9, 7, 6], [10, 11, 9, 8], [0, 1, 11, 10], [10, 8, 6, 4, 2, 0], [1, 3, 5, 7, 9, 11]]
        }
        var polygon = BABYLON.MeshBuilder.CreatePolyhedron(polyhedron.name, { custom: polyhedron}, scene);
        polygon.convertToFlatShadedMesh();
        polygon.enableEdgesRendering();
        polygon.edgesWidth = 1
        polygon.scaling = new BABYLON.Vector3(1,1,1);
        return polygon
    }

}