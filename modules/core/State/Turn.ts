import * as Stack from "ts-data.stack"
import {IAction, IPlayerAction} from "../Actions"
export class Turn{
    playerID : string;
    Actions: Stack<IPlayerAction>
}