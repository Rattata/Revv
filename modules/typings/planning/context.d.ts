import interfaces from "../interfaces/interfaces";
declare class Context implements interfaces.Context {
    guid: string;
    container: interfaces.Container;
    plan: interfaces.Plan;
    constructor(container: interfaces.Container);
    addPlan(plan: interfaces.Plan): void;
}
export default Context;
