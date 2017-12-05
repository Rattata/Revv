import "reflect-metadata";
import {TYPES} from "./types"
import { Container } from "inversify";
import {GameScene} from "./Scenes/GameScene"
import { interfaces } from "inversify/dts/interfaces/interfaces";

const myContainer = new Container();
// myContainer.bind<GameScene>(TYPES.GameScene).to(GameScene);


 
export { myContainer};