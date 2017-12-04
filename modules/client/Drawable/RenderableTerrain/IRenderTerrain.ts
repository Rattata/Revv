import { Hex } from "../../../core/Terrain";
import { ITerrain } from "modules/core/Terrain/ITerrain";

export interface IRenderTerrain {
    getMesh(scene:BABYLON.Scene) : BABYLON.InstancedMesh
    getMaterial(scene:BABYLON.Scene) : BABYLON.Material
    parentTerrain() : ITerrain
    renderHeight() : number
    getHex(): Hex
}