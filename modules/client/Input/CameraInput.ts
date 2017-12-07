import { IInputContext, IInfo } from "./"
import { GameScene } from "../Scenes";
import { KEYMAP } from "./KeyMap"
import * as _ from "lodash"
import { ClientShip } from "../Entity";
import {inject, injectable} from "inversify"
import {CLIENT_TYPES} from "../clienttypes"
import { EntityRegister } from "../../core/EntityRegister";
import {IHexType} from "../../core/Entity"
import { IHasMesh, IHasInstancedMesh } from "Drawable";

@injectable()
export class CameraInput implements BABYLON.ICameraInput<BABYLON.FreeCamera> {
    // the input manager will fill the parent camera
    camera: BABYLON.FreeCamera;
    private _keys = new Array();
    private _mouse: Array<MouseEvent> = new Array<MouseEvent>()
    @inject(CLIENT_TYPES.EntityRegister) private _EntityRegister: EntityRegister;
    private _scrolls = new Array();
    private _onKeyUp: any;
    private _onKeyDown: any;
    private _onScroll: any;
    private _onClick: any;
    private _engine: BABYLON.Engine;
    private _scene: GameScene;

    private Selected: IInputContext = undefined
    private Info: IInfo = undefined
    private ship: ClientShip
    public keysUp = [KEYMAP.W];
    public keysDown = [KEYMAP.S];
    public keysLeft = [KEYMAP.A];
    public keysRight = [KEYMAP.D];


    //this function must return the type name of the camera, it could be used for serializing your scene
    public getTypeName() { return "inputHandler" };

    //this function must return the simple name that will be injected in the input manager as short hand
    //for example "mouse" will turn into camera.inputs.attached.mouse
    public getSimpleName() { return "inputHandler" }

    constructor(@inject(CLIENT_TYPES.Camera) camera: BABYLON.FreeCamera, @inject(CLIENT_TYPES.GameScene) gameScene: GameScene, @inject(CLIENT_TYPES.EntityRegister) EntityRegister: EntityRegister) {
        this.camera = camera
        this._scene = gameScene
        this._EntityRegister = EntityRegister
        this._keys = new Array()
        this._scrolls = new Array()
    }

    //this function must activate your input, event if your input does not need a DOM element
    attachControl(element: HTMLElement, noPreventDefault?: boolean) {
        var _this = this

        // this._scene = this.camera.getScene();
        // this._engine = this._scene.getEngine();

        if (!(this as any)._onKeyDown) {
            // element.tabIndex = 1;
            this._onKeyDown = function (evt) {
                // console.log(evt)
                if (_this.keysLeft.indexOf(evt.keyCode) !== -1 || _this.keysRight.indexOf(evt.keyCode) !== -1 || _this.keysUp.indexOf(evt.keyCode) !== -1 || _this.keysDown.indexOf(evt.keyCode) !== -1) {
                    var index = _this._keys.indexOf(evt.keyCode)
                    if (index === -1) {
                        _this._keys.push(evt.keyCode)
                    }
                    if (!noPreventDefault) {
                        evt.preventDefault()
                    }
                }
            }

            this._onKeyUp = function (evt) {
                if (_this.keysLeft.indexOf(evt.keyCode) !== -1 || _this.keysRight.indexOf(evt.keyCode) !== -1 || _this.keysUp.indexOf(evt.keyCode) !== -1 || _this.keysDown.indexOf(evt.keyCode) !== -1) {
                    var index = _this._keys.indexOf(evt.keyCode);
                    if (index >= 0) {
                        _this._keys.splice(index, 1);
                    }
                    if (!noPreventDefault) {
                        evt.preventDefault();
                    }
                }
            }

            this._onScroll = function (evt: WheelEvent) {
                _this._scrolls.push(evt.wheelDelta)

            }

            this._onClick = function (click: MouseEvent) {
                _this._mouse.push(click)
            }

            window.addEventListener("keydown", this._onKeyDown, false);
            window.addEventListener("keyup", this._onKeyUp, false);
            window.addEventListener("wheel", this._onScroll, false);
            window.addEventListener("click", this._onClick, false);
            // BABYLON.Tools.RegisterTopRootEvents([
            //     { name: "blur", handler: this._onLostFocus }
            // ]);
        }
    };

