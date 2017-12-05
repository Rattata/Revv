import { Hex, WaterTerrain, ITerrain } from "../../../core/Terrain";
import { IRenderTerrain } from "./IRenderTerrain"
import { MeshFactory } from "../../Mesh/MeshFactory"
import { GameScene } from "../../Scenes/GameScene";

export class RenderWater extends WaterTerrain implements IRenderTerrain {
    constructor(scene: GameScene) {
        super()
        this.scene = scene
        if (RenderWater.material == undefined) {
            RenderWater.material = this.getMaterial(scene)
        }
        if (RenderWater.mastermesh == undefined) {
            RenderWater.mastermesh = this.createMasterMesh(scene);
            RenderWater.mastermesh.material = RenderWater.material
        }
    }

    public static RenderHeight: number = 1;
    private static mastermesh: BABYLON.Mesh
    private mesh: BABYLON.InstancedMesh
    private scene: GameScene
    public static diffuseColor: BABYLON.Color3 = BABYLON.Color3.FromHexString("#2E86C1");
    public static emissiveColor: BABYLON.Color3 = new BABYLON.Color3(0, 0, 0);
    public static specularColor: BABYLON.Color3 = BABYLON.Color3.FromHexString("#4facea");
    public static ambientColor: BABYLON.Color3 = new BABYLON.Color3(0, 0, 0);
    public static bumpTextureURL: string = "/res/n_ripple.png";
    public static material: BABYLON.Material

    private createMasterMesh(scene: BABYLON.Scene) :BABYLON.Mesh {
        var mastermesh  = MeshFactory.createHexPrism(this.radius, this.renderHeight(), "", scene);
        mastermesh.setEnabled(false)
        return mastermesh
    }

    renderHeight(): number { return RenderWater.RenderHeight }

    getInstancedMesh(scene: GameScene, entityID: number): BABYLON.InstancedMesh {
        if (this.scene == scene && RenderWater.mastermesh != undefined) {
            return RenderWater.mastermesh.createInstance(entityID.toString())
        } else {
            this.createMasterMesh(scene)
            return this.getInstancedMesh(scene, entityID);
        }
    }


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