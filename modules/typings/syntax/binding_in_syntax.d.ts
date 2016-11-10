import interfaces from "../interfaces/interfaces";
declare class BindingInSyntax<T> implements interfaces.BindingInSyntax<T> {
    private _binding;
    constructor(binding: interfaces.Binding<T>);
    inSingletonScope(): interfaces.BindingWhenOnSyntax<T>;
    inTransientScope(): interfaces.BindingWhenOnSyntax<T>;
}
export default BindingInSyntax;