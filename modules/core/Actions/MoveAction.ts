import {PlayerAction, ActionType} from "./"
import { TurnAction } from "./TurnAction";
export class MoveAction extends TurnAction{
    type = ActionType.MoveAction

    constructor(gameID:string, userID:string, turnID:number){
        super(gameID, userID,turnID)
    }
    
    entityID: string;
    gameID: string;
    userID: string;
    
}