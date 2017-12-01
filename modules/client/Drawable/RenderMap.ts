import {Map} from "../../core/Map"
import {MeshFactory} from "../Mesh"
import { WaterHex, FlatlandHex, MountainHex } from "../../core/Terrain";
import {RenderMountain, RenderWater, RenderFlat} from "./"
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
        flatMesh.material = RenderFlat.getMaterial(scene);
        var mountainMesh = MeshFactory.MountainMesh(scene)
        mountainMesh.material = RenderMountain.getMaterial(scene);
        var waterMesh = MeshFactory.WaterMesh(scene)
        waterMesh.material = RenderWater.getMaterial(scene);
        
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
                
                var yOffset = (tempMap[X][Y]._X & 1) ?  MeshFactory.hexHeight() / 2  : 0;
                instance.position.x = 1+ tempMap[X][Y]._X * MeshFactory.hexDistance()
                instance.position.y = 1+tempMap[X][Y]._Y * MeshFactory.hexHeight() + yOffset
                this.renderables.push(instance)
            }
        }
        return this.renderables
    }
}