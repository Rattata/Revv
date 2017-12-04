import { PlayerAction, ActionType } from "./index";

export abstract class TurnAction extends PlayerAction{
    turnID : number
    constructor(gameID:string, userID:string, turnID:number){
        super(gameID, userID)
        this.type = ActionType.MoveAction
        this.turnID = turnID
    }
} 