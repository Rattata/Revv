
import { Container } from "inversify";

import { TYPES} from "./server.types";
import { ActionRouter } from "./ActionHandler/ActionRouter";
import { IActionHandler } from "./ActionHandler/IActionHandler";
import RegisterActionHandler from "./ActionHandler/Handlers/RegisterActionHandler";
import RegisterAction from "../core/Actions/RegisterAction";
import {ActionType} from "../core/Actions/ActionTypes"
import {PlayerSocketRepository} from "./Repository/PlayerSocketRepository"

const myContainer = new Container();
const actionRouter = new ActionRouter();
myContainer.bind<ActionRouter>(TYPES.ActionRouter).toConstantValue(actionRouter);
myContainer.bind<IActionHandler>(TYPES.IActionHandler).to(RegisterActionHandler).whenTargetNamed(ActionType.RegisterAction);

const playerSocketRepository = new PlayerSocketRepository();
myContainer.bind<PlayerSocketRepository>(TYPES.PlayerSocketRepository).toConstantValue(playerSocketRepository);

export {myContainer};