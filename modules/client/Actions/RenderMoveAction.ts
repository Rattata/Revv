import { MoveAction } from "../../core/Actions/index";
import { IHasMesh } from "Drawable";
import { inject } from "inversify/dts/annotation/inject";
import { CLIENT_TYPES } from "clienttypes";
import { GameScene } from "Scenes/GameScene";
import { IHasActionMesh } from "./IHasActionMesh";

export class RenderMoveAction extends MoveAction implements IHasActionMesh{
    constructor(scene : GameScene){
        super(scene.getGameID(), scene.getUserID(), scene.getTurnID())

    }

    setMesh(mesh : BABYLON.Mesh){
        this.mesh = mesh
    }
    
    private mesh : BABYLON.Mesh
    getMesh() : BABYLON.Mesh {
        return this.mesh
    }

    validate():boolean{
        if(this.mesh == undefined) return false;
        return true
    }
}