import { IInputContext } from "./InputContext";
export interface ISelectable {
    onSelect() : IInputContext;
    capture () : boolean;
}