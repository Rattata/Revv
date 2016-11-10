import interfaces from "../interfaces/interfaces";
declare class ContainerSnapshot implements interfaces.ContainerSnapshot {
    bindings: interfaces.Lookup<interfaces.Binding<any>>;
    middleware: interfaces.Next;
    static of(bindings: interfaces.Lookup<interfaces.Binding<any>>, middleware: interfaces.Next): ContainerSnapshot;
}
export default ContainerSnapshot;
