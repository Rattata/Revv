import * as GameMap from "../../core/Map"
import { MeshFactory } from "../Mesh"
import { WaterTerrain, FlatlandTerrain, MountainTerrain, Hex } from "../../core/Terrain";
import { RenderMountain, RenderWater, RenderFlat, RenderTerrain } from "./"
import { ITerrain } from "../../core/Terrain/ITerrain";
import { injectable, inject } from "inversify"
import { CLIENT_TYPES } from "../clienttypes";
import { Entity } from "../../core/Entity";
import { EntityRegister } from "../../core/EntityRegister";
import { RenderHex } from "./RenderHex";
import { GameScene } from "../Scenes/GameScene";
import { myContainer } from "../inversify.config";
import "reflect-metadata";

export class RenderMap {
    private map: GameMap.Map
    private terrains: Map<string, any> = new Map<string, any>()
    constructor(map: GameMap.Map, scene: GameScene) {
        this.map = map

        this.terrains.set(map.MountainTerrain.TerrainName(), new RenderMountain(scene));
        this.terrains.set(map.WaterTerrain.TerrainName(),new RenderWater(scene));
        this.terrains.set(map.FlatTerrain.TerrainName(), new RenderFlat(scene));
        console.log(this.terrains)
        this.entityRegister = myContainer.get<EntityRegister>(CLIENT_TYPES.EntityRegister);
        this.createEntityMap(scene)
    }

    private entityRegister: EntityRegister

    private createEntityMap = (scene): void => {
        let tempMap = this.map.getMap();

        // console.log(tempMap)
        for (var X = 0; X < tempMap.length; X++) {
            for (var Y = 0; Y < tempMap[X].length; Y++) {
                let hex: Hex = tempMap[X][Y]
                let renderTerrain: RenderTerrain = this.terrains.get(hex.terrainType.TerrainName())
                let renderHex: RenderHex = new RenderHex(renderTerrain, hex._Q, hex._R, hex._S, hex._X, hex._Y)
                this.entityRegister.add(X, Y, renderHex)

                let mesh = renderTerrain.getInstancedMesh(renderHex.entityID)
                let yOffset = (tempMap[X][Y]._X & 1) ? MeshFactory.hexHeight() / 2 : 0;
                let Xypoz: number[] = MeshFactory.HexPosition_to_screenPosition(X,Y)
                mesh.position.x = Xypoz[0]
                mesh.position.y = Xypoz[1]
            }
        }
    }
    
}