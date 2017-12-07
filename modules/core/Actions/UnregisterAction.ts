import {IAction} from "./IAction";
import {ActionType} from "./ActionTypes"

export class UnregisterAction implements IAction {
    type: ActionType = ActionType.UnregisterAction;
    playerId: number = undefined;
    validate():boolean{
        if(this.type == undefined) return false;
        if(this.playerId == undefined) return false;
        return true;
    }
}