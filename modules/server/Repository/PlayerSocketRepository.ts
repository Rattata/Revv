import { injectable, inject } from "inversify";
import * as Models from "../Model"

@injectable()
export class PlayerSocketRepository{
    map: Map<number,Models.Player>
    constructor(){
        this.map = new Map<number,Models.Player>();
    }
}