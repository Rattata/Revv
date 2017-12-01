import {WaterHex} from "../../core/Terrain/WaterHex"
export class RenderWater extends WaterHex {
    constructor(hex:WaterHex){
        super(hex._Q, hex._S,hex._S, hex._X, hex._Y)
    }

    public static height : number = 1;
    public static diffuseColor : BABYLON.Color3 = BABYLON.Color3.FromHexString("#2E86C1");
    public static emissiveColor : BABYLON.Color3 = new BABYLON.Color3(0, 0, 0);
    public static specularColor : BABYLON.Color3 = BABYLON.Color3.FromHexString("#4facea");
    public static ambientColor : BABYLON.Color3 = new BABYLON.Color3(0, 0, 0);
    public static bumpTextureURL : string = "/res/n_ripple.png";

    public static getMaterial: (scene:BABYLON.Scene) => BABYLON.Material  = (scene) => {
        var material =  new BABYLON.StandardMaterial(WaterHex.name, scene)
        material.specularColor = RenderWater.specularColor
        material.diffuseColor = RenderWater.diffuseColor
        material.emissiveColor = RenderWater.emissiveColor
        
        material.bumpTexture = new BABYLON.Texture(RenderWater.bumpTextureURL, scene,false,false,BABYLON.Texture.NEAREST_SAMPLINGMODE)
        return material
    };    
}