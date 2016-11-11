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
        this.logicLoop()
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
        var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 1, -4), scene)
        var connect = BABYLON.Mesh.CreatePlane("connect", 0.75, scene,false);
        connect.setAbsolutePosition(new BABYLON.Vector3(0,0,0))
        
        var middle  = BABYLON.Mesh.CreatePlane("exit", 0.75, scene, false);
        middle.setAbsolutePosition(new BABYLON.Vector3(0,1,0))
        
        var end= BABYLON.Mesh.CreatePlane("end", 0.75, scene, false);
        end.setAbsolutePosition(new BABYLON.Vector3(0,2,0))
        
        camera.setTarget(new BABYLON.Vector3(0,1,0))
        return scene
    }

    logicLoop(){
        var i : number = 0;
        while( i != 10){
            i++;
        }
        i = 0;
    }
}