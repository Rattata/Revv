import {Entity} from "./Entity"
import {MoveAction} from "../Actions"
export interface IMovable{
    move():MoveAction
}