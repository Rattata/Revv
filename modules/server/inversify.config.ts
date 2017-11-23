
import { Container } from "inversify";

import { TYPES} from "./server.types";
import { ActionRouter } from "./ActionHandler/ActionRouter";
import { IActionHandler } from "./ActionHandler/IActionHandler";
import RegisterActionHandler from "./ActionHandler/Handlers/RegisterActionHandler";
import RegisterAction from "../core/Actions/RegisterAction";
import {ActionType} from "../core/Actions/ActionTypes"

const myContainer = new Container();
myContainer.bind<ActionRouter>(TYPES.ActionRouter).to( ActionRouter);
myContainer.bind<IActionHandler>(TYPES.IActionHandler).to(RegisterActionHandler).whenTargetNamed(ActionType.RegisterAction.toString());

export {myContainer};