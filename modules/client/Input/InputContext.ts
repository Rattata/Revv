export interface IInputContext{

    children():Array<IInputContext>

    capture(keyEvents: Array<any>, mouseEvent: MouseEvent ) : boolean
}