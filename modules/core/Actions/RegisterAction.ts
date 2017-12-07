import {IAction} from "./IAction";
import {ActionType} from "./ActionTypes"

export class RegisterAction implements IAction {
    type: ActionType = ActionType.RegisterAction;
    playerId: number = undefined;
    validate():boolean{
        if(this.type == undefined) return false;
        if(this.playerId == undefined) return false;
        return true;
    }
}