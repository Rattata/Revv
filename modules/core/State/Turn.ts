import {IAction, PlayerAction} from "../Actions"
export class Turn{
    turnID:number
    playerID : string;
    Actions: Array<PlayerAction>
}