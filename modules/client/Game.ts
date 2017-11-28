import * as Actions from "../core/Actions"
import { myContainer } from "./inversify.config";
import { TYPES } from "./types";
import { OverviewCamera } from "./input/OverviewCamera"
import { interfaces } from "inversify/dts/interfaces/interfaces";

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
        
        var light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);
        // light.diffuse = new BABYLON.Color3(0.2, 0.2, 0.25)
        // light.specular = new BABYLON.Color3(0.16, 0.16, 0.16)
        // light.groundColor = new BABYLON.Color3(0.1, 0.05, 0.05)
        var hR = 1;
        var offset = 15;
        var hwidth = hR * 2;
        var hdist = hwidth * (3 / 4)
        var hheight = (Math.sqrt(3) / 2) * hwidth

        function genpolygon(x, y, radius, height, npoints) {
            var angle = Math.PI * 2 / npoints;
            var points = [];
            for (var a = 0; a < Math.PI * 2; a += angle) {
                var tempP = [];
                var sx = x + Math.cos(a) * radius;
                var sy = y + Math.sin(a) * radius;
                tempP.push(sx)
                tempP.push(sy)
                var tempPH = tempP.slice();
                tempP.push(0)
                tempPH.push(height)
                points.push(tempP)
                points.push(tempPH)
            }
            return points
        }


        var HexagonalPrism = {
            "name": "Hexagonal Prism",
            "category": ["Prism"],
            "vertex": genpolygon(0, 0, hR, 20, 6),
            "face": [[2,3,1,0], [4,5,3,2],[6,7,5,4],[8,9,7,6],[10,11,9,8],[0,1,11,10], [10,8,6,4,2,0], [1, 3, 5, 7, 9, 11]]
        }

        var mat = new BABYLON.StandardMaterial("mat1", scene);
        mat.alpha = 1.0;
        mat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 1.0);
        var number = 0;
        var polygons = new Array<BABYLON.Mesh>();


        var polyhedron = HexagonalPrism;

        var polygon = BABYLON.MeshBuilder.CreatePolyhedron(polyhedron.name, { custom: polyhedron, size: 2 }, scene);
        polygon.convertToFlatShadedMesh();
        polygon.material = mat;
        polygon.position.x = 0;
        polygon.position.y = 0;
        polygon.position.z = 0;
        // polygon.rotation.x = Math.PI * 2 /8
        // polygon.rotation.y = Math.PI * 2 /2
        polygon.rotation.z = Math.PI * 2 / 2
        number++
        polygons.push(polygon);

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