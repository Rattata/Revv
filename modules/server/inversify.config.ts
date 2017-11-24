
import { Container } from "inversify";

import { TYPES} from "./server.types";
import { ActionRouter } from "./ActionHandler/ActionRouter";
import { IActionHandler } from "./ActionHandler/IActionHandler";
import RegisterActionHandler from "./ActionHandler/Handlers/RegisterActionHandler";
import {ActionType} from "../core/Actions/ActionTypes"

const myContainer = new Container();
const actionRouter = new ActionRouter();
myContainer.bind<ActionRouter>(TYPES.ActionRouter).toConstantValue(actionRouter);
myContainer.bind<IActionHandler>(TYPES.IActionHandler).to(RegisterActionHandler).whenTargetNamed(ActionType.RegisterAction);

import {PlayerSocketRepository} from "./Repository/PlayerSocketRepository"
const playerSocketRepository = new PlayerSocketRepository();
myContainer.bind<PlayerSocketRepository>(TYPES.PlayerSocketRepository).toConstantValue(playerSocketRepository);

export {myContainer};