import { Hex, FlatlandTerrain, ITerrain } from "../../../core/Terrain";
import { RenderTerrain } from "./RenderTerrain"
import { MeshFactory } from "../../Mesh/MeshFactory"
import { GameScene } from "../../Scenes/GameScene";
import { inject, injectable } from "inversify"
import { CLIENT_TYPES } from "../../clienttypes";
import "reflect-metadata";

@injectable()
export class RenderFlat extends RenderTerrain {
    
    constructor( @inject(CLIENT_TYPES.GameScene) GameScene: GameScene) {
        super(GameScene)
        this.iterrain = new FlatlandTerrain()
        this.renderHeight = 2;
        // this.diffuseColor = BABYLON.Color3.FromHexString("#DAF7A6");
        // this.specularColor = new BABYLON.Color3(0, 0, 0);
        // this.emissiveColor = new BABYLON.Color3(0, 0, 0);
        // this.ambientColor = new BABYLON.Color3(0, 0, 0);
        this.bumpTextureURL = "/res/n_dot.png";
        this.render()
    }
}