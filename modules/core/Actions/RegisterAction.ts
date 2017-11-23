import {IAction} from "./IAction";
import {ActionType} from "./ActionTypes"

export default class RegisterAction implements IAction {
    type: ActionType = ActionType.RegisterAction;
    playerId: number = undefined;
}