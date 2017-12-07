import { Hex } from "../../core/Terrain";
import { RenderTerrain } from "./RenderableTerrain/RenderTerrain";
import {IHasInstancedMesh} from "./"

export class RenderHex extends Hex implements IHasInstancedMesh {
    private renderTerrainType : RenderTerrain;
    getTerrainType():RenderTerrain{return this.renderTerrainType}
    getInstancedMesh():BABYLON.InstancedMesh{
        console.log("getting mesh")
        return this.mesh
    }
    private mesh : BABYLON.InstancedMesh
    constructor(renderTerrainType:RenderTerrain,Q? : number, R? : number, _S? : number, _X?:number, _Y?:number) {
        super(Q,R,_S,_X,_Y)
        this.renderTerrainType = renderTerrainType

    }
}