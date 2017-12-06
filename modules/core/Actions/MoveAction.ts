import {PlayerAction, ActionType, IHasTarget, IHasOrigin} from "./"
import { TurnAction } from "./TurnAction";
export class MoveAction extends TurnAction implements IHasTarget, IHasOrigin{
    type = ActionType.MoveAction

    constructor(gameID:string, userID:string, turnID:number){
        super(gameID, userID,turnID)
    }
    originX: number;
    originY: number;
    targetX:number
    targetY:number
    
}