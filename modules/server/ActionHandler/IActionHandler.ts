import {IAction} from "../../core/Actions/IAction";
import {ActionType} from "../../core/Actions/ActionTypes";

interface IActionHandler{
    handle(msg : IAction, done: (response: object, success : boolean )=> void): void;

    version(): string;

    canHandler(actionType : ActionType):boolean;
}

export {IActionHandler};