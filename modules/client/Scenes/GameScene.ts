import {CameraInput} from "../Input/CameraInput"
import {Clock} from "../Clock"
import {Map} from "../../core/Map"
import {Lobby} from "../../core/Lobby"
import { GeographyBuilder } from "../../core/Generator/GeographyBuilder";
import { Distribution } from "../../core/Generator/Distribution";
import { RenderMap, IRenderTerrain } from "../Drawable";
import { injectable, inject } from "inversify";
import { TYPES } from "modules/client/types";
import {Turn} from "../../core/State/Turn"
import { IPlayer } from "modules/core/IPlayer";
import { Hex } from "modules/core/Terrain";
export class GameScene extends BABYLON.Scene {
    
    private clock: Clock
    private camera: BABYLON.FreeCamera
    private userInput: CameraInput
    private turn : Turn

    private map : Array<Array<Hex>>
    
    constructor(engine: BABYLON.Engine, Lobby: Lobby, Player: IPlayer) {
        super(engine);
        //camera stuff
        this.clock = new Clock()
        this.camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 0, 100), this)
        var target = new BABYLON.Vector3(0, 0, 0);
        this.camera.setTarget(target)


        //light 
        var light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 0, 100), this);
        
        //input attachment
        this.userInput = new CameraInput(this.camera)
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
        
        var hexMap = new Map(generatedGeography)
        
        var renderMap = new RenderMap(hexMap)
        var entities : Array<Array<IRenderTerrain>> = renderMap.createRenderables(this);

        super.registerAfterRender(() => {
            //update countdown timer
            var delta = this.clock.getDelta();
            var move = 0;
            this.userInput.customeInputs(this)
        })

        super.registerBeforeRender(() => {
            
        })
    }


}