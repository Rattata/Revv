
export class MaterialFactory {
    material: BABYLON.Material

    constructor(){
    }

    static getMountainMaterial (scene : BABYLON.Scene): BABYLON.Material {
        var material =  new BABYLON.StandardMaterial("mountain", scene)
        material.diffuseColor = BABYLON.Color3.FromHexString("#BA4A00");
        material.specularColor = new BABYLON.Color3(0.5, 0.6, 0.5);
        material.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
        material.ambientColor = BABYLON.Color3.FromHexString("#BA4A00");
        return material;
    }

    static getWaterMaterial (scene: BABYLON.Scene): BABYLON.Material{
        var material =  new BABYLON.StandardMaterial("water", scene)
        material.diffuseColor = BABYLON.Color3.FromHexString("#2E86C1");
        material.specularColor = new BABYLON.Color3(0.5, 0.6, 0.5);
        material.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
        material.ambientColor = BABYLON.Color3.FromHexString("#2E86C1");
        return material
    }

    static getFlatlandMaterial (scene: BABYLON.Scene): BABYLON.Material{
        var material =  new BABYLON.StandardMaterial("flatland", scene)
        material.diffuseColor = BABYLON.Color3.FromHexString("#DAF7A6");
        material.specularColor = new BABYLON.Color3(0.5, 0.6, 0.5);
        material.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
        material.ambientColor = BABYLON.Color3.FromHexString("#DAF7A6");
        return material
    }
}