import {FlatlandHex} from "../../core/Terrain/FlatlandHex"
import { Hex } from "../../core/Terrain";
import { ITerrain } from "modules/core/Terrain/ITerrain";
export class RenderFlat extends FlatlandHex  implements ITerrain{
   
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

    public static height : number = 2;
    public static diffuseColor : BABYLON.Color3 = BABYLON.Color3.FromHexString("#DAF7A6");
    public static specularColor : BABYLON.Color3 = new BABYLON.Color3(0, 0, 0);
    public static emissiveColor : BABYLON.Color3 = new BABYLON.Color3(0, 0, 0);
    public static ambientColor : BABYLON.Color3 = new BABYLON.Color3(0, 0, 0);
    public static bumpTextureURL : string = "/res/n_dot.png";

    public static getMaterial: (scene:BABYLON.Scene) => BABYLON.Material  = (scene) => {
        var material =  new BABYLON.StandardMaterial(FlatlandHex.name, scene)
        material.specularColor = RenderFlat.specularColor
        material.diffuseColor = RenderFlat.diffuseColor
        material.emissiveColor = RenderFlat.emissiveColor
        material.bumpTexture = new BABYLON.Texture(RenderFlat.bumpTextureURL, scene,false,false,BABYLON.Texture.NEAREST_SAMPLINGMODE)
        return material
    };  
    
}