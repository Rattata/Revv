import {injectable, inject} from "inversify"
import { CLIENT_TYPES } from "../clienttypes";
import { GameScene } from "../Scenes/GameScene";
import {myContainer} from "../inversify.config"
import { IAction, IHasTarget, MoveAction } from "../../core/Actions/index";
import { IHasMesh } from "Drawable";
import { IHasActionMesh, RenderMoveAction } from "./";

@injectable()
export class ActionBuilder {
    private scene : GameScene
    private constructor( scene:GameScene){
        this.scene = scene
    }

    private setBasics(){}

    public action : any
    static beginMovement() : ActionBuilder{
        let gameScene = myContainer.get<GameScene>(CLIENT_TYPES.GameScene);
        var actionBuilder = new ActionBuilder(gameScene);
        actionBuilder.action = new RenderMoveAction(gameScene);
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
            console.error("action does not implement IHasMesh iface")
        }
        return this;
    }

    buildEnqueue():boolean{
        if(this.action.validate()){
            //push to actionstack
        } else {
            console.error("action failed validation")
            console.error(this)
        }
        return true;
    }
}