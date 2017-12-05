import { GameScene } from "../Scenes/GameScene";

export interface IInputContext{

    children():Array<IInputContext>

    captureMouse(mouseEvent: MouseEvent, scene:GameScene ) : boolean
    captureKey(keyEvents: Array<number>, scene:GameScene):boolean
    captureScroll?(wheelEvent: WheelEvent, scene:GameScene) : boolean
}