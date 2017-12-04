import {ClientShip} from "./ClientShip"
import { Hex } from "../../core/Terrain";
import {ShipMeshFactory, IRenderTerrain} from "../Drawable"
export class ShipFactory {
    buildTestShip(location: IRenderTerrain, scene:BABYLON.Scene , name:string ): ClientShip {
       
        var ship :ClientShip  = new ClientShip(location)
        
        return 
    }
}