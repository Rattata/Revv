import { Clock } from "./Clock"
import * as Actions from "../core/Actions"
import { myContainer } from "./inversify.config";
import { TYPES } from "./types";
import { OverviewCamera } from "./input/OverviewCamera"
import { interfaces } from "inversify/dts/interfaces/interfaces";
import { MeshFactory } from "./Mesh/"
import { GeographyBuilder } from "../core/Generator/GeographyBuilder"
import { Map } from "../core/Map";
import { Distribution } from "../core/Generator/Distribution";
import { RenderMap } from "./Drawable/"
import { GameScene } from "./Scenes";

//contains late binding
export class Game {
    engine: BABYLON.Engine = null
    static canvas: any = null
    scene: BABYLON.Scene = null
    state = null
    quit = false

    constructor(canvas: any) {
        myContainer.bind<BABYLON.Engine>(TYPES.BabylonEngine).toConstantValue(new BABYLON.Engine(canvas, false, null, false));
        myContainer.bind(TYPES.Canvas).toConstantValue(canvas);
        //test websocket upgrade
        var ws = new WebSocket('ws://localhost:3000/ws');
        ws.onmessage = function (event: MessageEvent) {
            console.log(event)
        };
        ws.onopen = function (event) {
            var toSend = new Actions.RegisterAction();
            ws.send(JSON.stringify(toSend));
        };

        Game.canvas = canvas
        this.engine = myContainer.get<BABYLON.Engine>(TYPES.BabylonEngine);
        this.scene = new GameScene(this.engine, undefined, undefined)
        this.switchScene(this.scene)
    }

    switchScene(newScene: BABYLON.Scene) {
        this.engine.stopRenderLoop()
        var scene = newScene
        this.scene = newScene
        this.engine.runRenderLoop(() => {
            this.scene.render()
        })
    }

}