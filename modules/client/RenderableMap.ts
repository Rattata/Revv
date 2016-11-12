import {Map} from "../core/Map"
import {Hex} from '../core/Hex'
export class RenderableMap extends Map  {
    constructor(underlyingmap : Array<Array<Hex>>){
        super(underlyingmap);
    }
}