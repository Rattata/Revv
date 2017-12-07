
import { myContainer } from "../inversify.config";
import { IInputContext } from "../Input/IInputContext";
import {EntityRegister} from "../../core/EntityRegister"

import {IHasMesh, ShipMeshFactory} from "../Drawable"
import { Hex } from "../../core/Terrain";
import { CLIENT_TYPES } from "../clienttypes";
import { GameScene } from "../Scenes/GameScene";
import { Entity, IMovable } from "../../core/Entity";
import { MoveAction } from "../../core/Actions";
import { MeshFactory } from "../Mesh";
import { MoveActionHandler } from "Input/InputHandler/MoveActionHandler";

export class ClientShip extends Entity implements IInputContext, IHasMesh, IMovable {


    public mesh: BABYLON.Mesh
    getMesh():BABYLON.Mesh{
        return this.mesh
    }

    public gameScene : GameScene
    
    private entityRegister: EntityRegister
    private moveActionHandler : MoveActionHandler

    constructor(X?:number, Y?:number) {
        super();
        this.gameScene = myContainer.get<GameScene>(CLIENT_TYPES.GameScene);
        this.entityRegister = myContainer.get<EntityRegister>(CLIENT_TYPES.EntityRegister);
        this.entityRegister.add(X == undefined ? 0 : X, Y == undefined ? 0 : Y, this)
        this.mesh = new ShipMeshFactory().shipMesh(this.gameScene, this.getEntityID().toString())
        var positions = MeshFactory.HexPosition_to_screenPosition(X == undefined ? 0 : X, Y == undefined ? 0 : Y)
        this.mesh.position.x = positions[0]
        this.mesh.position.y = positions[1]
        this.mesh.position.z =  6
        this.position[0] = X == undefined ? 0 : X 
        this.position[1] = Y == undefined ? 0 : Y

    }

    private position : number[] = [0,0]
    getX() : number{
        return this.position[0]
    }

    getY() : number{
        return this.position[1]
    }

    update(): void {

    }

    getThis():any{
        return this
    }

    move(X:number, Y:number):MoveAction{
        return
    }

    getMovedEntity() : Entity {
        return this
    }


    children(): Array<IInputContext> {
        return
    }

    captureMouse(mouseEvent: MouseEvent, scene:GameScene): boolean {
        // return this.moveActionHandler.handleMouse(mouseEvent, scene);
        return false
    }

    captureKey(keyEvents: Array<number>, scene:GameScene): boolean {
        return false
    }
    
    captureScroll?(wheelEvent: WheelEvent, scene:GameScene): boolean {
        return false
    }

}