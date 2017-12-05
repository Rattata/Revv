import { injectable, inject } from "inversify";
import { myContainer } from "../inversify.config";
import { IInputContext } from "../Input/IInputContext";
import {EntityRegister} from "../../core/EntityRegister"

import {IVariableRender, ShipMeshFactory, IRenderTerrain} from "../Drawable"
import { Hex } from "../../core/Terrain";
import { TYPES } from "../types";
import { GameScene } from "../Scenes/GameScene";
import { Entity, IMovable } from "../../core/Entity";
import { MoveAction } from "../../core/Actions";
import { MeshFactory } from "../Mesh";

export class ClientShip extends Entity implements IInputContext, IVariableRender, IMovable {

    public mesh: BABYLON.Mesh
    
    public gameScene : GameScene

    @inject(TYPES.EntityRegister)
    private entityRegister: EntityRegister

    constructor(X?:number, Y?:number) {
        super();
        this.gameScene = myContainer.get<GameScene>(TYPES.GameScene);
        this.entityRegister.add(X == undefined ? 0 : X, Y == undefined ? 0 : Y, this)
        this.mesh = new ShipMeshFactory().shipMesh(this.gameScene, this.getEntityID().toString())
        var positions = MeshFactory.HexPosition_to_screenPosition(X == undefined ? 0 : X, Y == undefined ? 0 : Y)
        this.mesh.position.x = positions[0]
        this.mesh.position.y = positions[1]
        this.mesh.position.z =  10
        console.log(this)
    }

    public setPosition(){

    }

    update(): void {

    }

    move():MoveAction{
        return
    }

    children(): Array<IInputContext> {
        return
    }

    captureMouse(mouseEvent: MouseEvent, scene:GameScene): boolean {
        return false
    }

    captureKey(keyEvents: Array<number>, scene:GameScene): boolean {
        return false
    }
    
    captureScroll?(wheelEvent: WheelEvent, scene:GameScene): boolean {
        return false
    }

}