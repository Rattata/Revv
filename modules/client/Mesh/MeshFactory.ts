import { WaterHex, MountainHex, FlatlandHex } from "../../core/Terrain"
export class MeshFactory {
    public static hR: () => number  = () => {return 1};
    public static hwidth:() => number = () => {return ( 4)}  ;
    public static hdist: () => number  = () => { return MeshFactory.hwidth() * (3 / 4)};
    public static hheight: () => number = () => {return  (Math.sqrt(3) / 2) * MeshFactory.hwidth()}



    private static genpolygon(radius, height, npoints) {
        var angle = (Math.PI * 2) / npoints;
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

    static MountainMesh(scene: BABYLON.Scene): BABYLON.Mesh {
        var polyhedron = {
            "name": MountainHex.terrainName,
            "category": ["Prism"],
            "vertex": MeshFactory.genpolygon(MeshFactory.hR(), MountainHex.renderheight, 6),
            "face": [[2, 3, 1, 0], [4, 5, 3, 2], [6, 7, 5, 4], [8, 9, 7, 6], [10, 11, 9, 8], [0, 1, 11, 10], [10, 8, 6, 4, 2, 0], [1, 3, 5, 7, 9, 11]]
        }
        var polygon = BABYLON.MeshBuilder.CreatePolyhedron(polyhedron.name, { custom: polyhedron, size: 2 }, scene);
        polygon.convertToFlatShadedMesh();
        polygon.scaling = new BABYLON.Vector3(1,1,1);
        return polygon
    }

    static WaterMesh(scene: BABYLON.Scene): BABYLON.Mesh {

        var polyhedron = {
            "name": WaterHex.terrainName,
            "category": ["Prism"],
            "vertex": MeshFactory.genpolygon(MeshFactory.hR(), WaterHex.renderheight, 6),
            "face": [[2, 3, 1, 0], [4, 5, 3, 2], [6, 7, 5, 4], [8, 9, 7, 6], [10, 11, 9, 8], [0, 1, 11, 10], [10, 8, 6, 4, 2, 0], [1, 3, 5, 7, 9, 11]]
        }
        var polygon = BABYLON.MeshBuilder.CreatePolyhedron(polyhedron.name, { custom: polyhedron, size: 2 }, scene);
        polygon.convertToFlatShadedMesh();
        polygon.enableEdgesRendering();
        
        polygon.scaling = new BABYLON.Vector3(1,1,1);
        return polygon
    }

    static FlatlandMesh(scene: BABYLON.Scene): BABYLON.Mesh {
        var polyhedron = {
            "name": FlatlandHex.terrainName,
            "category": ["Prism"],
            "vertex": MeshFactory.genpolygon(MeshFactory.hR(), FlatlandHex.renderheight, 6),
            "face": [[2, 3, 1, 0], [4, 5, 3, 2], [6, 7, 5, 4], [8, 9, 7, 6], [10, 11, 9, 8], [0, 1, 11, 10], [10, 8, 6, 4, 2, 0], [1, 3, 5, 7, 9, 11]]
        }
        var polygon = BABYLON.MeshBuilder.CreatePolyhedron(polyhedron.name, { custom: polyhedron, size: 2 }, scene);
        polygon.convertToFlatShadedMesh();
        polygon.enableEdgesRendering();
        polygon.edgesWidth = 1
        polygon.scaling = new BABYLON.Vector3(1,1,1);
        return polygon
    }

}