import {Map} from "../../core/Map"
import {MaterialFactory} from "../Material/"
import {MeshFactory} from "../Mesh"
import { WaterHex, FlatlandHex, MountainHex } from "../../core/Terrain";
export class RenderMap{
    private map: Map 
    private renderables : Array<BABYLON.InstancedMesh>

    private Radius: number= 2;

    constructor(map: Map){
       this.map = map
       
    }
    
    getMap = ():Map => {return this.map}

    createRenderables = (scene): Array<BABYLON.InstancedMesh> => {
        var flatMesh = MeshFactory.FlatlandMesh(scene)
        flatMesh.material = MaterialFactory.getFlatlandMaterial(scene);
        var mountainMesh = MeshFactory.MountainMesh(scene)
        mountainMesh.material = MaterialFactory.getMountainMaterial(scene);
        var waterMesh = MeshFactory.WaterMesh(scene)
        waterMesh.material = MaterialFactory.getWaterMaterial(scene);
        
        var tempMap = this.map.getMap();
        
        this.renderables = new Array<BABYLON.InstancedMesh>();
        // console.log(tempMap)
        for(var X = 0 ; X < tempMap.length; X++){
            
            for(var Y = 0 ; Y < tempMap[X].length; Y++){
                var instance: BABYLON.InstancedMesh = undefined
                // var X = Q - Q
                // console.log(tempMap[X][Y])
                switch (tempMap[X][Y].TerrainName()) {
                    case WaterHex.terrainName: {
                        instance = waterMesh.createInstance("water:" + X + ":" + Y)
                        break;
                    }
                    case FlatlandHex.terrainName: {
                        instance = flatMesh.createInstance("flat:" + X + ":" + Y)
                        break;
                    }
                    case MountainHex.terrainName: {
                        instance = mountainMesh.createInstance("mountain:" + X + ":" + Y)
                        break;
                    }
                    default: {
                        console.error("err" + tempMap[X][Y])
                        break;
                    }

                }
                var yOffset = 0
                // console.log(tempMap[R][Q])
                if(tempMap[X][Y].X() % 2 == 0){ yOffset = MeshFactory.hexHeight() / 2 }
                instance.position.x = 1+ tempMap[X][Y].X() * MeshFactory.hexDistance()
                instance.position.y = 1+tempMap[X][Y].Y() * MeshFactory.hexHeight() + yOffset
                this.renderables.push(instance)
            }
        }
        return this.renderables
    }
}