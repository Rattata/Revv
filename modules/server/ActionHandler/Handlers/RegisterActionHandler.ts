import {IActionHandler} from "../IActionHandler";
import {IAction} from "../../../core/Actions/IAction";
import {ActionType} from "../../../core/Actions/ActionTypes";
import RegisterAction from "../../../core/Actions/RegisterAction";
import { injectable, inject } from "inversify";


@injectable()
export default class RegisterActionHandler implements IActionHandler {
     handle(msg : IAction): void{
         console.log("try to handle this")
     };

    version(): string{return "1"};

    canHandler(actionType : ActionType):boolean{
        return false;
    };
}