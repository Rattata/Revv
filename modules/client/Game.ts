import { Clock } from "./Clock"
import * as Actions from "../core/Actions"
import { myContainer } from "./inversify.config";
import { CLIENT_TYPES } from "./clienttypes";
import { CameraInput } from "./input/CameraInput"
import { interfaces } from "inversify/dts/interfaces/interfaces";
import { MeshFactory } from "./Mesh/"
import { GeographyBuilder } from "../core/Generator/GeographyBuilder"
import { Map } from "../core/Map";
import { Distribution } from "../core/Generator/Distribution";
import { RenderMap } from "./Drawable/"
import { GameScene } from "./Scenes/GameScene";

//contains late binding
export class Game {
    engine: BABYLON.Engine = null
    static canvas: any = null
    scene: GameScene = null
    state = null
    quit = false

    constructor(canvas: any) {
        myContainer.bind<BABYLON.Engine>(CLIENT_TYPES.BabylonEngine).toConstantValue(new BABYLON.Engine(canvas, false, { stencil: true }, false));
        myContainer.bind(CLIENT_TYPES.Canvas).toConstantValue(canvas);
        
        Game.canvas = canvas
        this.engine = myContainer.get<BABYLON.Engine>(CLIENT_TYPES.BabylonEngine);
        console.log(this.engine)
        this.scene = new GameScene(this.engine)
        this.switchScene(this.scene)
        
    }

    switchScene(newScene: GameScene) {
        this.engine.stopRenderLoop()
        var scene = newScene
        this.scene = newScene
        this.engine.runRenderLoop(() => {
            this.scene.render()
        })
    }

}