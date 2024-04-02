import type { DocString, DtoL, DtoW, GObject, Proxyfied, WPointerTargetable } from "../joiner";
import { Dictionary, DModelElement, DPointerTargetable, LModelElement, LPointerTargetable, Pointer, RuntimeAccessibleClass } from "../joiner";
export declare class LogicContext<DX extends GObject = DModelElement, LX = DtoL<DX>, WX = DtoW<DX>> extends RuntimeAccessibleClass {
    proxyObject: LX;
    data: DX;
    write: WX;
    constructor(proxyObject: LX, data: DX);
}
export declare class MapLogicContext extends LogicContext<GObject, LPointerTargetable, WPointerTargetable> {
    data: GObject;
    path: string;
    subMaps: string[];
    constructor(proxy: LPointerTargetable, data: GObject, path: string, subMaps?: string[]);
}
export declare abstract class MyProxyHandler<T extends GObject> extends RuntimeAccessibleClass implements ProxyHandler<T> {
    s: string;
    g: string;
    set(target: T, p: string | number | symbol, value: any, proxyitself: Proxyfied<T>): boolean;
    deleteProperty(target: T, p: string | symbol): boolean;
    ownKeys(target: T): ArrayLike<string | symbol>;
    static wrap<D extends RuntimeAccessibleClass, L extends LPointerTargetable = LPointerTargetable, CAN_THROW extends boolean = false, RET extends CAN_THROW extends true ? L : L | undefined = CAN_THROW extends true ? L : L>(data: D | Pointer | undefined | null, baseObjInLookup?: DPointerTargetable, path?: string, canThrow?: CAN_THROW): RET;
    static isProxy(data: GObject): boolean;
}
export declare type GetPath<T = GObject> = T;
export declare class TargetableProxyHandler<ME extends GObject = DModelElement, LE extends LPointerTargetable = LModelElement> extends MyProxyHandler<ME> {
    lg: LE & GObject;
    l: LE;
    d: ME;
    additionalPath: string;
    baseObjInLookup: DPointerTargetable;
    constructor(d: ME, baseObjInLookup?: DPointerTargetable, additionalPath?: string, l?: LE);
    private concatenableHandler;
    get(targetObj: ME, propKey: string | symbol, proxyitself: Proxyfied<ME>): any;
    get0(targetObj: ME, propKey: string | symbol, proxyitself: Proxyfied<ME>): any;
    defaultGetter(targetObj: ME, key: string, proxyitself: Proxyfied<ME>): any;
    defaultSetter(targetObj: DPointerTargetable, propKey: string, value: any, proxyitself?: Proxyfied<ME>): boolean;
    set(targetObj: ME, propKey: string | symbol, value: any, proxyitself?: Proxyfied<ME>): boolean;
    deleteProperty(target: ME, key: string | symbol, proxyItself?: Proxyfied<any>): boolean;
    private mergedObject;
    ownKeys(target: ME): ArrayLike<string | symbol>;
    has(target: ME, p: string | symbol): boolean;
}
export declare class MapProxyHandler extends TargetableProxyHandler<Dictionary, LPointerTargetable> {
    subMapKeys: Dictionary<string, any | Dictionary<DocString<'nested map keys'>>>;
    constructor(d: Dictionary, baseObjInLookup: DPointerTargetable, additionalPath?: string, subMapKeys?: Dictionary<string, any | Dictionary<DocString<'nested map keys'>>>);
    get(target: Dictionary, key: string | number | symbol, proxyitself: Proxyfied<Dictionary>): any;
    set(target: Dictionary, key: string | number | symbol, value: any, proxyitself: Proxyfied<Dictionary>): boolean;
    deleteProperty(target: Dictionary, key: string | symbol, proxyItself?: Proxyfied<any>): boolean;
}
export declare const getPath: GetPath;
