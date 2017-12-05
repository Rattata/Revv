import {IInputHandler} from "./IInputHandler"
import { GameScene } from "../../Scenes/GameScene";
import * as _ from "lodash"
import { Entity } from "modules/core/Entity";
export class MoveActionHandler implements IInputHandler{
    
    handleMouse(mouseEvent:MouseEvent, scene:GameScene){
        var pickresult = scene.pick(scene.pointerX, scene.pointerY)
        if(pickresult.hit){
            var entity = scene.getEntityMap().get(pickresult.pickedMesh.id);
            var oldhex = entity.getHex();
            _.findIndex(oldhex.container, function(o:Entity){
                return entity.getEntityIdentifier() == o.entityID
            })
            
            
            scene.getMeshByID(pickresult.pickedMesh.id)

            
        }
    }
}