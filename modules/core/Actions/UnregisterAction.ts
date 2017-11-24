import {IAction} from "./IAction";
import {ActionType} from "./ActionTypes"

export class UnregisterAction implements IAction {
    type: ActionType = ActionType.UnregisterAction;
    playerId: number = undefined;
}