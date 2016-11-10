import interfaces from "../interfaces/interfaces";
import BindingScope from "./binding_scope";
import BindingType from "./binding_type";
declare class Binding<T> implements interfaces.Binding<T> {
    guid: string;
    moduleId: string;
    activated: boolean;
    serviceIdentifier: interfaces.ServiceIdentifier<T>;
    implementationType: interfaces.Newable<T>;
    cache: T;
    dynamicValue: (context: interfaces.Context) => T;
    scope: BindingScope;
    type: BindingType;
    factory: interfaces.FactoryCreator<T>;
    provider: interfaces.ProviderCreator<T>;
    constraint: (request: interfaces.Request) => boolean;
    onActivation: (context: interfaces.Context, injectable: T) => T;
    constructor(serviceIdentifier: interfaces.ServiceIdentifier<T>, defaultScope: BindingScope);
    clone(): interfaces.Binding<T>;
}
export default Binding;