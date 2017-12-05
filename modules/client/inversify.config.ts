import "reflect-metadata";
import {TYPES} from "./types"
import { Container } from "inversify";
import {GameScene} from "./Scenes/GameScene"
import { interfaces } from "inversify/dts/interfaces/interfaces";
import { Entity } from "modules/core/Entity";

const myContainer = new Container();
myContainer.bind<Map<object,Entity>>(TYPES.EntityRegister).toConstantValue(new Map<object,Entity>());
// myContainer.bind<GameScene>(TYPES.GameScene).to(GameScene);


 
export { myContainer};