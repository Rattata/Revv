import {Entity} from "../Entity"
export interface ITerrain {
    TerrainName() : string
    container : Array<Entity>
    height():number
}