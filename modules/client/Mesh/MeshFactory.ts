import { RenderFlat, RenderWater, RenderMountain } from "../Drawable";
export class MeshFactory {

    public static hexRadius: () => number = () => { return 1 };
    public static hexWidth: () => number = () => { return (MeshFactory.hexRadius() * 2) };
    public static hexHeight: () => number = () => { return (Math.sqrt(3) / 2 * MeshFactory.hexWidth()) }
    public static hexDistance: () => number = () => { return MeshFactory.hexWidth() * (3 / 4) };

    public static createHexPrism(radius, height, name, scene): BABYLON.Mesh {
        var points = []
        for (var c = 0; c < 6; c++) {
            var angle_deg = 60 * c
            var angle_rad = Math.PI / 180 * angle_deg
            points.push([this.hexRadius() * Math.cos(angle_rad), this.hexRadius() * Math.sin(angle_rad), 0])
            points.push([this.hexRadius() * Math.cos(angle_rad), this.hexRadius() * Math.sin(angle_rad), height])
        }
        var polyhedron = {
            "name": name,
            "category": ["Prism"],
            "vertex": points,
            "face": [[2, 3, 1, 0], [4, 5, 3, 2], [6, 7, 5, 4], [8, 9, 7, 6], [10, 11, 9, 8], [0, 1, 11, 10], [10, 8, 6, 4, 2, 0], [1, 3, 5, 7, 9, 11]]
        }
        var polygon = BABYLON.MeshBuilder.CreatePolyhedron(polyhedron.name, { custom: polyhedron }, scene);
        polygon.convertToFlatShadedMesh();
        return polygon
    }
}