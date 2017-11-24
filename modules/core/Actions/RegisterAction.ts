import {IAction} from "./IAction";
import {ActionType} from "./ActionTypes"

export class RegisterAction implements IAction {
    type: ActionType = ActionType.RegisterAction;
    playerId: number = undefined;
}