import { Hex } from "../../core/Terrain";
import { IRenderTerrain } from "./RenderableTerrain/IRenderTerrain";
import {IHasInstancedMesh} from "./"

export class RenderHex extends Hex implements IHasInstancedMesh {
    private renderTerrainType : IRenderTerrain;
    getTerrainType():IRenderTerrain{return this.renderTerrainType}
    getInstancedMesh():BABYLON.InstancedMesh{
        return this.mesh
    }
    public mesh : BABYLON.InstancedMesh
    constructor(renderTerrainType:IRenderTerrain,Q? : number, R? : number, _S? : number, _X?:number, _Y?:number) {
        super(Q,R,_S,_X,_Y)
        this.renderTerrainType = renderTerrainType

    }
}