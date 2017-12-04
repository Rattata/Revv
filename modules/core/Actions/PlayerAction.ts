import { ActionType,IAction } from "./";
export abstract class PlayerAction implements IAction {
    type: ActionType = ActionType.PlayerAction
    gameID: string;
    userID: string;
    constructor(gameID:string, userID:string){
        this.gameID = gameID
        this.userID= userID
    }
}