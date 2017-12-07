import { Hex, WaterTerrain, ITerrain } from "../../../core/Terrain";
import { RenderTerrain } from "./RenderTerrain"
import { MeshFactory } from "../../Mesh/MeshFactory"
import { GameScene } from "../../Scenes/GameScene";
import {inject, injectable} from "inversify"
import { CLIENT_TYPES } from "../../clienttypes";
import "reflect-metadata";

@injectable()
export class RenderWater extends RenderTerrain {
    
    constructor(@inject(CLIENT_TYPES.GameScene) GameScene : GameScene){
        super(GameScene)
        this.iterrain = new WaterTerrain()
        this.renderHeight = 1
        this.diffuseColor = BABYLON.Color3.FromHexString("#2E86C1");
        this.emissiveColor = new BABYLON.Color3(0, 0, 0);
        this.specularColor = BABYLON.Color3.FromHexString("#4facea");
        this.ambientColor = new BABYLON.Color3(0, 0, 0);
        this.bumpTextureURL = "/res/n_ripple.png";
        this.render()
    }
    

}