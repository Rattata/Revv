import interfaces from "../interfaces/interfaces";
import TargetType from "./target_type";
declare function plan(container: interfaces.Container, isMultiInject: boolean, targetType: TargetType, serviceIdentifier: interfaces.ServiceIdentifier<any>, key?: string, value?: any): interfaces.Context;
export default plan;
