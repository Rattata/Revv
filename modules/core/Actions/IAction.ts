import {ActionType} from "../../core/Actions/ActionTypes";
export interface IAction {
    type: ActionType
    validate(): boolean
}