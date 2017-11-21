import {IActionHandler} from "./IActionHandler";
import {IAction} from "../../core/Actions/IAction";
import {ActionType} from "../../core/Actions/ActionTypes"

class ActionHandler implements IActionHandler {
    //register handlers
    constructor(){
      for (var entry in ActionType) { 
            // use entry's name here, e.g., "entry1"
      }
    }

    handle(msg : IAction){
         
    }

    version  (): string{
        return "1.0";
    }
}
export {ActionHandler}