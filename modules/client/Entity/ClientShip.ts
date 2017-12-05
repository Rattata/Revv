import { injectable, inject } from "inversify";
import { myContainer } from "../inversify.config";
import { MovableEntity } from "../../core/Entity/MovableEntity"
import { IInputContext } from "../Input/IInputContext";
import {IVariableRender, ShipMeshFactory, IRenderTerrain} from "../Drawable"
import { Hex } from "../../core/Terrain";
import { TYPES } from "../types";
import { GameScene } from "../Scenes/GameScene";

export class ClientShip extends MovableEntity implements IInputContext, IVariableRender {

    public mesh: BABYLON.Mesh
    
    public gameScene : GameScene

    constructor(location: IRenderTerrain) {
        super();
        this.gameScene = myContainer.get<GameScene>(TYPES.GameScene);
        location.getHex().container.push(this)
        this.mesh = new ShipMeshFactory().shipMesh(this.gameScene, "test")
        var hexPosition = location.getMesh(this.gameScene).position
        this.mesh.position = hexPosition.clone()
        this.mesh.position.z =  10
        console.log(this)
    }

    public setPosition(){

    }

    update(): void {

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