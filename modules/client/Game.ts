export class Game {
    engine: BABYLON.Engine = null
    canvas: any = null
    scene: BABYLON.Scene = null
    state = null

    constructor(canvas: any) {
        this.canvas = canvas
        this.engine = new BABYLON.Engine(canvas, false)
        window.addEventListener('resize', () => {
            this.engine.resize();
        });
        this.createMenu();
    };

    createMenu(): void {
        this.scene = new BABYLON.Scene(this.engine);
        var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -5), this.scene)
        camera.setTarget(BABYLON.Vector3.Zero())
        camera.attachControl(this.canvas, false)
        var light0 = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(0, -1, 0), this.scene);
        var shadowGenerator = new BABYLON.ShadowGenerator(1024, light0)
        var sphere = BABYLON.Mesh.CreateCylinder('cylinder', 1, 1, 1, 6, 10, this.scene, false);
        sphere.position.y = 0
    }
    run(): void {
        var scene = this.scene;
        this.engine.runRenderLoop(function () {
            scene.render()
        });
    }
}