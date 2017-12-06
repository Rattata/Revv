import {Entity} from "./Entity"
import {MoveAction} from "../Actions"
import { IHasPosition } from "./index";
export interface IMovable extends IHasPosition{
    getX():number
    getY():number
    move(X:number, Y:number)
}