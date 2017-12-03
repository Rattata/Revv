import { Hex } from "../../core/Terrain";

export interface IRenderTerrain {
    getMesh() : BABYLON.InstancedMesh
    getHex(): Hex
}