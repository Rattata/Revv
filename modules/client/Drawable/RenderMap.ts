import {Map} from "../../core/Map"
import {MeshFactory} from "../Mesh"
import { WaterHex, FlatlandHex, MountainHex, Hex } from "../../core/Terrain";
import {RenderMountain, RenderWater, RenderFlat, IRenderTerrain} from "./"
import { ITerrain } from "modules/core/Terrain/ITerrain";
export class RenderMap{
    private map: Map 
    private renderables : Array<Array<IRenderTerrain>>

    private Radius: number= 2;

    constructor(map: Map){
       this.map = map
       
    }
    
    getMap = ():Map => {return this.map}

    createRenderables = (scene): Array<Array<IRenderTerrain>> => {
        var flatMesh = MeshFactory.FlatlandMesh(scene)
        flatMesh.material = RenderFlat.getMaterial(scene);
        var mountainMesh = MeshFactory.MountainMesh(scene)
        mountainMesh.material = RenderMountain.getMaterial(scene);
        var waterMesh = MeshFactory.WaterMesh(scene)
        waterMesh.material = RenderWater.getMaterial(scene);
        
        var tempMap = this.map.getMap();
        
        this.renderables = new Array<Array<IRenderTerrain>>();
        // console.log(tempMap)
        for(var X = 0 ; X < tempMap.length; X++){
            var Yentities: Array<IRenderTerrain> = new Array<IRenderTerrain>();
            for(var Y = 0 ; Y < tempMap[X].length; Y++){
                var mesh: BABYLON.InstancedMesh = undefined
                var hex: Hex = tempMap[X][Y]
                var renderTerrain: IRenderTerrain = undefined
                // var X = Q - Q
                // console.log(tempMap[X][Y])
                switch (hex.TerrainName()) {
                    case WaterHex.terrainName: {
                        mesh = waterMesh.createInstance("water:" + X + ":" + Y)
                        renderTerrain = new RenderWater(hex, mesh)
                        break;
                    }
                    case FlatlandHex.terrainName: {
                        mesh = flatMesh.createInstance("flat:" + X + ":" + Y)
                        renderTerrain = new RenderFlat(hex, mesh)
                        break;
                    }
                    case MountainHex.terrainName: {
                        mesh = mountainMesh.createInstance("mountain:" + X + ":" + Y)
                        renderTerrain = new RenderMountain(hex, mesh)
                        break;
                    }
                    default: {
                        console.error("err" + tempMap[X][Y])
                        break;
                    }

                }
                
                var yOffset = (tempMap[X][Y]._X & 1) ?  MeshFactory.hexHeight() / 2  : 0;
                mesh.position.x = 1+ tempMap[X][Y]._X * MeshFactory.hexDistance()
                mesh.position.y = 1+tempMap[X][Y]._Y * MeshFactory.hexHeight() + yOffset;
                (mesh as any).getEntity = function(){
                   return typeof mesh
                }
                Yentities.push(renderTerrain)

                
            }
            this.renderables.push(Yentities)
        }
        return this.renderables
    }
}