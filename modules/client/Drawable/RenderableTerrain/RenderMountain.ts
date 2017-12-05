import { Hex, MountainTerrain, ITerrain } from "../../../core/Terrain";
import { IRenderTerrain } from "./IRenderTerrain"
import {MeshFactory} from "../../Mesh/MeshFactory"

export class RenderMountain extends MountainTerrain implements IRenderTerrain{
    
    constructor(hex:Hex,scene:BABYLON.Scene){
        super()
        if(RenderMountain.material == undefined){
            RenderMountain.material = this.getMaterial(scene)
        }
        if(RenderMountain.mastermesh == undefined){
           RenderMountain.mastermesh = this.createMasterMesh(scene);
           RenderMountain.mastermesh.material = RenderMountain.material
        }
        this.mesh = RenderMountain.mastermesh.createInstance(this.TerrainName()+":"+hex._X+":"+hex._Y)
        this.hex = hex
    }

    public hex: Hex
    getHex():Hex {return this.hex}

    
    getEntityIdentifier() {
        return this.hex.entityID
    }

    private createMasterMesh(scene:BABYLON.Scene){
        return MeshFactory.createHexPrism(this.radius,this.renderHeight(), "", scene);
     }

    private static material : BABYLON.Material
    private static parentTerrain: ITerrain
    parentTerrain(): ITerrain {
        return RenderMountain.parentTerrain
    }

    private static mastermesh : BABYLON.Mesh
    private mesh : BABYLON.InstancedMesh
    getMesh(scene:BABYLON.Scene){
        return this.mesh
    }
  
    private static RenderHeight : number = 5;
    renderHeight():number {return RenderMountain.RenderHeight}

    public static diffuseColor : BABYLON.Color3 = BABYLON.Color3.FromHexString("#BA4A00");
    public static specularColor : BABYLON.Color3 = new BABYLON.Color3(0, 0, 0);
    public static emissiveColor : BABYLON.Color3 = new BABYLON.Color3(0, 0, 0);
    public static ambientColor : BABYLON.Color3 = new BABYLON.Color3(0, 0, 0);
    public static bumpTextureURL : string = "/res/n_rock.jpg";
    getMaterial(scene: BABYLON.Scene): BABYLON.Material {
        if (material != undefined && material.getScene() == scene) {
            return material
        }

        var material = new BABYLON.StandardMaterial(this.TerrainName(), scene)
        material.specularColor = RenderMountain.specularColor
        material.diffuseColor = RenderMountain.diffuseColor
        material.emissiveColor = RenderMountain.emissiveColor
        material.bumpTexture = new BABYLON.Texture(RenderMountain.bumpTextureURL, scene, false, false, BABYLON.Texture.NEAREST_SAMPLINGMODE)
        return material
    }
}