import { Container } from "inversify";
import { TYPES } from "./server.types";
import { ActionRouter } from "./ActionHandler/ActionRouter";
import { IActionHandler } from "./ActionHandler/IActionHandler";
import RegisterActionHandler from "./ActionHandler/RegisterActionHandler";
import RegisterAction from "../core/Actions/RegisterAction";

const myContainer = new Container();
myContainer.bind<ActionRouter>(TYPES.ActionRouter).toConstantValue(new ActionRouter());
myContainer.bind<IActionHandler<RegisterAction>>(TYPES.IActionHandler).to(RegisterActionHandler);

export {myContainer};