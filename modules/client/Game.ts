import {Clock} from "./Clock"
import * as Actions from "../core/Actions"
import { myContainer } from "./inversify.config";
import { TYPES } from "./types";
import { OverviewCamera } from "./input/OverviewCamera"
import { interfaces } from "inversify/dts/interfaces/interfaces";
import { MeshFactory } from "./Mesh/"
import { MaterialFactory } from "./Material/MaterialFactory"
import { GeographyBuilder } from "../core/Generator/GeographyBuilder"
import { Map } from "../core/Map";
import { Distribution } from "../core/Generator/Distribution";

//contains late binding
export class Game {
    static currentGame: Game
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
        Game.currentGame = this
        this.scene = this.createMenu(this.engine)
        this.switchScene(this.scene)
        setInterval(() => {
            console.log('turn')
            if (this.quit) {
                clearInterval(1)
            }
        }, 5000, 1)


    }

    switchScene(newScene: BABYLON.Scene) {
        this.engine.stopRenderLoop()
        var scene = newScene
        this.scene = newScene
        this.engine.runRenderLoop(() => {
            scene.render()
        })
    }

    createMenu(engine: BABYLON.Engine): BABYLON.Scene {
        var scene = new BABYLON.Scene(engine)
        var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 0, 100), scene)
        var input = new OverviewCamera(camera)
        camera.inputs.attachInput(input)
        var target = new BABYLON.Vector3(0, 0, 0);
        camera.setTarget(target)

        var light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 0, 100), scene);

        var polygons = new Array<BABYLON.Mesh>();

        var mountainMesh = MeshFactory.MountainMesh(scene)
        mountainMesh.material = MaterialFactory.getMountainMaterial(scene);
        var waterMesh = MeshFactory.WaterMesh(scene)
        waterMesh.material = MaterialFactory.getWaterMaterial(scene);

        var ship = BABYLON.MeshBuilder.CreateBox("ship",
            { depth: 1, width: 1, height: 1, updatable: true }
            , scene)
        ship.material = new BABYLON.StandardMaterial("shipmaterial", scene)
        ship.position.x = -20
        ship.position.y = 0
        ship.position.z = 40

        var flatMesh = MeshFactory.FlatlandMesh(scene)
        flatMesh.material = MaterialFactory.getFlatlandMaterial(scene);

        flatMesh.position.x = -10
        flatMesh.position.y = 0

        waterMesh.position.x = -5
        waterMesh.position.y = 0

        mountainMesh.position.x = -15;
        mountainMesh.position.y = 0;
        mountainMesh.position.z = 0;
        polygons.push(mountainMesh);
        polygons.push(waterMesh);
        polygons.push(flatMesh);
        var distribution = new Distribution();
        var mapped = new GeographyBuilder(26, 26, distribution)
            .noise(4, 4, distribution, 0.4)
            .noise(7, 7, distribution, 0.3)
            .noise(9, 9, distribution)
            .noise(3, 3, distribution, 0.5)
            // .smooth(0.2)
            .build();
            
            var map3 = new Map(mapped)
        var map2 = new Array();
        for (var i = 0; i < mapped.length; i++) {
            map2[i] = new Array()
            var yOffset = 0;
            if (i % 2 == 0) {
                yOffset = MeshFactory.hheight() / 2
            }
            for (var j = 0; j < mapped[i].length; j++) {
                var instance: BABYLON.InstancedMesh = undefined
                switch (mapped[i][j]) {
                    case 1: {
                        instance = waterMesh.createInstance("water:" + i + ":" + j)
                        break;
                    }
                    case 2: {
                        instance = flatMesh.createInstance("flat:" + i + ":" + j)
                        break;
                    }
                    case 3: {
                        instance = mountainMesh.createInstance("mountain:" + i + ":" + j)
                        break;
                    }
                    default: {
                        console.log("err" + mapped[i][j])
                        break;
                    }
                }
                
                instance.position.x = i * 3
                instance.position.y = j * MeshFactory.hheight() + yOffset
            }
        }     

        var clock = new Clock()
        var hl = new BABYLON.HighlightLayer("hl1", scene);
        

        window.addEventListener("click", function (ev) {
            var pickResult = scene.pick(scene.pointerX, scene.pointerY);
            if (pickResult.hit) {
                // ship.position = new BABYLON.Vector3(pickResult.pickedMesh.position.x, pickResult.pickedMesh.position.y, 30)
                // var animationBox = new BABYLON.Animation("myAnimation", "position.x", pickResult.pickedMesh.position.x, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
                var height = pickResult.pickedMesh._boundingInfo.boundingBox.maximum.z
                BABYLON.Animation.CreateAndStartAnimation('shipmoveX', ship, 'position.x', 30, 30, ship.position.x, pickResult.pickedMesh.position.x, 0);
                BABYLON.Animation.CreateAndStartAnimation('shipmoveY', ship, 'position.y', 30, 30, ship.position.y, pickResult.pickedMesh.position.y, 0);
                BABYLON.Animation.CreateAndStartAnimation('shipmoveZ', ship, 'position.z', 30, 30, ship.position.z, height + 1, 0);
                // hl.addMesh(ship, BABYLON.Color3.Green());

            }
        })

        scene.registerAfterRender(() => {
            var delta = clock.getDelta();
            var move = 0;
            input.checkInputs()
            // polygons.forEach((element) => {
            //     move += delta
            //     var actualmove = move % 2 * Math.PI;
            //     (element as BABYLON.Mesh).translate(new BABYLON.Vector3(1,0,1), Math.sin(actualmove/(2 * Math.PI)), BABYLON.Space.WORLD)
            // })

        })

        scene.registerBeforeRender(() => {
            // input.checkInputs();
        })
        return scene
    }
}