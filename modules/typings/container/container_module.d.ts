import interfaces from "../interfaces/interfaces";
declare class ContainerModule implements interfaces.ContainerModule {
    guid: string;
    registry: (bind: interfaces.Bind) => void;
    constructor(registry: (bind: interfaces.Bind) => void);
}
export default ContainerModule;
