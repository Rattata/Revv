declare namespace interfaces {
    interface Newable<T> {
        new (...args: any[]): T;
    }
    interface Abstract<T> {
        prototype: T;
    }
    type ServiceIdentifier<T> = (string | symbol | Newable<T> | Abstract<T>);
    interface Binding<T> extends Clonable<Binding<T>> {
        guid: string;
        moduleId: string;
        activated: boolean;
        serviceIdentifier: ServiceIdentifier<T>;
        implementationType: Newable<T>;
        factory: FactoryCreator<any>;
        provider: ProviderCreator<any>;
        constraint: ConstraintFunction;
        onActivation: (context: Context, injectable: T) => T;
        cache: T;
        dynamicValue: (context: Context) => T;
        scope: number;
        type: number;
    }
    interface Factory<T> extends Function {
        (...args: any[]): (((...args: any[]) => T) | T);
    }
    interface FactoryCreator<T> extends Function {
        (context: Context): Factory<T>;
    }
    interface Provider<T> extends Function {
        (): Promise<T>;
    }
    interface ProviderCreator<T> extends Function {
        (context: Context): Provider<T>;
    }
    interface NextArgs {
        contextInterceptor?: (contexts: Context) => Context;
        isMultiInject: boolean;
        targetType: number;
        serviceIdentifier: interfaces.ServiceIdentifier<any>;
        key?: string;
        value?: any;
    }
    interface Next {
        (args: NextArgs): (any | any[]);
    }
    interface Middleware extends Function {
        (next: Next): Next;
    }
    interface ContextInterceptor extends Function {
        (context: interfaces.Context): interfaces.Context;
    }
    interface Context {
        guid: string;
        container: Container;
        plan: Plan;
        addPlan(plan: Plan): void;
    }
    interface ReflectResult {
        [key: string]: Metadata[];
    }
    interface Metadata {
        key: string;
        value: any;
    }
    interface Plan {
        parentContext: Context;
        rootRequest: Request;
    }
    interface QueryableString {
        startsWith(searchString: string): boolean;
        endsWith(searchString: string): boolean;
        contains(searchString: string): boolean;
        equals(compareString: string): boolean;
        value(): string;
    }
    interface Request {
        guid: string;
        serviceIdentifier: ServiceIdentifier<any>;
        parentContext: Context;
        parentRequest: Request;
        childRequests: Request[];
        target: Target;
        bindings: Binding<any>[];
        addChildRequest(serviceIdentifier: ServiceIdentifier<any>, bindings: (Binding<any> | Binding<any>[]), target: Target): Request;
    }
    interface Target {
        guid: string;
        serviceIdentifier: ServiceIdentifier<any>;
        type: number;
        name: QueryableString;
        metadata: Array<Metadata>;
        getNamedTag(): interfaces.Metadata;
        getCustomTags(): interfaces.Metadata[];
        hasTag(key: string): boolean;
        isArray(): boolean;
        matchesArray(name: interfaces.ServiceIdentifier<any>): boolean;
        isNamed(): boolean;
        isTagged(): boolean;
        matchesNamedTag(name: string): boolean;
        matchesTag(key: string): (value: any) => boolean;
    }
    type ContainerOptionsScope = "singleton" | "transient";
    interface ContainerOptions {
        defaultScope: ContainerOptionsScope;
    }
    interface Container {
        guid: string;
        parent: Container;
        options: ContainerOptions;
        bind<T>(serviceIdentifier: ServiceIdentifier<T>): BindingToSyntax<T>;
        unbind(serviceIdentifier: ServiceIdentifier<any>): void;
        unbindAll(): void;
        isBound(serviceIdentifier: ServiceIdentifier<any>): boolean;
        get<T>(serviceIdentifier: ServiceIdentifier<T>): T;
        getNamed<T>(serviceIdentifier: ServiceIdentifier<T>, named: string): T;
        getTagged<T>(serviceIdentifier: ServiceIdentifier<T>, key: string, value: any): T;
        getAll<T>(serviceIdentifier: ServiceIdentifier<T>): T[];
        load(...modules: ContainerModule[]): void;
        unload(...modules: ContainerModule[]): void;
        applyMiddleware(...middleware: Middleware[]): void;
        snapshot(): void;
        restore(): void;
    }
    interface Bind extends Function {
        <T>(serviceIdentifier: ServiceIdentifier<T>): BindingToSyntax<T>;
    }
    interface ContainerModule {
        guid: string;
        registry: (bind: Bind) => void;
    }
    interface ContainerSnapshot {
        bindings: Lookup<Binding<any>>;
        middleware: Next;
    }
    interface Clonable<T> {
        clone(): T;
    }
    interface Lookup<T> extends Clonable<Lookup<T>> {
        add(serviceIdentifier: ServiceIdentifier<any>, value: T): void;
        get(serviceIdentifier: ServiceIdentifier<any>): T[];
        remove(serviceIdentifier: interfaces.ServiceIdentifier<any>): void;
        removeByCondition(condition: (item: T) => boolean): void;
        hasKey(serviceIdentifier: ServiceIdentifier<any>): boolean;
        clone(): Lookup<T>;
        traverse(func: (key: interfaces.ServiceIdentifier<any>, value: T[]) => void): void;
    }
    interface BindingInSyntax<T> {
        inSingletonScope(): BindingWhenOnSyntax<T>;
        inTransientScope(): BindingWhenOnSyntax<T>;
    }
    interface BindingInWhenOnSyntax<T> extends BindingInSyntax<T>, BindingWhenOnSyntax<T> {
    }
    interface BindingOnSyntax<T> {
        onActivation(fn: (context: Context, injectable: T) => T): BindingWhenSyntax<T>;
    }
    interface BindingToSyntax<T> {
        to(constructor: {
            new (...args: any[]): T;
        }): BindingInWhenOnSyntax<T>;
        toSelf(): BindingInWhenOnSyntax<T>;
        toConstantValue(value: T): BindingWhenOnSyntax<T>;
        toDynamicValue(func: (context: Context) => T): BindingInWhenOnSyntax<T>;
        toConstructor<T2>(constructor: Newable<T2>): BindingWhenOnSyntax<T>;
        toFactory<T2>(factory: FactoryCreator<T2>): BindingWhenOnSyntax<T>;
        toFunction(func: T): BindingWhenOnSyntax<T>;
        toAutoFactory<T2>(serviceIdentifier: ServiceIdentifier<T2>): BindingWhenOnSyntax<T>;
        toProvider<T2>(provider: ProviderCreator<T2>): BindingWhenOnSyntax<T>;
    }
    interface BindingWhenOnSyntax<T> extends BindingWhenSyntax<T>, BindingOnSyntax<T> {
    }
    interface BindingWhenSyntax<T> {
        when(constraint: (request: Request) => boolean): BindingOnSyntax<T>;
        whenTargetNamed(name: string): BindingOnSyntax<T>;
        whenTargetIsDefault(): BindingOnSyntax<T>;
        whenTargetTagged(tag: string, value: any): BindingOnSyntax<T>;
        whenInjectedInto(parent: (Function | string)): BindingOnSyntax<T>;
        whenParentNamed(name: string): BindingOnSyntax<T>;
        whenParentTagged(tag: string, value: any): BindingOnSyntax<T>;
        whenAnyAncestorIs(ancestor: (Function | string)): BindingOnSyntax<T>;
        whenNoAncestorIs(ancestor: (Function | string)): BindingOnSyntax<T>;
        whenAnyAncestorNamed(name: string): BindingOnSyntax<T>;
        whenAnyAncestorTagged(tag: string, value: any): BindingOnSyntax<T>;
        whenNoAncestorNamed(name: string): BindingOnSyntax<T>;
        whenNoAncestorTagged(tag: string, value: any): BindingOnSyntax<T>;
        whenAnyAncestorMatches(constraint: (request: Request) => boolean): BindingOnSyntax<T>;
        whenNoAncestorMatches(constraint: (request: Request) => boolean): BindingOnSyntax<T>;
    }
    interface ConstraintFunction extends Function {
        (request: Request): boolean;
        metaData?: Metadata;
    }
}
export default interfaces;