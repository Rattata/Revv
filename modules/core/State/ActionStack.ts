import {IAction} from "../Actions"
export class ActionStack {
    private actionStack : any[]
    push(action : IAction) : void {
        this.actionStack.push(action)
    }
}