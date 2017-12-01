import {OverviewCamera} from "../input/OverviewCamera"
import {Clock} from "../Clock"
import {Map} from "../../core/Map"
import { GeographyBuilder } from "../../core/Generator/GeographyBuilder";
import { Distribution } from "../../core/Generator/Distribution";
import { RenderMap } from "../Drawable";
import { injectable, inject } from "inversify";
import { TYPES } from "modules/client/types";

export class GameScene extends BABYLON.Scene {
    
    private clock: Clock
    private camera: BABYLON.FreeCamera
    private userInput: OverviewCamera
    private turn : number = 0
    
    constructor(engine: BABYLON.Engine) {
        super(engine);
        //camera stuff
        this.clock = new Clock()
        this.camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 0, 100), this)
        var target = new BABYLON.Vector3(0, 0, 0);
        this.camera.setTarget(target)


        //light 
        var light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 0, 100), this);
        
        //input stuff
        this.userInput = new OverviewCamera(this.camera)
        this.camera.inputs.attachInput(this.userInput)

        // map stuff
        var distribution = new Distribution();
        var generatedGeography = new GeographyBuilder(26, 26, distribution)
        .noise(4, 4)
        .noise(7, 7)
        .noise(9, 9)
        .noise(3, 3)
        // .smooth(0.2)
        .build();
        // console.log(generatedGeography)
        var hexMap = new Map(generatedGeography)
        console.log(hexMap)
        // console.log(hexMap)
        var renderMap = new RenderMap(hexMap)
        // console.log(renderMap)
        renderMap.createRenderables(this);

        super.registerAfterRender(() => {
            var delta = this.clock.getDelta();
            var move = 0;
            this.userInput.checkInputs()
        })

        super.registerBeforeRender(() => {
            
        })
    }

    registerEventHandlers = ():void => {
        
        // window.addEventListener("click", function (ev) {
        //     var pickResult = scene.pick(scene.pointerX, scene.pointerY);
        //     if (pickResult.hit) {
        //         // ship.position = new BABYLON.Vector3(pickResult.pickedMesh.position.x, pickResult.pickedMesh.position.y, 30)
        //         // var animationBox = new BABYLON.Animation("myAnimation", "position.x", pickResult.pickedMesh.position.x, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        //         var height = pickResult.pickedMesh._boundingInfo.boundingBox.maximum.z
        //         BABYLON.Animation.CreateAndStartAnimation('shipmoveX', ship, 'position.x', 30, 30, ship.position.x, pickResult.pickedMesh.position.x, 0);
        //         BABYLON.Animation.CreateAndStartAnimation('shipmoveY', ship, 'position.y', 30, 30, ship.position.y, pickResult.pickedMesh.position.y, 0);
        //         BABYLON.Animation.CreateAndStartAnimation('shipmoveZ', ship, 'position.z', 30, 30, ship.position.z, height + 1, 0);
        //         // hl.addMesh(ship, BABYLON.Color3.Green());

        //     }
        // })
    }

}