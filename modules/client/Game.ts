import * as Actions from "../core/Actions"
import { myContainer } from "./inversify.config";
import { TYPES } from "./types";
import { OverviewCamera } from "./input/OverviewCamera"
import { interfaces } from "inversify/dts/interfaces/interfaces";
import {MeshFactory} from "./Mesh/"
import {MaterialFactory} from "./Material/MountainMaterial"
import {GeographyBuilder} from "../core/Generator/GeographyBuilder"

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


        var water = [1, 20, '#2E86C1', 'water'];
        var flatland = [2, 0, '#DAF7A6', 'flatland'];
        var mountain = [3, 20, '#BA4A00', 'mountain'];
        var predist = [water, flatland, mountain]
        
        var distribution = (function () {
            var dist = []
            predist.forEach(element => {
                for (var i = 0; i < element[1]; i++) {
                    dist.push(element[0]);
                }
            });
            return dist;
        })()

        
        var mountainMesh = MeshFactory.MountainMesh(scene)
        mountainMesh.material = MaterialFactory.getMountainMaterial(scene);
        var waterMesh = MeshFactory.WaterMesh(scene)
        waterMesh.material = MaterialFactory.getWaterMaterial(scene);
        console.log(waterMesh.getBoundingInfo().boundingBox.vectorsWorld)

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

        var mapped = new GeographyBuilder(26,26,distribution)
        .noise(4,4,distribution,0.4)
        .noise(7,7,distribution,0.3)
        .noise(9,9,distribution)
        .noise(3,3,distribution,0.5)
        // .smooth(0.2)
        .build();
        var map2 = new Array();
        for(var i = 0 ;i < mapped.length; i++){
            map2[i] = new Array()
            var yOffset = 0;
            if(i % 2 == 0){
                yOffset = MeshFactory.hheight() / 2
            }
            for(var j = 0 ;j < mapped[i].length; j++){
                var instance : BABYLON.InstancedMesh = undefined
                switch(mapped[i][j]){
                    case 1: { 
                        instance = waterMesh.createInstance("water:"+i+":"+j)
                        break; 
                     } 
                     case 2: { 
                        instance = flatMesh.createInstance("flat:"+i+":"+j)
                        break; 
                     } 
                     case 3: { 
                        instance = mountainMesh.createInstance("mountain:"+i+":"+j)
                        break; 
                     } 
                     default: { 
                        console.log("err")
                        console.log(mapped[i][j])
                        break; 
                     } 
                }
                instance.position.x = i * 3
                instance.position.y = j * MeshFactory.hheight() + yOffset
            }
        }


        var clock = {
            before: performance.now(),
            getDelta: function () {
                var now = performance.now();
                var delta = now - this.before;
                this.before = now;
                return delta;
            }
        }

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