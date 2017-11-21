import { Container } from "inversify";
import { TYPES } from "./server.types";
import { ActionHandler } from "./ActionHandler/ActionHandler";
import { IActionHandler } from "./ActionHandler/IActionHandler";

const myContainer = new Container();
myContainer.bind<IActionHandler>(TYPES.IActionHandler).to(ActionHandler);

export {myContainer};