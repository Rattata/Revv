import { Hex, WaterTerrain, ITerrain } from "../../../core/Terrain";
import { IRenderTerrain } from "./IRenderTerrain"
import {MeshFactory} from "../../Mesh/MeshFactory"

export class RenderWater extends WaterTerrain implements IRenderTerrain {
    

    constructor(hex:Hex,scene:BABYLON.Scene){
        super()
        if(RenderWater.material == undefined){
            RenderWater.material = this.getMaterial(scene)
        }
        if(RenderWater.mastermesh == undefined){
           RenderWater.mastermesh = this.createMasterMesh(scene);
           RenderWater.mastermesh.material = RenderWater.material
        }
        this.mesh = RenderWater.mastermesh.createInstance(this.TerrainName()+":"+hex._X+":"+hex._Y)
    }

    public hex: Hex
    getHex():Hex {return this.hex}


    private createMasterMesh(scene:BABYLON.Scene){
       return MeshFactory.createHexPrism(this.radius,this.renderHeight(), "", scene);
    }

    private createMaterial(scene:BABYLON.Scene){
        return
    }

    private static mastermesh : BABYLON.Mesh
    private mesh : BABYLON.InstancedMesh
    getMesh(scene:BABYLON.Scene){
        return this.mesh
    }

    public static parentTerrain: ITerrain
    parentTerrain(): ITerrain {
        return RenderWater.parentTerrain
    }

    private static RenderHeight : number = 1;
    renderHeight():number {return RenderWater.RenderHeight}

    public static diffuseColor : BABYLON.Color3 = BABYLON.Color3.FromHexString("#2E86C1");
    public static emissiveColor : BABYLON.Color3 = new BABYLON.Color3(0, 0, 0);
    public static specularColor : BABYLON.Color3 = BABYLON.Color3.FromHexString("#4facea");
    public static ambientColor : BABYLON.Color3 = new BABYLON.Color3(0, 0, 0);
    public static bumpTextureURL : string = "/res/n_ripple.png";

    public static material:BABYLON.Material
    getMaterial(scene: BABYLON.Scene): BABYLON.Material {
        if (RenderWater.material != undefined && RenderWater.material.getScene() == scene) {
            return RenderWater.material
        }

        var material = new BABYLON.StandardMaterial(this.TerrainName(), scene)
        material.specularColor = RenderWater.specularColor
        material.diffuseColor = RenderWater.diffuseColor
        material.emissiveColor = RenderWater.emissiveColor
        material.bumpTexture = new BABYLON.Texture(RenderWater.bumpTextureURL, scene, false, false, BABYLON.Texture.NEAREST_SAMPLINGMODE)
        RenderWater.material = material
        return RenderWater.material
    }  
}