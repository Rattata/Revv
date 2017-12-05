import * as GameMap from "../../core/Map"
import { MeshFactory } from "../Mesh"
import { WaterTerrain, FlatlandTerrain, MountainTerrain, Hex } from "../../core/Terrain";
import { RenderMountain, RenderWater, RenderFlat, IRenderTerrain } from "./"
import { ITerrain } from "../../core/Terrain/ITerrain";
import { injectable, inject } from "inversify"
import { TYPES } from "../types";
import { Entity } from "../../core/Entity";
import { EntityRegister } from "../../core/EntityRegister";
import { RenderHex } from "./RenderHex";
import { GameScene } from "../Scenes/GameScene";
import { myContainer } from "../inversify.config";

export class RenderMap {
    private map: GameMap.Map
    private terrains: Map<string, IRenderTerrain> = new Map<string, IRenderTerrain>()
    constructor(map: GameMap.Map, scene: GameScene) {
        this.map = map

        this.terrains.set(map.MountainTerrain.TerrainName(), new RenderMountain(scene));
        this.terrains.set(map.WaterTerrain.TerrainName(), new RenderWater(scene));
        this.terrains.set(map.FlatTerrain.TerrainName(), new RenderFlat(scene));
        this.entityRegister = myContainer.get<EntityRegister>(TYPES.EntityRegister);
        this.createEntityMap(scene)
    }

    private entityRegister: EntityRegister

    private createEntityMap = (scene): void => {
        this.map
        var tempMap = this.map.getMap();

        // console.log(tempMap)
        for (var X = 0; X < tempMap.length; X++) {
            for (var Y = 0; Y < tempMap[X].length; Y++) {
                var hex: Hex = tempMap[X][Y]
                var renderTerrain: IRenderTerrain = this.terrains.get(hex.terrainType.TerrainName())
                var renderHex: RenderHex = new RenderHex(renderTerrain, hex._Q, hex._R, hex._S, hex._X, hex._Y)
                this.entityRegister.add(X, Y, renderHex)

                var mesh = renderTerrain.getInstancedMesh(scene, renderHex.entityID)
                var yOffset = (tempMap[X][Y]._X & 1) ? MeshFactory.hexHeight() / 2 : 0;
                var Xypoz: number[] = MeshFactory.HexPosition_to_screenPosition(X,Y)
                mesh.position.x = Xypoz[0]
                mesh.position.y = Xypoz[1]
            }
        }
    }
    
}