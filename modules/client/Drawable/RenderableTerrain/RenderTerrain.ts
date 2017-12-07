import { Hex, ITerrain } from "../../../core/Terrain";
import {inject, injectable} from "inversify"
import { GameScene} from "../../Scenes/GameScene";
import { CLIENT_TYPES } from "../../clienttypes";
import { MeshFactory } from "../../Mesh";

@injectable()
export abstract class RenderTerrain{
    private masterMesh : BABYLON.Mesh
    private material : BABYLON.Material
    private scene : GameScene
    
    protected  radius:number = 1
    
    protected iterrain : ITerrain 
    protected  renderHeight : number
    protected  diffuseColor: BABYLON.Color3
    protected  specularColor: BABYLON.Color3
    protected  emissiveColor: BABYLON.Color3
    protected  ambientColor: BABYLON.Color3 
    protected  bumpTextureURL: string

    constructor(@inject(CLIENT_TYPES.GameScene) GameScene : GameScene){
        this.scene = GameScene
        // this.render()
    }

    protected render(){
        this.masterMesh = this.createMasterMesh();
        this.material = this.createMaterial();
        this.masterMesh.material = this.material
    }

    public getITerrain() : ITerrain {
        return this.iterrain
    }

    private createMasterMesh() : BABYLON.Mesh{
        var mastermesh = MeshFactory.createHexPrism(this.radius, this.getRenderHeight(), this.iterrain.TerrainName(), this.scene);
        mastermesh.setEnabled(false)
        return mastermesh
    }

    public getInstancedMesh(entityID:number) : BABYLON.InstancedMesh {
        return this.masterMesh.createInstance(entityID.toString())
    }

    private createMaterial() : BABYLON.Material {
        var material = new BABYLON.StandardMaterial(this.iterrain.TerrainName(), this.scene);
        if(this.specularColor != undefined ) material.specularColor = this.specularColor;
        if(this.specularColor != undefined ) material.diffuseColor = this.diffuseColor;
        if(this.specularColor != undefined ) material.emissiveColor = this.emissiveColor;
        if(this.specularColor != undefined ) material.bumpTexture = new BABYLON.Texture(this.bumpTextureURL, this.scene, false, false, BABYLON.Texture.NEAREST_SAMPLINGMODE);
        return material
    }
    
    getRenderHeight() : number{
        return this.renderHeight
    }
}