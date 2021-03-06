import { GameScene } from "../../Scenes/GameScene";

export interface IInputHandler{
    handleMouse?(mouseEvent:MouseEvent, scene:GameScene)
    handleKey?(mouseEvent:MouseEvent, scene:GameScene)
    handleScroll?(mouseEvent:MouseEvent, scene:GameScene)

}