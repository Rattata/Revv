import { ITerrain } from "../Terrain/ITerrain";
import { Entity, IHexType } from "../../core/Entity";

export class Hex extends Entity implements IHexType{
    
    public _Q : number;
    public _R : number;
    public _S : number;
    public _X : number;
    public _Y : number;
    
    public terrainType: ITerrain
    
    constructor(Q? : number, R? : number, _S? : number, _X?:number, _Y?:number) {
        super();
        this._Q = Q
        this._R = R
        this._S = -Q - R
        this._X = _X
        this._Y = _Y
        if (this._Q + this._R + this._S != 0) {
            console.error(this)
            // throw "Violates Q+R+S=0 constraint!"
        }
    }

    equals(A, B) {
        if (A._Q === B._Q && A._R === B._R && A._S === B._S) {
            return true
        }
        return false
    }

    hex_add(a, b) {
        return new Hex(a._Q + b._Q, a._R + b._R, a._S + b._S)
    }
    hex_subtract(a, b) {
        return new Hex(a._Q - b._Q, a._R - b._R, a._S - b._S)
    }
    hex_multiply(a, f) {
        return new Hex(a._Q * f, a._R * f, a._S * f)
    }
    hex_length(a) {
        return new Number(Math.abs(a._Q) + Math.abs(a._R) + Math.abs(a._S) / 2)
    }
    hex_distance(a, b) {
        return this.hex_length(this.hex_subtract(a, b))
    }
    
}