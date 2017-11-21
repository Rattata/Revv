import {IAction} from "../../core/Actions/IAction";

interface IActionHandler{
    handle(msg : IAction): void;
    version(): string;
}

export {IActionHandler};