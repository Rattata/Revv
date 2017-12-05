import { Hex } from "../../core/Terrain";
import { IRenderTerrain } from "./RenderableTerrain/IRenderTerrain";

export class RenderHex extends Hex {
    private renderTerrainType : IRenderTerrain;
    getTerrainType():IRenderTerrain{return this.renderTerrainType}
    public mesh : BABYLON.InstancedMesh
    constructor(renderTerrainType:IRenderTerrain,Q? : number, R? : number, _S? : number, _X?:number, _Y?:number) {
        super(Q,R,_S,_X,_Y)
        this.renderTerrainType = renderTerrainType

    }
}