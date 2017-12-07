import {IInputHandler} from "./IInputHandler"
import { GameScene } from "../../Scenes/GameScene";
import * as _ from "lodash"
import { Entity, IHexType, IMovable, IHasPosition } from "../../../core/Entity";
import { EntityRegister } from "../../../core/EntityRegister";
import { IAction, MoveAction } from "../../../core/Actions/index";
import { inject } from "inversify";
import { CLIENT_TYPES } from "../../clienttypes";
import { ActionBuilder } from "../../Actions/ActionBuilder";
import { RenderMoveAction } from "../../Actions/RenderMoveAction";
import { myContainer } from "inversify.config";
import { IInputContext } from "Input";
import { MeshFactory } from "../../Mesh";
import { injectable } from "inversify";

@injectable()
export class MoveActionHandler implements IInputHandler {

    private movementPointer : BABYLON.Mesh
    private EntityRegister : EntityRegister
    public movedItem : IInputContext
    private action : IAction
    private actionBuilder: ActionBuilder
    private scene : GameScene

    constructor(@inject(CLIENT_TYPES.GameScene) scene : GameScene, @inject(CLIENT_TYPES.EntityRegister) entityRegister: EntityRegister){
        this.scene = scene
        this.EntityRegister = entityRegister
    }

    handleMouse(mouseEvent:MouseEvent, scene:GameScene){
        if(mouseEvent.button != 0) return false;
        var pickresult = scene.pick(scene.pointerX, scene.pointerY)
        if(pickresult.hit){
            var target : any = this.EntityRegister.getByEntityID(parseInt(pickresult.pickedMesh.name));
            var origin : any = this.movedItem.getThis()
            if((<IHexType>target)._X){
                var hex = target as IHexType
                this.doMovement(hex._X, hex._Y, <IMovable>origin)
            }
        }
    }

    private doMovement(X:number, Y:number, toBeMoved:IMovable){
        
        var entity : any = this.EntityRegister.getByXY(X,Y)
        var target = MeshFactory.HexPosition_to_screenPosition(X,Y)
        var origin = MeshFactory.HexPosition_to_screenPosition(toBeMoved.getX(),toBeMoved.getY())
        ActionBuilder.beginMovement()
        .setTarget(X,Y)
        .setMesh(this.createMesh(origin[0], origin[1], target[0], target[1]))
        .setOrigin(toBeMoved.getX(), toBeMoved.getY())
        .buildEnqueue()

    }

    private createMesh (originX : number, originY: number, targetX: number, targetY : number) : BABYLON.Mesh{
        var height = 6
        var ops = {points: [new BABYLON.Vector3(originX, originY, height), new BABYLON.Vector3(targetX, targetY, height)]}
        let tempMesh = BABYLON.MeshBuilder.CreateLines("action",ops, this.scene)
        let tempMaterial = new BABYLON.StandardMaterial("tempmat",this.scene)
        tempMaterial.emissiveColor = BABYLON.Color3.Black()
        tempMesh.material = tempMaterial
        return tempMesh
    }
}