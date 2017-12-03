import {MovableEntity} from "../../core/Entity/MovableEntity"
import { ISelectable } from "../input/ISelectable";
import { IInputContext } from "modules/client/Input/InputContext";

class ClientShip extends MovableEntity implements IInputContext {
        
    children():Array<IInputContext>{
        return
    }
    
    capture(event: Array<any>) : boolean {
        return false
    }
}