    detachControl(element: HTMLElement) {
        console.log("detaching input")
        if (this._scene) {
            window.removeEventListener("keydown", this._onKeyDown)
            window.removeEventListener("keyup", this._onKeyUp)
            window.removeEventListener("wheel", this._onScroll)
            window.removeEventListener("click", this._onClick)
        }
        this._onKeyDown = null;
        this._onKeyUp = null;
        this._keys = [];
    };

    //this optional function will get called for each rendered frame, if you want to synchronize your input to rendering,
    //no need to use requestAnimationFrame. It's a good place for applying calculations if you have to

    customInputs(scene: GameScene) {
        var _this = this

        var movementSpeed = 0.5

        for(var index = 0 ;index < _this._mouse.length; index++){
            var mouseEvent: MouseEvent = _this._mouse[index]
            // console.log(mouseEvent)
            if (_this.Selected == undefined || !_this.Selected.captureMouse(mouseEvent,_this._scene)) {
                var pickResult = scene.pick(scene.pointerX, scene.pointerY);
                // if (pickResult.hit) {
                //     var meshID = pickResult.pickedMesh.id
                //     var entity = this._EntityRegister.getByEntityID(parseInt(pickResult.pickedMesh.name))
                    
                //     if((<IHasMesh>entity).getMesh){
                //         scene._highlight.addMesh(entity.mesh,new BABYLON.Color3(0,0,255))
                //     }

                //     if((<IHasInstancedMesh>entity).getInstancedMesh){
                        
                //     }
                // }
            };
        }
        _this._mouse = new Array<MouseEvent>()

        for (var index = 0; index < this._keys.length; index++) {
            var keyCode = this._keys[index];
            if (keyCode == KEYMAP.Q.valueOf()) {
                _this.Selected = undefined
            }
            if (_this.Selected != undefined) {
                if (_this.Selected.captureKey(_this._keys[index],_this._scene)) continue;
            }
            if (this.keysLeft.indexOf(keyCode) !== -1) {
                this.camera._currentTarget.addInPlace(new BABYLON.Vector3(movementSpeed, 0, 0))
                this.camera.position.addInPlace(new BABYLON.Vector3(movementSpeed, 0, 0))
            } else if (this.keysDown.indexOf(keyCode) !== -1) {
                this.camera._currentTarget.addInPlace(new BABYLON.Vector3(0, -movementSpeed, 0))
                this.camera.position.addInPlace(new BABYLON.Vector3(0, -movementSpeed, 0))
            } else if (this.keysRight.indexOf(keyCode) !== -1) {
                this.camera._currentTarget.addInPlace(new BABYLON.Vector3(-movementSpeed, 0, 0))
                this.camera.position.addInPlace(new BABYLON.Vector3(-movementSpeed, 0, 0))
            } else if (this.keysUp.indexOf(keyCode) !== -1) {
                this.camera._currentTarget.addInPlace(new BABYLON.Vector3(0, movementSpeed, 0))
                this.camera.position.addInPlace(new BABYLON.Vector3(0, movementSpeed, 0))
            }
        }
        for (var index = 0; index < this._scrolls.length; index++) {
            if (this.Selected == undefined ||
                this.Selected.captureScroll != undefined &&
                !this.Selected.captureScroll(this._scrolls[index],_this._scene)) {
                this.camera.position.addInPlace(new BABYLON.Vector3(0, 0, -this._scrolls[index] / 20))
            }
        }
        this._scrolls = new Array()
        return
    }
}