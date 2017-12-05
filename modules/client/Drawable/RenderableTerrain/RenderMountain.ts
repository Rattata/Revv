import { Hex, MountainTerrain, ITerrain } from "../../../core/Terrain";
import { IRenderTerrain } from "./IRenderTerrain"
import { MeshFactory } from "../../Mesh/MeshFactory"
import { GameScene } from "../../Scenes/GameScene";

export class RenderMountain extends MountainTerrain implements IRenderTerrain {
    
    constructor(scene: GameScene) {
        super()
        this.scene = scene
        if (RenderMountain.material == undefined) {
            RenderMountain.material = this.getMaterial(scene)
        }
        if (RenderMountain.mastermesh == undefined) {
            RenderMountain.mastermesh = this.createMasterMesh(scene);
            RenderMountain.mastermesh.material = RenderMountain.material
        }
    }
    private static mastermesh: BABYLON.Mesh
    private mesh: BABYLON.InstancedMesh
    private scene: GameScene
    public static RenderHeight: number = 3;
    private static material: BABYLON.Material
    public static diffuseColor: BABYLON.Color3 = BABYLON.Color3.FromHexString("#BA4A00");
    public static specularColor: BABYLON.Color3 = new BABYLON.Color3(0, 0, 0);
    public static emissiveColor: BABYLON.Color3 = new BABYLON.Color3(0, 0, 0);
    public static ambientColor: BABYLON.Color3 = new BABYLON.Color3(0, 0, 0);
    public static bumpTextureURL: string = "/res/n_rock.jpg";

    private createMasterMesh(scene: BABYLON.Scene) {
        return MeshFactory.createHexPrism(this.radius, this.renderHeight(), "", scene);
    }

    renderHeight(): number { return RenderMountain.RenderHeight }

    getInstancedMesh(scene: GameScene, identifier: number): BABYLON.InstancedMesh {
        if (this.scene == scene && RenderMountain.mastermesh != undefined) {
            return RenderMountain.mastermesh.createInstance(identifier.toString())
        } else {
            this.createMasterMesh(scene)
            return this.getInstancedMesh(scene, identifier);
        }
    }

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