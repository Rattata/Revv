import { PlayerAction, ActionType, IHasTarget, IHasOrigin, IActionHasPlayer, IAction } from "./"
import { IHasMesh } from "Drawable";

export class MoveAction implements IAction, IHasTarget, IHasOrigin, IActionHasPlayer {
    type = ActionType.MoveAction
    userSecret: string = ""
    gameID: string = ""
    userID: string = ""
    turnID: number = -1

    constructor(gameID: string, userID: string, turnID: number) {
        this.gameID = gameID
        this.userID = userID
        this.turnID = turnID
    }

    originX: number = -1
    originY: number = -1
    targetX: number = -1
    targetY: number = -1

    validate(): boolean {
        if (this.originX == -1) return false
        if (this.originY == -1) return false
        if (this.targetX == -1) return false
        if (this.targetY == -1) return false
        if (this.userSecret == "") return false
        if (this.gameID == "") return false
        return true
    }

}