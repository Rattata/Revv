import {OverviewCamera} from "../input/OverviewCamera"
import {Clock} from "../Clock"
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