export class Game {
    static currentGame : Game
    engine: BABYLON.Engine = null
    static canvas: any = null
    scene: BABYLON.Scene = null
    state = null

    constructor(canvas: any) {
        Game.canvas = canvas
        this.engine = new BABYLON.Engine(canvas, false)
        window.addEventListener('resize', () => {
            this.engine.resize()
        })
        Game.currentGame = this
        this.scene = this.createMenu(this.engine)
        this.switchScene(this.scene) 
    }

    switchScene(newScene : BABYLON.Scene){
        this.engine.stopRenderLoop()
        var scene = newScene
        this.scene = newScene
        this.engine.runRenderLoop(() => {
            scene.render()
        })
    }
    
    createMenu(engine : BABYLON.Engine): BABYLON.Scene {
        var scene = new BABYLON.Scene(engine)
        var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -5), scene)
        camera.setTarget(BABYLON.Vector3.Zero())
        camera.attachControl(Game.canvas, false)
        var light0 = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(0, -1, 0), scene)
        var shadowGenerator = new BABYLON.ShadowGenerator(1024, light0)
        var sphere = BABYLON.Mesh.CreateCylinder('cylinder', 1, 1, 1, 6, 10, scene, false)
        sphere.position.y = 0
        return scene
    }
}