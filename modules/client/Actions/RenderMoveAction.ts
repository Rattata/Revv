import { MoveAction } from "../../core/Actions/index";
import { IHasMesh } from "Drawable";
import { inject } from "inversify/dts/annotation/inject";
import { TYPES } from "clienttypes";
import { GameScene } from "Scenes/GameScene";

export class RenderMoveAction extends MoveAction implements IHasMesh{
    constructor(@inject(TYPES.GameScene) scene : GameScene){
        super(scene.getGameID(), scene.getUserID(), scene.getTurnID())
        BABYLON.MeshBuilder.CreateLines
        
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