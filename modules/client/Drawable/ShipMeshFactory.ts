export class ShipMeshFactory {
    shipMesh(scene:BABYLON.Scene, name:string){
        var polyhedron = {
            "name": name,
            "category": ["Diamond"],
            "vertex": [[0,0,1], [0,0,-1], [1,0,0], [-1,0,0], [0,1,0], [0,-1,0],],
            "face": [[0,2,4],[0,4,3],[0,3,5],[0,5,2],[1,2,4],[1,4,3],[1,3,5],[1,5,2]]
        }
        var polygon = BABYLON.MeshBuilder.CreatePolyhedron(polyhedron.name, { custom: polyhedron}, scene);
        polygon.convertToFlatShadedMesh();
        polygon.enableEdgesRendering();
        return polygon
    }
}