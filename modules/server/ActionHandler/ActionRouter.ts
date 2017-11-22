import {IActionHandler} from "./IActionHandler";
import {IAction} from "../../core/Actions/IAction";
import {ActionType} from "../../core/Actions/ActionTypes"

class ActionRouter {
    
    constructor(){
      for (var entry in ActionType) { 
        //find handler     
      }
    }
    
    handle(msg : IAction){
         // find appropriate handler and instantiate
         // send msg to created handler

    }

    version  (): string{
        return "1.0";
    }
}
export {ActionRouter}