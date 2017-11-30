import Stack from "ts-data.stack"
import { IAction } from "../core/Actions";
interface ITurn {
    turnNumber(): number
    startDelta(): number
    nextTurnDelta():number
    getActionStack(): Stack<IAction>
}