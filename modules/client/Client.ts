import { Tile } from "./Tile"

function main(canvas) {
    var engine = new BABYLON.Engine(canvas, false)
    var currentScene = new BABYLON.Scene(engine)

    // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
    var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), currentScene)

    // target the camera to currentScene origin
    camera.setTarget(BABYLON.Vector3.Zero())

    // attach the camera to the canvas
    camera.attachControl(canvas, false)

    // create a basic light, aiming 0,1,0 - meaning, to the sky
    var light0 = new BABYLON.HemisphericLight("Dir0", new BABYLON.Vector3(0, 1, 0), currentScene);
    //var shadowGenerator = new BABYLON.ShadowGenerator(1024, light0);
    // create a built-in "sphere" shape its constructor takes 5 params: name, width, depth, subdivisions, currentScene
    var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, currentScene)
    

    // move the sphere upward 1/2 of its height
    sphere.position.y = 1

    // create a built-in "ground" shape its constructor takes the same 5 params as the sphere's one
    var ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, currentScene)
    //shadowGenerator.getShadowMap().renderList.push(sphere);
    //shadowGenerator.bias = 0.01;
    ground.receiveShadows = true;
    engine.runRenderLoop(function () {
        currentScene.render()
    })
    
}

window.addEventListener('DOMContentLoaded', function () {
    main(document.getElementById('main'))
})

