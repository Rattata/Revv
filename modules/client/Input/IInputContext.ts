export interface IInputContext{

    children():Array<IInputContext>

    captureMouse(mouseEvent: MouseEvent ) : boolean
    captureKey(keyEvents: Array<number>):boolean
    captureScroll?(wheelEvent: WheelEvent) : boolean
}