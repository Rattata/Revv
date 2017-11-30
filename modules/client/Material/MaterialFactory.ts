
export class MaterialFactory {
    material: BABYLON.Material

    constructor(){
    }

    static getMountainMaterial (scene : BABYLON.Scene): BABYLON.Material {
        var material =  new BABYLON.StandardMaterial("mountain", scene)
        material.diffuseColor = BABYLON.Color3.FromHexString("#BA4A00");
        material.bumpTexture = new BABYLON.Texture("/textures/n_rock.jpg", scene,false,false,BABYLON.Texture.NEAREST_SAMPLINGMODE)
        material.specularColor = new BABYLON.Color3(0, 0, 0);
        // material.bumpTexture.anisotropicFilteringLevel = 1
        //material.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
        // material.ambientColor = BABYLON.Color3.FromHexString("#BA4A00");
        return material;
    }

    static getWaterMaterial (scene: BABYLON.Scene): BABYLON.Material{
        var material =  new BABYLON.StandardMaterial("water", scene)
        material.diffuseColor = BABYLON.Color3.FromHexString("#2E86C1");
        material.specularColor = new BABYLON.Color3(0.5, 0.6, 0.5);
        material.backFaceCulling = true
        material.bumpTexture = new BABYLON.Texture("/textures/n_ripple.png", scene,false,false,BABYLON.Texture.NEAREST_SAMPLINGMODE)
        material.bumpTexture.anisotropicFilteringLevel = 1
        //material.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
        material.ambientColor = BABYLON.Color3.FromHexString("#2E86C1");
        return material
    }

    static getFlatlandMaterial (scene: BABYLON.Scene): BABYLON.Material{
        var material =  new BABYLON.StandardMaterial("flatland", scene)
        material.diffuseColor = BABYLON.Color3.FromHexString("#DAF7A6");
        material.specularColor = new BABYLON.Color3(0, 0, 0);
        material.bumpTexture = new BABYLON.Texture("/textures/n_dot.png", scene,false,false,BABYLON.Texture.NEAREST_SAMPLINGMODE)
        material.bumpTexture.anisotropicFilteringLevel = 1
        //material.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
        // material.ambientColor = BABYLON.Color3.FromHexString("#DAF7A6");
        return material
    }
}