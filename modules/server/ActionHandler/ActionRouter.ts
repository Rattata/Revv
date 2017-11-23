import {IActionHandler} from "./IActionHandler";
import {IAction} from "../../core/Actions/IAction";
import {ActionType} from "../../core/Actions/ActionTypes"
import * as Handlers from "./Handlers"
import { injectable, inject } from "inversify";
import importToArray from "import-to-array";
import {myContainer} from "../inversify.config"
import {TYPES} from "../server.types"
import RegisterAction from "../../core/Actions/RegisterAction";

@injectable()
class ActionRouter {
  
    route(msg : IAction){
      
      var handler = myContainer.getNamed<IActionHandler>(TYPES.IActionHandler, msg.type.toString());

    }

    version  (): string{
        return "1.0";
    }
}

export {ActionRouter}