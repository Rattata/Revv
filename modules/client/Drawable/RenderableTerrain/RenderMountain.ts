import { Hex, MountainTerrain, ITerrain } from "../../../core/Terrain";
import { RenderTerrain } from "./RenderTerrain"
import { MeshFactory } from "../../Mesh/MeshFactory"
import { GameScene } from "../../Scenes/GameScene";
import { CLIENT_TYPES } from "../../clienttypes";
import {inject, injectable} from "inversify"
import "reflect-metadata";

@injectable()
export class RenderMountain extends RenderTerrain {
   
    
    constructor(@inject(CLIENT_TYPES.GameScene) GameScene : GameScene){
        super(GameScene)
        this.iterrain = new MountainTerrain()
        this.renderHeight = 3;
        this.diffuseColor = BABYLON.Color3.FromHexString("#BA4A00");
        this.specularColor = new BABYLON.Color3(0, 0, 0);
        this.emissiveColor = new BABYLON.Color3(0, 0, 0);
        this.ambientColor = new BABYLON.Color3(0, 0, 0);
        this.bumpTextureURL = "/res/n_rock.jpg";
        this.render()
    }

}