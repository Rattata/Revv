import RegisterAction from "../core/Actions/RegisterAction"
export class Game {
    static currentGame: Game
    engine: BABYLON.Engine = null
    static canvas: any = null
    scene: BABYLON.Scene = null
    state = null
    quit = false

    constructor(canvas: any) {
        //test websocket upgrade
        var ws = new WebSocket('ws://localhost:3000/echo');
        ws.onmessage = function(event: MessageEvent){
            console.log(event)
        };
        ws.onopen = function (event) {
            var toSend = new RegisterAction();
            
            ws.send(JSON.stringify(toSend)); 
        };
        
        Game.canvas = canvas
        this.engine = new BABYLON.Engine(canvas, false,null, false)
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
        var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(6, 2.25, -3), scene)
        camera.setTarget(new BABYLON.Vector3(6, 2.5, 0))
        var light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);
        // light.diffuse = new BABYLON.Color3(0.2, 0.2, 0.25)
        // light.specular = new BABYLON.Color3(0.16, 0.16, 0.16)
        // light.groundColor = new BABYLON.Color3(0.1, 0.05, 0.05)

        var traingle = BABYLON.MeshBuilder.CreatePolyhedron("ship", { type: 0, size: 0.25 }, scene);
        traingle.setAbsolutePosition(new BABYLON.Vector3(6, 3, -1.1))

      
        traingle.scaling.x = 1.5
        traingle.rotation.z = Math.PI / 2
        traingle.rotation.x = Math.PI
        var movable = BABYLON.Mesh.CreateCylinder("cyclinder", 1, 1, 1, 6, 0, scene)
        // movable.material = material;
        movable.rotation = new BABYLON.Vector3(-Math.PI / 2, 0, 0)
        movable.setAbsolutePosition(new BABYLON.Vector3(0, 0, 0))
        var array: Array<BABYLON.InstancedMesh> = []
        for (var i = 1; i < 11; i++) {
            for (var j = 1; j < 11; j++) {
                var temp: BABYLON.Vector3
                if (j % 2 === 1) {
                    temp = new BABYLON.Vector3(0.75 + i * 1.5, j * 0.43, Math.floor(Math.random() * 10) / 10)
                } else {
                    temp = new BABYLON.Vector3(i * 1.5, j * 0.43, Math.floor(Math.random() * 10) / 10)

                }
                var clone = movable.createInstance("name" + i + j)
                clone.setAbsolutePosition(temp)
                array.push(clone)
            }
        }
        var underbar = 0
        var sway = 0
        scene.registerAfterRender(() => {
            var clock = {
                before: performance.now(),
                getDelta: function () {
                    var now = performance.now();
                    var delta = now - this.before;
                    this.before = now;
                    return delta;
                }
            }

        })
        return scene
    }
}