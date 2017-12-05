import { Hex, ITerrain } from "../../../core/Terrain";

export interface IRenderTerrain extends ITerrain{
    getInstancedMesh(scene:BABYLON.Scene, entityID:number) : BABYLON.InstancedMesh
    getMaterial(scene:BABYLON.Scene) : BABYLON.Material
    renderHeight() : number
}