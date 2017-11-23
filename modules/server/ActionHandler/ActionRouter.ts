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
  
    route(msg : string){
      
        var json_message = undefined;
        try {
          json_message = JSON.parse(msg);
        } catch (error) {}
        
        if(json_message != undefined || json_message.type == undefined){
            return
        }

      var handler = myContainer.getNamed<IActionHandler>(TYPES.IActionHandler, json_message.type);
      if(handler != undefined){
        handler.handle(json_message);
      } else {
          console.error("no appropriate handler found for message!");
      }

    }

    version  (): string{
        return "1.0";
    }
}

export {ActionRouter}