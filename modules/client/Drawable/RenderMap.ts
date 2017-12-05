import * as GameMap from "../../core/Map"
import {MeshFactory} from "../Mesh"
import { WaterTerrain, FlatlandTerrain, MountainTerrain, Hex } from "../../core/Terrain";
import {RenderMountain, RenderWater, RenderFlat, IRenderTerrain} from "./"
import { ITerrain } from "../../core/Terrain/ITerrain";
import {injectable, inject} from "inversify"
import { TYPES } from "../types";
import { Entity } from "../../core/Entity";

export class RenderMap{
    private map:GameMap.Map
    private entityMap : Map<string,IRenderTerrain>
    private entityArray: Array<Array<IRenderTerrain>>
    constructor(map: GameMap.Map, scene: BABYLON.Scene){
       this.map = map
       this.createEntityMap(scene)
    }
    
    @inject(TYPES.EntityRegister)
    private entityRegister : Map<object, Entity>

    getMap = ():GameMap.Map=> {return this.map}
    getEntityMap = (): Map<string,IRenderTerrain>=> {return this.entityMap}
    getEntityArray= ():Array<Array<IRenderTerrain>>=> {return this.entityArray}

   private createEntityMap = (scene): Map<string,IRenderTerrain> => {
        this.map
        var tempMap = this.map.getMap();
        this.entityArray = new Array<Array<IRenderTerrain>>()
        this.entityMap = new Map<string,IRenderTerrain>();
        
        // console.log(tempMap)
        for(var X = 0 ; X < tempMap.length; X++){
            var Yentities: Array<IRenderTerrain> = new Array<IRenderTerrain>();
            for(var Y = 0 ; Y < tempMap[X].length; Y++){
                var hex: Hex = tempMap[X][Y]
                var renderTerrain: IRenderTerrain = undefined
                // var X = Q - Q
                // console.log(tempMap[X][Y])
                switch (hex.terrainType.TerrainName()) {
                    case WaterTerrain.terrainName: {
                        renderTerrain = new RenderWater(hex, scene)
                        break;
                    }
                    case FlatlandTerrain.terrainName: {
                        renderTerrain = new RenderFlat(hex, scene)
                        break;
                    }
                    case MountainTerrain.terrainName: {
                        renderTerrain = new RenderMountain(hex, scene)
                        break;
                    }
                    default: {
                        console.error("err" + tempMap[X][Y])
                        break;
                    }

                }
                
                var yOffset = (tempMap[X][Y]._X & 1) ?  MeshFactory.hexHeight() / 2  : 0;
                
                renderTerrain.getMesh(scene).position.x = 1+ tempMap[X][Y]._X * MeshFactory.hexDistance()
                renderTerrain.getMesh(scene).position.y = 1+tempMap[X][Y]._Y * MeshFactory.hexHeight() + yOffset;
                this.entityMap.set(renderTerrain.getMesh(scene).id,renderTerrain)
                Yentities.push(renderTerrain)               
            }
            this.entityArray.push(Yentities)
        }
        return this.entityMap
    }
}