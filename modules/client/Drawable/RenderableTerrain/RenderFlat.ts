import { Hex, FlatlandTerrain, ITerrain } from "../../../core/Terrain";
import { IRenderTerrain } from "./IRenderTerrain"
import {MeshFactory} from "../../Mesh/MeshFactory"

export class RenderFlat extends FlatlandTerrain implements IRenderTerrain {

    constructor(hex:Hex,scene:BABYLON.Scene){
        super()
        if(RenderFlat.material == undefined){
            RenderFlat.material = this.getMaterial(scene)
        }
        if(RenderFlat.mastermesh == undefined){
           RenderFlat.mastermesh = this.createMasterMesh(scene);
           RenderFlat.mastermesh.material = RenderFlat.material
        }
        this.mesh = RenderFlat.mastermesh.createInstance(this.TerrainName()+":"+hex._X+":"+hex._Y)
        this.hex = hex
    }

    private createMasterMesh(scene:BABYLON.Scene){
        return MeshFactory.createHexPrism(this.radius,this.renderHeight(), "", scene);
     }

    public hex: Hex
    getHex():Hex {return this.hex}

    public static RenderHeight: number = 2;
    renderHeight():number {return RenderFlat.RenderHeight}

    private static mastermesh : BABYLON.Mesh
    private mesh : BABYLON.InstancedMesh
    getMesh(scene:BABYLON.Scene){
        return this.mesh
    }

    
    public static parentTerrain: ITerrain
    parentTerrain(): ITerrain {
        return RenderFlat.parentTerrain
    }
    
    public static diffuseColor: BABYLON.Color3 = BABYLON.Color3.FromHexString("#DAF7A6");
    public static specularColor: BABYLON.Color3 = new BABYLON.Color3(0, 0, 0);
    public static emissiveColor: BABYLON.Color3 = new BABYLON.Color3(0, 0, 0);
    public static ambientColor: BABYLON.Color3 = new BABYLON.Color3(0, 0, 0);
    public static bumpTextureURL: string = "/res/n_dot.png";
    public static material: BABYLON.Material
    getMaterial(scene: BABYLON.Scene): BABYLON.Material {
        if (material != undefined && material.getScene() == scene) {
            return material
        }

        var material = new BABYLON.StandardMaterial(this.TerrainName(), scene)
        material.specularColor = RenderFlat.specularColor
        material.diffuseColor = RenderFlat.diffuseColor
        material.emissiveColor = RenderFlat.emissiveColor
        material.bumpTexture = new BABYLON.Texture(RenderFlat.bumpTextureURL, scene, false, false, BABYLON.Texture.NEAREST_SAMPLINGMODE)
        return material
    }



   

}