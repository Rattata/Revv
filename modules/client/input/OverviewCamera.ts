export class OverviewCamera implements BABYLON.ICameraInput<BABYLON.FreeCamera> {
    // the input manager will fill the parent camera
    camera: BABYLON.FreeCamera;
    private _keys = new Array();
    private _onKeyUp: any;
    private _onKeyDown: any;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    
    
    public keysUp =  [87];
    public keysDown = [83];
    public keysLeft = [65];
    public keysRight = [68];
    

    //this function must return the type name of the camera, it could be used for serializing your scene
    public getTypeName() { return "inputHandler" };

    //this function must return the simple name that will be injected in the input manager as short hand
    //for example "mouse" will turn into camera.inputs.attached.mouse
    public getSimpleName() { return "inputHandler" }

    constructor(camera: BABYLON.FreeCamera){
        this.camera = camera;
        this._keys = new Array();
        this.keysUp =  [87];
        this.keysDown = [83];
        this.keysLeft = [65];
        this.keysRight = [68];
    }

    //this function must activate your input, event if your input does not need a DOM element
    attachControl(element: HTMLElement, noPreventDefault?: boolean) {
        var _this = this;
        
        // this._scene = this.camera.getScene();
        // this._engine = this._scene.getEngine();
        
        if (!(this as any)._onKeyDown) {
            // element.tabIndex = 1;
            this._onKeyDown = function (evt) {
                if (_this.keysLeft.indexOf(evt.keyCode) !== -1 || _this.keysRight.indexOf(evt.keyCode) !== -1 || _this.keysUp.indexOf(evt.keyCode) !== -1 || _this.keysDown.indexOf(evt.keyCode) !== -1) {
                    var index = _this._keys.indexOf(evt.keyCode);
                    if (index === -1) {
                        _this._keys.push(evt.keyCode);
                    }
                    if (!noPreventDefault) {
                        evt.preventDefault();
                    }
                }
            };
            this._onKeyUp = function (evt) {
                if (_this.keysLeft.indexOf(evt.keyCode) !== -1 || _this.keysRight.indexOf(evt.keyCode) !== -1|| _this.keysUp.indexOf(evt.keyCode) !== -1 || _this.keysDown.indexOf(evt.keyCode) !== -1) {
                    var index = _this._keys.indexOf(evt.keyCode);
                    if (index >= 0) {
                        _this._keys.splice(index, 1);
                    }
                    if (!noPreventDefault) {
                        evt.preventDefault();
                    }
                }
            };

            window.addEventListener("keydown", this._onKeyDown, false);
            window.addEventListener("keyup", this._onKeyUp, false);
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
        }
        this._onKeyDown = null;
        this._onKeyUp = null;
        this._keys = [];
    };

    //this optional function will get called for each rendered frame, if you want to synchronize your input to rendering,
    //no need to use requestAnimationFrame. It's a good place for applying calculations if you have to
    
    checkInputs() {
        var _this = this
        var movementSpeed = 0.5;
        for (var index = 0; index < this._keys.length; index++) {
            var keyCode = this._keys[index];
            if (this.keysLeft.indexOf(keyCode) !== -1) {
                this.camera._currentTarget.addInPlace(new BABYLON.Vector3(-movementSpeed,0,0))
                this.camera.position.addInPlace(new BABYLON.Vector3(-movementSpeed,0,0))
            } else if (this.keysDown.indexOf(keyCode) !== -1) {
                this.camera._currentTarget.addInPlace(new BABYLON.Vector3(0,-movementSpeed,0))
                this.camera.position.addInPlace(new BABYLON.Vector3(0,-movementSpeed,0))
            } else if (this.keysRight.indexOf(keyCode) !== -1) {
                this.camera._currentTarget.addInPlace(new BABYLON.Vector3(movementSpeed,0,0))
                this.camera.position.addInPlace(new BABYLON.Vector3(movementSpeed,0,0))
            } else if (this.keysUp.indexOf(keyCode) !== -1) {
                this.camera._currentTarget.addInPlace(new BABYLON.Vector3(0,movementSpeed,0))
                this.camera.position.addInPlace(new BABYLON.Vector3(0,movementSpeed,0))
            }
        }
        return
    };
}