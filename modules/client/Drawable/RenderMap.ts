import {Map} from "../../core/Map"
import {MaterialFactory} from "../Material/"
import {MeshFactory} from "../Mesh"
import { WaterHex, FlatlandHex, MountainHex } from "modules/core/Terrain";
class RenderableMap{
    private map: Map 
    private renderables : Array<BABYLON.InstancedMesh>

    private Radius: number= 2;


    constructor(map: Map){
       this.map = map
       
    }
    
    getMap = ():Map => {return this.map}

    createRenderables = (scene): Array<BABYLON.Mesh> => {
        var flatMesh = MeshFactory.FlatlandMesh(scene)
        flatMesh.material = MaterialFactory.getFlatlandMaterial(scene);
        var mountainMesh = MeshFactory.MountainMesh(scene)
        mountainMesh.material = MaterialFactory.getMountainMaterial(scene);
        var waterMesh = MeshFactory.WaterMesh(scene)
        waterMesh.material = MaterialFactory.getWaterMaterial(scene);
        var tempMap = this.map.getMap();
        
        this.renderables = new Array<BABYLON.InstancedMesh>();

        for(var R = 0 ; R < tempMap.length; R++){
            for(var Q = 0 ; Q < tempMap[R].length; Q++){
                if(tempMap[R][Q] == undefined) continue;
                var instance: BABYLON.InstancedMesh = undefined
                
                switch (tempMap[R][Q].TerrainName()) {
                    case WaterHex.terrainName: {
                        instance = waterMesh.createInstance("water:" + R + ":" + Q)
                        break;
                    }
                    case FlatlandHex.terrainName: {
                        instance = flatMesh.createInstance("flat:" + R + ":" + Q)
                        break;
                    }
                    case MountainHex.terrainName: {
                        instance = mountainMesh.createInstance("mountain:" + R + ":" + Q)
                        break;
                    }
                    default: {
                        console.log("err" + tempMap[R][Q])
                        break;
                    }

                }
                this.renderables.push(instance)
            }
        }
        return new Array<BABYLON.Mesh>(0)}
}