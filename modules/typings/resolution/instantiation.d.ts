import interfaces from "../interfaces/interfaces";
declare function resolveInstance(constr: interfaces.Newable<any>, childRequests: interfaces.Request[], resolveRequest: (request: interfaces.Request) => any): any;
export default resolveInstance;