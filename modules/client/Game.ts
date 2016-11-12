export class Game {
    static currentGame: Game
    engine: BABYLON.Engine = null
    static canvas: any = null
    scene: BABYLON.Scene = null
    state = null
    quit = false

    constructor(canvas: any) {
        Game.canvas = canvas
        this.engine = new BABYLON.Engine(canvas, false)
        window.addEventListener('resize', () => {
            this.engine.resize()
        })
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
        var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(6, 2.3, -3.5), scene)
        var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(6, 2.8, -20), scene);
        light.diffuse = new BABYLON.Color3(0.14, 0.14, 0.20);
        light.specular = new BABYLON.Color3(0.2, 0.2, 0.2);
        light.groundColor = new BABYLON.Color3(0.1, 0.05, 0.05);
        var movable = BABYLON.Mesh.CreateCylinder("cyclinder", 1, 1, 1, 6, 0, scene);
        movable.rotation = new BABYLON.Vector3(-Math.PI / 2, 0, 0)
        movable.setAbsolutePosition(new BABYLON.Vector3(0, 0, 0))
        var array: Array<BABYLON.Mesh> = []
        for (var i = 1; i < 11; i++) {
            for (var j = 1; j < 11; j++) {
                var name;
                var temp: BABYLON.Vector3
                if (j % 2 === 1) {
                    temp = new BABYLON.Vector3(0.75 + i * 1.5, j * 0.43, Math.floor(Math.random() * 7) / 10);
                    name = "off"
                } else {
                    temp = new BABYLON.Vector3(i * 1.5, j * 0.43, Math.floor(Math.random() * 7) / 10);
                    name = "nor"
                }
                var clone = movable.clone(name + i + j);
                clone.setAbsolutePosition(temp)
                array.push(clone)
            }
        }
        var underbar = 0
        scene.registerBeforeRender(() => {
            var clock = {
                before: performance.now(),
                getDelta: function () {
                    var now = performance.now()
                    var delta = now - this.before
                    this.before = now
                    return delta
                }
            }

            var delta = clock.getDelta();
            underbar += 0.4 * delta
            underbar = underbar % 0.43 
            array.forEach(element => {
                element.position.y += 0.4 * delta
                if (element.position.y > 4.5) {
                    element.position.y = underbar
                    element.position.z = Math.floor(Math.random() * 7) / 10
                }
            })

        })
        camera.setTarget(new BABYLON.Vector3(6, 2.5, 0))
        return scene
    }
}