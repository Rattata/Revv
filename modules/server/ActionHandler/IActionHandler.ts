import {IAction} from "../../core/Actions/IAction";
import {ActionType} from "../../core/Actions/ActionTypes";

interface IActionHandler<T extends IAction>{
    handle(msg : IAction): void;

    version(): string;

    canHandler(actionType : ActionType):boolean;
}

export {IActionHandler};