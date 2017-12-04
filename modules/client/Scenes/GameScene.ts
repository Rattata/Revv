import {CameraInput} from "../Input/CameraInput"
import {Clock} from "../Clock"
import * as GameMap from "../../core/Map"
import {Lobby} from "../../core/Lobby"
import { GeographyBuilder } from "../../core/Generator/GeographyBuilder";
import { Distribution } from "../../core/Generator/Distribution";
import { RenderMap, IRenderTerrain, ShipMeshFactory } from "../Drawable";
import { injectable, inject } from "inversify";
import { TYPES } from "../types";
import {Turn} from "../../core/State/Turn"
import { IPlayer } from "../../core/IPlayer";
import { Hex } from "../../core/Terrain";
import {ShipFactory} from "../Entity"
import { myContainer } from "../inversify.config";

export class GameScene extends BABYLON.Scene {
    
    private clock: Clock
    private camera: BABYLON.FreeCamera
    private userInput: CameraInput
    private turn : Turn

    private _this : GameScene
    private entityMap : Map<string,IRenderTerrain>
    getEntityMap() : Map<string,IRenderTerrain> {return this.entityMap}
    private entityArray : Array<Array<IRenderTerrain>>

    private terrainSlots : Map<number,Hex>
    private renderMap : RenderMap
    private hexMap : GameMap.Map

    private map : Array<Array<Hex>>
    
    constructor(engine: BABYLON.Engine, Lobby: Lobby, Player: IPlayer) {
        super(engine);
        this._this = this
        myContainer.bind<BABYLON.Scene>(TYPES.GameScene).toConstantValue(this._this);
        //camera stuff
        this.clock = new Clock()
        this.camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 0, 100), this)
        var target = new BABYLON.Vector3(0, 0, 0);
        this.camera.setTarget(target)


        //light 
        var light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 0, 100), this);
        
        //input attachment
        this.userInput = new CameraInput(this.camera, this._this)
        this.camera.inputs.attachInput(this.userInput)

        // map generation
        var distribution = new Distribution();
        var generatedGeography = new GeographyBuilder(26, 26, distribution)
        .noise(4, 4)
        .noise(7, 7)
        .noise(9, 9)
        .noise(3, 3)
        // .smooth(0.2)
        .build();
        
        this.hexMap = new GameMap.Map(generatedGeography)
        
        this.renderMap = new RenderMap(this.hexMap,this)
        this.entityMap = this.renderMap.getEntityMap()
        this.entityArray = this.renderMap.getEntityArray()
        var shipfact = new ShipFactory();

        shipfact.buildTestShip(this.entityArray[5][5],this._this,"test")

        
        super.registerAfterRender(() => {
            var delta = this.clock.getDelta();
            this.userInput.customInputs(this)
        })

        super.registerBeforeRender(() => {
            
        })
    }


}