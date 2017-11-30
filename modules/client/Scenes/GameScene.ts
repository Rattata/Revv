import {OverviewCamera} from "../input/OverviewCamera"
import {Clock} from "../Clock"
import {Map} from "../../core/Map"
import { GeographyBuilder } from "../../core/Generator/GeographyBuilder";
import { Distribution } from "../../core/Generator/Distribution";

class GameScene extends BABYLON.Scene {
    
    private clock: Clock
    private camera: BABYLON.FreeCamera
    private userInput: OverviewCamera
    private turn : number = 0

    constructor(engine: BABYLON.Engine) {
        super(engine);
        //camera stuff
        this.camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 0, 100), this)
        var target = new BABYLON.Vector3(0, 0, 0);
        this.camera.setTarget(target)

        //input stuff
        this.userInput = new OverviewCamera(this.camera)
        this.camera.inputs.attachInput(this.userInput)

        // map stuff
        var distribution = new Distribution();
        var mapped = new GeographyBuilder(26, 26, distribution)
        .noise(4, 4, distribution, 0.4)
        .noise(7, 7, distribution, 0.3)
        .noise(9, 9, distribution)
        .noise(3, 3, distribution, 0.5)
        // .smooth(0.2)
        .build();
        console.log(mapped)
        var map3 = new Map(mapped)
    }

    start() {

        super.registerAfterRender(() => {
            var delta = this.clock.getDelta();
            var move = 0;
            this.userInput.checkInputs()
        })

        super.registerBeforeRender(() => {
            
        })
    }
}