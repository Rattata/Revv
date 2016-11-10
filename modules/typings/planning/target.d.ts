import interfaces from "../interfaces/interfaces";
import Metadata from "../planning/metadata";
import TargetType from "./target_type";
declare class Target implements interfaces.Target {
    guid: string;
    type: TargetType;
    serviceIdentifier: interfaces.ServiceIdentifier<any>;
    name: interfaces.QueryableString;
    metadata: Array<Metadata>;
    constructor(type: TargetType, name: string, serviceIdentifier: interfaces.ServiceIdentifier<any>, namedOrTagged?: (string | Metadata));
    hasTag(key: string): boolean;
    isArray(): boolean;
    matchesArray(name: interfaces.ServiceIdentifier<any>): boolean;
    isNamed(): boolean;
    isTagged(): boolean;
    getNamedTag(): interfaces.Metadata;
    getCustomTags(): interfaces.Metadata[];
    matchesNamedTag(name: string): boolean;
    matchesTag(key: string): (value: any) => boolean;
}
export default Target;
