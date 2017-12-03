export interface IInputHandle{
    handle(): boolean
}

export class InputEvent{
    keycode : number = undefined
    click: string = undefined
    clickX : number = undefined
    clickY : number = undefined
} 