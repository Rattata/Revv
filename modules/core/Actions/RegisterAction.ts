import {IAction} from "./IAction";
import {ActionType} from "./ActionTypes"

class RegisterAction implements IAction {
    type: ActionType = ActionType.RegisterAction;
}