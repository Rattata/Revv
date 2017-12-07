import {CLIENT_TYPES} from "./clienttypes"
import { Container } from "inversify";
import {GameScene} from "./Scenes/GameScene"
import { interfaces } from "inversify/dts/interfaces/interfaces";
import { RenderWater, RenderMountain, RenderFlat } from "./Drawable/";
import { MoveActionHandler } from "./Input/InputHandler";
import { ActionBuilder } from "./Actions/ActionBuilder";

const myContainer = new Container();
// myContainer.bind<GameScene>(TYPES.GameScene).to(GameScene)
myContainer.bind<RenderWater>(CLIENT_TYPES.RenderWater).to(RenderWater);
myContainer.bind<RenderMountain>(CLIENT_TYPES.RenderMountain).to(RenderMountain);
myContainer.bind<RenderFlat>(CLIENT_TYPES.RenderFlat).to(RenderFlat);
myContainer.bind<MoveActionHandler>(CLIENT_TYPES.MoveActionHandler).to(MoveActionHandler)


 
export { myContainer};