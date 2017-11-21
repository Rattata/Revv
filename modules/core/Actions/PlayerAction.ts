import {IAction} from "./IAction"
interface IPlayerAction extends IAction {
    gameID(): string;
    userID(): string;
}