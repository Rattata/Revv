import {MountainHex} from "../../core/Terrain/MountainHex"
import { IRenderTerrain } from "./IRenderTerrain";
import { Hex } from "../../core/Terrain";
import { MeshFactory } from "../../client/Mesh";

export class RenderMountain extends MountainHex implements IRenderTerrain{
    
    public mesh : BABYLON.InstancedMesh
    public hex : Hex

    constructor(hex:Hex, mesh: BABYLON.InstancedMesh){
        super(hex._Q, hex._S,hex._S, hex._X, hex._Y)
        this.hex = hex
        this.mesh = mesh
    }

    getMesh(){
        return this.mesh
    }

    getHex(){
        return this as Hex
    }

    public static RenderHeight : number = 5;
    public static diffuseColor : BABYLON.Color3 = BABYLON.Color3.FromHexString("#BA4A00");
    public static specularColor : BABYLON.Color3 = new BABYLON.Color3(0, 0, 0);
    public static emissiveColor : BABYLON.Color3 = new BABYLON.Color3(0, 0, 0);
    public static ambientColor : BABYLON.Color3 = new BABYLON.Color3(0, 0, 0);
    public static bumpTextureURL : string = "/res/n_rock.jpg";

    public static getMaterial: (scene:BABYLON.Scene) => BABYLON.Material  = (scene) => {
        var material =  new BABYLON.StandardMaterial(MountainHex.name, scene)
        material.specularColor = RenderMountain.specularColor
        material.diffuseColor = RenderMountain.diffuseColor
        material.emissiveColor = RenderMountain.emissiveColor
        material.bumpTexture = new BABYLON.Texture(RenderMountain.bumpTextureURL, scene,false,false,BABYLON.Texture.NEAREST_SAMPLINGMODE)
        return material
    };    
}