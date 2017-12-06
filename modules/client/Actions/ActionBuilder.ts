import {injectable, inject} from "inversify"
import { TYPES } from "../../core/types";
import { GameScene } from "Scenes/GameScene";
import {myContainer} from "../inversify.config"
import { IAction, IHasTarget } from "../../core/Actions/index";
import { IHasMesh } from "Drawable";
import { IHasActionMesh } from "Actions";

@injectable()
export class ActionBuilder {
    private scene : GameScene
    private constructor(@inject(TYPES.GameScene) scene:GameScene){
        this.scene = scene
    }

    private action : any
    static beginMovement() : ActionBuilder{
        var actionBuilder = myContainer.get<ActionBuilder>(TYPES.ActionBuilder);

        return actionBuilder
    }

    setOrigin(X: number, Y:number) : ActionBuilder{
        return this;
    }

    setTarget(X: number, Y:number) : ActionBuilder{
        if((<IHasTarget>this.action).targetX){
            var action = (<IHasTarget>this.action)
            action.targetX = X
            action.targetY = Y
        }else {
            console.error("action does not implement IHasTarget iface")
        }
        return this;
    }

    setMesh (mesh : BABYLON.Mesh) {
        if((<IHasActionMesh>this.action).getMesh){
            var action = (<IHasActionMesh>this.action)
            action.setMesh(mesh)
        }else {
            console.error("action does not implement IHasTarget iface")
        }
        return this;
    }

    buildEnqueue():boolean{
        if(this.action.validate()){
            //push to actionstack
        }
        return true;
    }
}