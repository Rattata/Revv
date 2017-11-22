import {IActionHandler} from "./IActionHandler";
import {IAction} from "../../core/Actions/IAction";
import {ActionType} from "../../core/Actions/ActionTypes";
import RegisterAction from "../../core/Actions/RegisterAction";

export default class RegisterActionHandler implements IActionHandler<RegisterAction> {
     handle(msg : IAction): void{};

    version(): string{return "1"};

    canHandler(actionType : ActionType):boolean{
        return false;
    };
}