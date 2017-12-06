import { ActionType,IAction } from "./";
export abstract class PlayerAction implements IAction {
    type: ActionType = ActionType.PlayerAction
    gameID: string;
    userID: string;
    constructor(gameID:string, userID:string){
        this.gameID = gameID
        this.userID= userID
    }
    validate(){
        if(this.type == undefined) return false;
        if(this.gameID == undefined) return false;
        if(this.userID == undefined || this.userID.length == 0) return false;
        return true;
    }
}