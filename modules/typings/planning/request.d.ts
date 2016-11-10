import interfaces from "../interfaces/interfaces";
declare class Request implements interfaces.Request {
    guid: string;
    serviceIdentifier: interfaces.ServiceIdentifier<any>;
    parentContext: interfaces.Context;
    parentRequest: interfaces.Request;
    bindings: interfaces.Binding<any>[];
    childRequests: interfaces.Request[];
    target: interfaces.Target;
    constructor(serviceIdentifier: interfaces.ServiceIdentifier<any>, parentContext: interfaces.Context, parentRequest: interfaces.Request, bindings: (interfaces.Binding<any> | interfaces.Binding<any>[]), target?: interfaces.Target);
    addChildRequest(serviceIdentifier: interfaces.ServiceIdentifier<any>, bindings: (interfaces.Binding<any> | Array<interfaces.Binding<any>>), target: interfaces.Target): interfaces.Request;
}
export default Request;
