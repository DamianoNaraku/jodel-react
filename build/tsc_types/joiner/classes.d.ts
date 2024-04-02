import type { DEdge, DEdgePoint, DExtEdge, DGraph, DGraphElement, DGraphVertex, DRefEdge, DVertex, DVoidEdge, DVoidVertex, LEdge, LEdgePoint, LExtEdge, LGraphElement, LGraphVertex, LRefEdge, LVertex, LVoidEdge, LVoidVertex, WEdge, WEdgePoint, WExtEdge, WGraph, WGraphElement, WGraphVertex, WRefEdge, WVertex, WVoidEdge, WVoidVertex } from "../model/dataStructure";
import type { Class, Longest } from "ts-mixer/dist/types/types";
import type { DAnnotation, DAttribute, DClass, DClassifier, DDataType, DEnumerator, DEnumLiteral, DMap, DModel, DModelElement, DNamedElement, DObject, DOperation, DPackage, DParameter, DReference, DStructuralFeature, DTypedElement, DValue, LAnnotation, LAttribute, LClass, LClassifier, LDataType, LEnumerator, LEnumLiteral, LMap, LModelElement, LNamedElement, LObject, LOperation, LPackage, LParameter, LReference, LStructuralFeature, LTypedElement, LValue, WAnnotation, WAttribute, WClass, WClassifier, WDataType, WEnumerator, WEnumLiteral, WMap, WModel, WModelElement, WNamedElement, WObject, WOperation, WPackage, WParameter, WReference, WStructuralFeature, WTypedElement, WValue } from "../model/logicWrapper";
import type { CClass, Constructor, Dependency, Dictionary, DocString, GObject, InitialVertexSize, orArr, Proxyfied, unArr } from "./types";
import { NodeTypes, PrimitiveType } from "./types";
import type { DViewElement, DViewTransientProperties, LViewTransientProperties, WViewElement, WViewTransientProperties } from "../view/viewElement/view";
import type { LogicContext } from "./proxy";
import { Action, DLog, DState, DViewPoint, EdgeSegment, GraphSize, LGraph, LLog, LModel, LViewElement, LViewPoint, ParsedAction } from "./index";
import { OclEngine } from "@stekoe/ocl.js";
import { ReactNode } from "react";
declare abstract class AbstractMixedClass {
    static logic: typeof LPointerTargetable;
    static structure: typeof DPointerTargetable;
    static singleton: LPointerTargetable;
    static init_constructor(...constructorArguments: any): void;
}
export declare abstract class RuntimeAccessibleClass extends AbstractMixedClass {
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    static extendMatrix: Dictionary<string, Dictionary<string, boolean>>;
    static cname: string;
    private static OCL_Constructors;
    static set_extend(superclass: typeof RuntimeAccessibleClass, subclass: typeof RuntimeAccessibleClass): void;
    static extendPrototypes(): void;
    static fixStatics(): void;
    static classes: Dictionary<string, typeof RuntimeAccessibleClass>;
    static annotatedClasses: Dictionary<string, typeof RuntimeAccessibleClass>;
    static getAllNames(annotated?: boolean): string[];
    static getAllClasses(annotated?: boolean): typeof RuntimeAccessibleClass[];
    static getAllClassesDictionary(annotated?: boolean): Dictionary<string, typeof RuntimeAccessibleClass>;
    static wrapAll<D extends RuntimeAccessibleClass, L extends LPointerTargetable = LPointerTargetable, CAN_THROW extends boolean = false, RET extends CAN_THROW extends true ? L[] : L[] = CAN_THROW extends true ? L[] : L[]>(data: D[] | Pointer<DPointerTargetable, 0, 'N'>, baseObjInLookup?: DPointerTargetable, path?: string, canThrow?: CAN_THROW, state?: DState, filter?: boolean): CAN_THROW extends true ? L[] : L[];
    static wrap<D extends RuntimeAccessibleClass, L extends LPointerTargetable = LPointerTargetable, CAN_THROW extends boolean = false, RET extends CAN_THROW extends true ? L : L | undefined = CAN_THROW extends true ? L : L | undefined>(data: D | Pointer | undefined | null, baseObjInLookup?: DPointerTargetable, path?: string, canThrow?: CAN_THROW, state?: DState): CAN_THROW extends true ? L : L | undefined;
    static mapWrap(data: Dictionary, baseObjInLookup: DPointerTargetable, path: string, subMapKeys?: string[]): Proxyfied<Dictionary>;
    className: string;
    protected constructor(...a: any);
    static init_constructor(thiss: any, ...args: any): void;
    static get<T extends typeof RuntimeAccessibleClass = typeof RuntimeAccessibleClass>(dclassname: string, mode?: string): T & {
        logic?: typeof LPointerTargetable;
    };
    static extends(className?: string | typeof RuntimeAccessibleClass, superClassName?: string | typeof RuntimeAccessibleClass, returnIfEqual?: boolean): boolean;
    getAllPrototypeSuperClasses(): GObject[];
    static makeOCLConstructor(data: DClass, state: DState, oldState: DState): GObject<"fake constructor of m2-class for ocl's Context">;
    static getOCLClasses(model_id: Pointer<DModel>): GObject;
}
export declare function Obsolete<T extends any>(constructor: T & GObject): T;
export declare function Leaf<T extends any>(constructor: T & GObject): T;
export declare function Node<T extends any>(constructor: T & GObject): T;
export declare function Abstract<T extends any>(constructor: T & GObject): T;
export declare function Instantiable<T extends any>(constructor: T & GObject, instanceConstructor?: Constructor): T;
export declare function RuntimeAccessible(cname: string): (ctor: any) => any;
export declare type DtoL<DX extends GObject, LX = DX extends DEnumerator ? LEnumerator : (DX extends DAttribute ? LAttribute : (DX extends DReference ? LReference : (DX extends DRefEdge ? LRefEdge : (DX extends DExtEdge ? LExtEdge : (DX extends DDataType ? LDataType : (DX extends DClass ? LClass : (DX extends DStructuralFeature ? LStructuralFeature : (DX extends DParameter ? LParameter : (DX extends DOperation ? LOperation : (DX extends DEdge ? LEdge : (DX extends DEdgePoint ? LEdgePoint : (DX extends DGraphVertex ? LGraphVertex : (DX extends DModel ? LModel : (DX extends DValue ? LValue : (DX extends DObject ? LObject : (DX extends DEnumLiteral ? LEnumLiteral : (DX extends DPackage ? LPackage : (DX extends DClassifier ? LClassifier : (DX extends DTypedElement ? LTypedElement : (DX extends DVertex ? LVertex : (DX extends DVoidEdge ? LVoidEdge : (DX extends DVoidVertex ? LVoidVertex : (DX extends DGraph ? LGraph : (DX extends DNamedElement ? LNamedElement : (DX extends DAnnotation ? LAnnotation : (DX extends DGraphElement ? LGraphElement : (DX extends DMap ? LMap : (DX extends DModelElement ? LModelElement : (DX extends DUser ? LUser : (DX extends DPointerTargetable ? LPointerTargetable : (DX extends DUser ? LUser : (DX extends DLog ? LLog : (ERROR)))))))))))))))))))))))))))))))))> = LX;
export declare type DtoW<DX extends GObject, WX = DX extends DEnumerator ? WEnumerator : (DX extends DAttribute ? WAttribute : (DX extends DReference ? WReference : (DX extends DRefEdge ? WRefEdge : (DX extends DExtEdge ? WExtEdge : (DX extends DDataType ? WDataType : (DX extends DClass ? WClass : (DX extends DStructuralFeature ? WStructuralFeature : (DX extends DParameter ? WParameter : (DX extends DOperation ? WOperation : (DX extends DEdge ? WEdge : (DX extends DEdgePoint ? WEdgePoint : (DX extends DGraphVertex ? WGraphVertex : (DX extends DModel ? WModel : (DX extends DValue ? WValue : (DX extends DObject ? WObject : (DX extends DEnumLiteral ? WEnumLiteral : (DX extends DPackage ? WPackage : (DX extends DClassifier ? WClassifier : (DX extends DTypedElement ? WTypedElement : (DX extends DVertex ? WVertex : (DX extends DVoidEdge ? WVoidEdge : (DX extends DVoidVertex ? WVoidVertex : (DX extends DGraph ? WGraph : (DX extends DNamedElement ? WNamedElement : (DX extends DAnnotation ? WAnnotation : (DX extends DGraphElement ? WGraphElement : (DX extends DMap ? WMap : (DX extends DModelElement ? WModelElement : (DX extends DUser ? WUser : (DX extends DPointerTargetable ? WPointerTargetable : (ERROR)))))))))))))))))))))))))))))))> = WX;
export declare type LtoD<LX extends LPointerTargetable, DX = LX extends LEnumerator ? DEnumerator : (LX extends LAttribute ? DAttribute : (LX extends LReference ? DReference : (LX extends LRefEdge ? DRefEdge : (LX extends LExtEdge ? DExtEdge : (LX extends LDataType ? DDataType : (LX extends LClass ? DClass : (LX extends LStructuralFeature ? DStructuralFeature : (LX extends LParameter ? DParameter : (LX extends LOperation ? DOperation : (LX extends LEdge ? DEdge : (LX extends LEdgePoint ? DEdgePoint : (LX extends LGraphVertex ? DGraphVertex : (LX extends LModel ? DModel : (LX extends LValue ? DValue : (LX extends LObject ? DObject : (LX extends LEnumLiteral ? DEnumLiteral : (LX extends LPackage ? DPackage : (LX extends LClassifier ? DClassifier : (LX extends LTypedElement ? DTypedElement : (LX extends LVertex ? DVertex : (LX extends LVoidEdge ? DVoidEdge : (LX extends LVoidVertex ? DVoidVertex : (LX extends LGraph ? DGraph : (LX extends LNamedElement ? DNamedElement : (LX extends LAnnotation ? DAnnotation : (LX extends LGraphElement ? DGraphElement : (LX extends LMap ? DMap : (LX extends LModelElement ? DModelElement : (LX extends LUser ? DUser : (LX extends LPointerTargetable ? DPointerTargetable : (ERROR)))))))))))))))))))))))))))))))> = DX;
export declare type LtoW<LX extends LPointerTargetable, WX = LX extends LEnumerator ? WEnumerator : (LX extends LAttribute ? WAttribute : (LX extends LReference ? WReference : (LX extends LRefEdge ? WRefEdge : (LX extends LExtEdge ? WExtEdge : (LX extends LDataType ? WDataType : (LX extends LClass ? WClass : (LX extends LStructuralFeature ? WStructuralFeature : (LX extends LParameter ? WParameter : (LX extends LOperation ? WOperation : (LX extends LEdge ? WEdge : (LX extends LEdgePoint ? WEdgePoint : (LX extends LGraphVertex ? WGraphVertex : (LX extends LModel ? WModel : (LX extends LValue ? WValue : (LX extends LObject ? WObject : (LX extends LEnumLiteral ? WEnumLiteral : (LX extends LPackage ? WPackage : (LX extends LClassifier ? WClassifier : (LX extends LTypedElement ? WTypedElement : (LX extends LVertex ? WVertex : (LX extends LVoidEdge ? WVoidEdge : (LX extends LVoidVertex ? WVoidVertex : (LX extends LGraph ? WGraph : (LX extends LNamedElement ? WNamedElement : (LX extends LAnnotation ? WAnnotation : (LX extends LGraphElement ? WGraphElement : (LX extends LMap ? WMap : (LX extends LModelElement ? WModelElement : (LX extends LUser ? WUser : (LX extends LPointerTargetable ? WPointerTargetable : (ERROR)))))))))))))))))))))))))))))))> = WX;
export declare type WtoD<IN extends WPointerTargetable, OUT = IN extends WEnumerator ? DEnumerator : (IN extends WAttribute ? DAttribute : (IN extends WReference ? DReference : (IN extends WRefEdge ? DRefEdge : (IN extends WExtEdge ? DExtEdge : (IN extends WDataType ? DDataType : (IN extends WClass ? DClass : (IN extends WStructuralFeature ? DStructuralFeature : (IN extends WParameter ? DParameter : (IN extends WOperation ? DOperation : (IN extends WEdge ? DEdge : (IN extends WEdgePoint ? DEdgePoint : (IN extends WGraphVertex ? DGraphVertex : (IN extends WModel ? DModel : (IN extends WValue ? DValue : (IN extends WObject ? DObject : (IN extends WEnumLiteral ? DEnumLiteral : (IN extends WPackage ? DPackage : (IN extends WClassifier ? DClassifier : (IN extends WTypedElement ? DTypedElement : (IN extends WVertex ? DVertex : (IN extends WVoidEdge ? DVoidEdge : (IN extends WVoidVertex ? DVoidVertex : (IN extends WGraph ? DGraph : (IN extends WNamedElement ? DNamedElement : (IN extends WAnnotation ? DAnnotation : (IN extends WGraphElement ? DGraphElement : (IN extends WMap ? DMap : (IN extends WModelElement ? DModelElement : (IN extends WUser ? DUser : (IN extends WPointerTargetable ? DPointerTargetable : (IN extends WViewElement ? DViewElement : (IN extends WViewTransientProperties ? DViewTransientProperties : (ERROR)))))))))))))))))))))))))))))))))> = OUT;
export declare type WtoL<IN extends WPointerTargetable, OUT = IN extends WEnumerator ? LEnumerator : (IN extends WAttribute ? LAttribute : (IN extends WReference ? LReference : (IN extends WRefEdge ? LRefEdge : (IN extends WExtEdge ? LExtEdge : (IN extends WDataType ? LDataType : (IN extends WClass ? LClass : (IN extends WStructuralFeature ? LStructuralFeature : (IN extends WParameter ? LParameter : (IN extends WOperation ? LOperation : (IN extends WEdge ? LEdge : (IN extends WEdgePoint ? LEdgePoint : (IN extends WGraphVertex ? LGraphVertex : (IN extends WModel ? LModel : (IN extends WValue ? LValue : (IN extends WObject ? LObject : (IN extends WEnumLiteral ? LEnumLiteral : (IN extends WPackage ? LPackage : (IN extends WClassifier ? LClassifier : (IN extends WTypedElement ? LTypedElement : (IN extends WVertex ? LVertex : (IN extends WVoidEdge ? LVoidEdge : (IN extends WVoidVertex ? LVoidVertex : (IN extends WGraph ? LGraph : (IN extends WNamedElement ? LNamedElement : (IN extends WAnnotation ? LAnnotation : (IN extends WGraphElement ? LGraphElement : (IN extends WMap ? LMap : (IN extends WModelElement ? LModelElement : (IN extends WUser ? LUser : (IN extends WPointerTargetable ? LPointerTargetable : (IN extends WViewElement ? LViewElement : (IN extends WViewTransientProperties ? LViewTransientProperties : (ERROR)))))))))))))))))))))))))))))))))> = OUT;
export declare type labelfunc = (e: LVoidEdge, segment: EdgeSegment, allNodes: LEdge["allNodes"], allSegments: EdgeSegment[]) => PrimitiveType;
export declare enum CoordinateMode {
    "absolute" = "absolute",
    "relativePercent" = "relative%",
    "relativeOffset" = "relativeOffset",
    "relativeOffsetStart" = "relativeOffsetStart",
    "relativeOffsetEnd" = "relativeOffsetEnd"
}
export declare enum EdgeHead {
    composition = "EdgeComposition",
    aggregation = "EdgeAggregation",
    reference = "EdgeReference",
    extend = "EdgeExtend"
}
export declare class Constructors<T extends DPointerTargetable = DPointerTargetable> {
    static paused: boolean;
    private thiss;
    private persist;
    private nonPersistentCallbacks;
    fatherType?: typeof RuntimeAccessibleClass;
    private state?;
    constructor(t: T, father?: Pointer, persist?: boolean, fatherType?: Constructor, id?: string, isUser?: boolean);
    static makeID(isUser?: boolean): Pointer;
    private setID;
    private setPtr;
    private setExternalRootProperty;
    private setExternalPtr;
    private setWithSideEffect;
    static persist(d: DPointerTargetable, fromCreateAction?: boolean): void;
    static persist(d: DPointerTargetable[]): void;
    end(simpledatacallback?: (d: T, c: this) => void): T;
    DState(): this;
    DModelElement(): this;
    DClassifier(): this;
    DParameter(defaultValue?: any): this;
    DStructuralFeature(): this;
    DReference(): this;
    DAttribute(): this;
    DDataType(): this;
    DObject(instanceoff?: DObject["instanceof"]): this;
    DValue(instanceoff?: DValue["instanceof"], val?: DValue["values"], isMirage?: DValue["isMirage"]): this;
    DAnnotation(source?: DAnnotation["source"], details?: DAnnotation["details"]): this;
    DPointerTargetable(): this;
    DUser(username: string): this;
    DNamedElement(name?: DNamedElement["name"]): this;
    DTypedElement(type?: DTypedElement["type"]): this;
    DPackage(uri?: DPackage["uri"], prefix?: DPackage["prefix"]): this;
    DModel(instanceoff?: DModel["instanceof"], isMetamodel?: DModel["isMetamodel"]): this;
    DOperation(exceptions?: DOperation["exceptions"], implementation?: string): this;
    DClass(isInterface?: DClass["interface"], isAbstract?: DClass["abstract"], isPrimitive?: LClassifier["isPrimitive"], partial?: DClass["partial"], partialdefaultname?: DClass["partialdefaultname"]): this;
    DEnumLiteral(value?: DEnumLiteral["value"]): this;
    DEnumerator(literals?: DEnumerator["literals"]): this;
    DEdgePoint(): this;
    DEdge(): this;
    DVertex(): this;
    DVoidEdge(start: DGraphElement["id"] | DGraphElement | LGraphElement | DModelElement["id"] | DModelElement | LModelElement, end: DGraphElement["id"] | DGraphElement | LGraphElement | DModelElement["id"] | DModelElement | LModelElement, longestLabel: DEdge["longestLabel"], labels: DEdge["labels"]): this;
    DExtEdge(): this;
    DRefEdge(): this;
    DGraphElement(model: DGraphElement["model"] | null | undefined, parentgraphID: DGraphElement["graph"] | undefined, htmlindex: number): this;
    DViewElement(name: string, jsxString: string, vp?: Pointer<DViewPoint>, defaultVSize?: GraphSize, usageDeclarations?: string, constants?: string, preRenderFunc?: string, appliableToClasses?: string[], oclCondition?: string, priority?: number): this;
    DViewPoint(): this;
    DProject(type: DProject['type'], name: string, m2: DModel[], m1: DModel[]): this;
    static DGraph_maxID: number;
    static DGraph_makeID(modelid: DGraph["model"]): Pointer<DGraph, 1, 1, LGraph>;
    DGraph(): this;
    DVoidVertex(defaultVSize?: InitialVertexSize): this;
}
export declare class DPointerTargetable extends RuntimeAccessibleClass {
    static defaultComponent: (ownProps: GObject, children?: (string | React.Component)[]) => React.ReactElement;
    static maxID: number;
    static logic: typeof LPointerTargetable;
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    clonedCounter?: number;
    _storePath?: string[];
    _subMaps?: Dictionary<string, boolean>;
    id: Pointer<DPointerTargetable, 1, 1, LPointerTargetable>;
    pointedBy: PointedBy[];
    className: string;
    static pendingCreation: Record<Pointer<DPointerTargetable, 1, 1>, DPointerTargetable>;
    static defaultname<L extends LModelElement = LModelElement>(startingPrefix: string | ((meta: L) => string), father?: Pointer | DPointerTargetable | ((a: string) => boolean), metaptr?: Pointer | null): string;
    static new(...a: any): DPointerTargetable;
    constructor(fakearg_detectwrongcalls: 'dwc');
    static fromL<LX extends LPointerTargetable, DX = LX extends LEnumerator ? LEnumerator : (LX extends LAttribute ? LAttribute : (LX extends LReference ? LReference : (LX extends LRefEdge ? LRefEdge : (LX extends LExtEdge ? LExtEdge : (LX extends LDataType ? LDataType : (LX extends LClass ? LClass : (LX extends LStructuralFeature ? LStructuralFeature : (LX extends LParameter ? LParameter : (LX extends LOperation ? LOperation : (LX extends LEdge ? LEdge : (LX extends LEdgePoint ? LEdgePoint : (LX extends LGraphVertex ? LGraphVertex : (LX extends LModel ? LModel : (LX extends LValue ? LValue : (LX extends LObject ? LObject : (LX extends LEnumLiteral ? LEnumLiteral : (LX extends LPackage ? LPackage : (LX extends LClassifier ? LClassifier : (LX extends LTypedElement ? LTypedElement : (LX extends LVertex ? LVertex : (LX extends LVoidEdge ? LVoidEdge : (LX extends LVoidVertex ? LVoidVertex : (LX extends LGraph ? LGraph : (LX extends LNamedElement ? LNamedElement : (LX extends LAnnotation ? LAnnotation : (LX extends LGraphElement ? LGraphElement : (LX extends LMap ? LMap : (LX extends LModelElement ? LModelElement : (LX extends LUser ? LUser : (LX extends LPointerTargetable ? LPointerTargetable : (ERROR)))))))))))))))))))))))))))))))>(data: LX): DX;
    static fromPointer<// LOW extends number, UPP extends number | 'N',
    T extends Pointer | Pointer[], // <DPointerTargetable, 1, 'N', LPointerTargetable>,
    DDD extends (T extends Pointer<infer D> ? D : 'undefined D'), LOW extends (T extends Pointer<any, infer LO> ? LO : 'undefined_upp'), UPP extends (T extends Pointer<any, number, infer UP> ? UP : 'undefined_low'), DDDARR extends (T extends Pointer<infer D>[] ? D : 'undefined_DARR'), LOWARR extends (T extends Pointer<any, infer LO>[] ? LO : 'undefined_uppARR'), UPPARR extends (T extends Pointer<any, number, infer UP>[] ? 'UP_is_N' : 'undefined_lowARR'), RET = UPPARR extends 'UP_is_N' ? (DDDARR[]) : (UPP extends 1 ? (LOW extends 0 ? DDD | null : DDD) : (LOW extends 1 ? DDD : undefined)), INFERRED = {
        ret: RET;
        upp: UPP;
        low: LOW;
        ddd: DDD;
        dddARR: DDDARR;
        lowARR: LOWARR;
        uppARR: UPPARR;
    }>(ptr: T, s?: DState): RET;
    static from<// LOW extends number, UPP extends number | 'N',
    PTR extends Pointer | Pointer[], // <DPointerTargetable, 1, 'N', LPointerTargetable>,
    DDD extends (PTR extends Pointer<infer D> ? D : 'undefined D'), LOW extends (PTR extends Pointer<any, infer LO> ? LO : 'undefined_upp'), UPP extends (PTR extends Pointer<any, number, infer UP> ? UP : 'undefined_low'), DDDARR extends (PTR extends Pointer<infer D>[] ? D : 'undefined_DARR'), LOWARR extends (PTR extends Pointer<any, infer LO>[] ? LO : 'undefined_uppARR'), UPPARR extends (PTR extends Pointer<any, number, infer UP>[] ? 'UP_is_N' : 'undefined_lowARR'), LX extends LPointerTargetable, RETPTR = UPPARR extends 'UP_is_N' ? (DDDARR[]) : (UPP extends 1 ? (LOW extends 0 ? DDD | null : DDD) : (LOW extends 1 ? DDD : undefined)), DX = LX extends LEnumerator ? DEnumerator : (LX extends LAttribute ? DAttribute : (LX extends LReference ? DReference : (LX extends LRefEdge ? DRefEdge : (LX extends LExtEdge ? DExtEdge : (LX extends LDataType ? DDataType : (LX extends LClass ? DClass : (LX extends LStructuralFeature ? DStructuralFeature : (LX extends LParameter ? DParameter : (LX extends LOperation ? DOperation : (LX extends LEdge ? DEdge : (LX extends LEdgePoint ? DEdgePoint : (LX extends LGraphVertex ? DGraphVertex : (LX extends LModel ? DModel : (LX extends LValue ? DValue : (LX extends LObject ? DObject : (LX extends LEnumLiteral ? DEnumLiteral : (LX extends LPackage ? DPackage : (LX extends LClassifier ? DClassifier : (LX extends LTypedElement ? DTypedElement : (LX extends LVertex ? DVertex : (LX extends LVoidEdge ? DVoidEdge : (LX extends LVoidVertex ? DVoidVertex : (LX extends LGraph ? DGraph : (LX extends LNamedElement ? DNamedElement : (LX extends LAnnotation ? DAnnotation : (LX extends LGraphElement ? DGraphElement : (LX extends LMap ? DMap : (LX extends LModelElement ? DModelElement : (LX extends LUser ? DUser : (LX extends LPointerTargetable ? DPointerTargetable : (ERROR))))))))))))))))))))))))))))))), RET = DX extends 'ERROR' ? RETPTR : (RETPTR extends DX ? RETPTR : DX), INFERRED = {
        ret: RET;
        RETPTR: RETPTR;
        upp: UPP;
        low: LOW;
        ddd: DDD;
        dddARR: DDDARR;
        lowARR: LOWARR;
        uppARR: UPPARR;
        LX: LX;
        DX: DX;
    }>(ptr: PTR | LX, s?: DState): RET;
    static fromArr(arr: any[], filter?: boolean, s?: DState): DPointerTargetable[];
    static writeable<LX extends LPointerTargetable, WX = LtoW<LX>>(l: LX): WX;
    _persistCallbacks: ((() => void) | Action)[];
    _derivedSubElements: DModelElement[];
}
export declare class Pointers {
    static filterValid<P extends (Pointer | Pointer[]) = any, RET = P extends Pointer[] ? P : P | null>(p: P): P | null;
    static fromArr<D extends DPointerTargetable, L extends LPointerTargetable, P extends Pointer>(val: (P | D | L | null | undefined)[] | (P | D | L | null | undefined)): P[];
    fromm<D extends DPointerTargetable, L extends LPointerTargetable, P extends Pointer>(val: (P | D | L)): P | null;
    from0<// LOW extends number, UPP extends number | 'N',
    PTR extends Pointer | Pointer[], // <DPointerTargetable, 1, 'N', LPointerTargetable>,
    LOW extends (PTR extends Pointer<any, infer LO> ? LO : 'undefined_upp'), UPP extends (PTR extends Pointer<any, number, infer UP> ? UP : 'undefined_low'), DDD extends (PTR extends Pointer<any, number, any, infer LL> ? LL : 'undefined_L'), LOWARR extends (PTR extends Pointer<any, infer LO>[] ? LO : 'undefined_uppARR'), UPPARR extends (PTR extends Pointer<any, number, infer UP>[] ? 'UP_is_N' : 'undefined_lowARR'), DDDARR extends (PTR extends Pointer<any, any, any, infer LL>[] ? LL : 'undefined_LARR'), DX extends DPointerTargetable, LX extends LPointerTargetable, WX extends WPointerTargetable, RETPTR = UPPARR extends 'UP_is_N' ? (DDDARR[]) : (UPP extends 1 ? (LOW extends 0 ? DDD | null : DDD) : (LOW extends 1 ? DDD : undefined)), LXX = DtoL<DX>, DXX = LtoD<LX>, LXFinal = LXX extends 'ERROR' ? LX : LXX, DXFinal = DXX extends 'ERROR' ? DX : DXX, RET = {
        d: DXFinal;
        l: LXFinal;
    }, // Pointer<DX, 0 | 1, 1 | 'N', LX>
    INFERRED = {
        ret: RET;
        RETPTR: RETPTR;
        LXX: LXX;
        DXX: DXX;
        upp: UPP;
        low: LOW;
        ddd: DDD;
        dddARR: DDDARR;
        lowARR: LOWARR;
        uppARR: UPPARR;
        LX: LX;
        DX: DX;
    }>(data: LX | DX | WX): INFERRED;
    static from00<DWL extends {
        id: any;
    }, PTRPARAM = Pointer | Pointer[], T = Exclude<DWL | DWL[] | PTRPARAM, unknown[]>, PTR = T extends null ? null : T extends undefined ? null : (T extends PTRPARAM ? T : (T extends any[] ? T[number]['id'][] : T['id']))>(data: T | T[]): PTR;
    static from<DX extends DPointerTargetable>(data: DX): DX["id"];
    static from<DX extends DPointerTargetable>(data: DX[]): DX["id"][];
    static from<LX extends LPointerTargetable>(data: LX): LX["id"];
    static from<LX extends LPointerTargetable>(data: LX[]): LX["id"][];
    static from<WX extends WPointerTargetable>(data: WX): WX["id"];
    static from<WX extends WPointerTargetable>(data: WX[]): WX["id"][];
    static from<PTR extends Pointer<DPointerTargetable, 1, 1, LPointerTargetable>>(data: PTR): PTR;
    static from<PTR extends Pointer<DPointerTargetable, 1, 1, LPointerTargetable>>(data: PTR[]): PTR[];
    static from<T extends LPointerTargetable>(data: Pack1<T>): Pointer<LtoD<T>, 1, 1, T>;
    static from<T extends LPointerTargetable>(data: Pack1<T>[]): Pointer<LtoD<T>, 1, 1, T>[];
    static from<T extends LPointerTargetable>(data: Pack<T>): Pointer<LtoD<T>, 1, 1, T>[];
    static from<P extends Pack<T> | undefined, T extends LPointerTargetable>(data: P): Pointer<LtoD<T>, 1, 1, T>[];
    static from<T extends LPointerTargetable>(data: PackArr<T>): Pointer<LtoD<T>, 1, 1, T>[];
    static from<T extends LPointerTargetable>(data: Pack1<T[]>): Pointer<LtoD<T>, 1, 1, T>;
    static from<T extends LPointerTargetable>(data: Pack1<T[]>[]): Pointer<LtoD<T>, 1, 1, T>[];
    static from<T extends LPointerTargetable>(data: Pack<T[]>): Pointer<LtoD<T>, 1, 1, T>[];
    static from<T extends LPointerTargetable>(data: PackArr<T[]>): Pointer<LtoD<T>, 1, 1, T>[];
    static from<TT extends Pack<LPointerTargetable[]> | undefined | null, T extends (TT extends Pack<infer PTYPE> ? PTYPE : undefined)>(data: T): T extends null | undefined ? T : Pointer<LtoD<T>, 1, 1, T>[];
    static from<T extends LPointerTargetable | undefined | null>(data: PackArr<T[]>): T extends null | undefined ? T : Pointer<LtoD<T>, 1, 1, T>[];
    static from(data: null | undefined): null;
    static from(data: (null | undefined)[]): [];
    static from(data: (null | undefined) | (null | undefined)[]): [];
    static isPointer(val: any, state?: DState, doArrayCheck?: boolean): val is Pointer;
}
export declare type Pack1<LL extends orArr<LPointerTargetable> | undefined, L extends LPointerTargetable | undefined = unArr<LL>, D extends (L extends LPointerTargetable ? LtoD<L> : undefined) = (L extends LPointerTargetable ? LtoD<L> : undefined)> = L extends LPointerTargetable ? (D extends DPointerTargetable ? D | L | Pointer<D, 1, 1, L> : undefined) : undefined;
export declare type PackArr<LL extends orArr<LPointerTargetable> | undefined, L extends LPointerTargetable | undefined = unArr<LL>> = Pack1<L>[];
export declare type Pack<LL extends orArr<LPointerTargetable> | undefined, L extends LPointerTargetable | undefined = unArr<LL>> = L extends undefined ? undefined : Pack1<L> | PackArr<L>;
export declare class PendingPointedByPaths {
    from: DocString<"full Path in store including field key">;
    to: Pointer;
    static all: PendingPointedByPaths[];
    static maxSolveAttempts: number;
    solveAttempts: number;
    private stackTrace;
    action: ParsedAction;
    static new(action: ParsedAction, oldState: DState): PendingPointedByPaths;
    private constructor();
    static attemptimplementationdelete(pb: PointedBy): void;
    attemptResolve(state: DState): ParsedAction | null;
    private resolve;
    saveForLater(): void;
    private canBeResolved;
    static getSolveableActions(oldState: DState): ParsedAction[];
}
export declare class PointedBy {
    static list: string[];
    source: string;
    static getPath(p: PointedBy): string;
    static getLastKey(p: PointedBy): string;
    static getPathArr(p: PointedBy): string[];
    private constructor();
    static fromID<D extends DPointerTargetable>(ptr: Pointer<D>, field: keyof D, NoAccessModifiersHere?: never & ("-=" | "+=")): PointedBy;
    static new(source: DocString<"full path in store including key. like \'idlookup.id.extends+=\'">, modifier?: "-=" | "+=" | undefined, action?: ParsedAction): PointedBy;
    static remove(oldValue: Pointer | undefined, action: ParsedAction, state: DState, casee?: "+=" | "-=" | undefined, oldState?: DState): DState;
    static add(newtargetptr: Pointer | undefined, action: ParsedAction, state: DState, casee?: "+=" | "-=" | undefined, oldState?: DState): DState;
}
declare type AnyPointer = Pointer<DPointerTargetable, number, number | 'N', LPointerTargetable>;
export declare class LPointerTargetable<Context extends LogicContext<DPointerTargetable> = any, D extends DPointerTargetable = DPointerTargetable> extends DPointerTargetable {
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    static structure: typeof DPointerTargetable;
    static singleton: LPointerTargetable;
    __raw: D;
    pointedBy: PointedBy[];
    clonedCounter?: number;
    __isProxy: boolean;
    __serialize: DocString<"json">;
    private inspect;
    private __random;
    private __info_of__id;
    protected wrongAccessMessage(str: string): any;
    toString(): string;
    protected get_toString(context: Context): () => string;
    protected cannotSet(field: string): any;
    protected get_id(context: Context): this["id"];
    protected set_id(): boolean;
    protected _get_default<DD extends DPointerTargetable, T extends string & keyof (DD) & keyof (L), L extends LModelElement = LModelElement>(data: DD, key: T): L[T];
    protected _defaultCollectionGetter(c: Context, k: keyof Context["data"]): LPointerTargetable[];
    protected __defaultGetter(c: Context, k: keyof Context["data"]): any;
    protected __defaultSetter(v: any, c: Context, k: keyof Context["data"]): boolean;
    get__extends(superClassName: string, context: LogicContext<DPointerTargetable>): boolean;
    set_pointedBy(val: never, context: LogicContext<DPointerTargetable>): boolean;
    static fromD<DX extends DPointerTargetable, LX = DX extends DEnumerator ? LEnumerator : (DX extends DAttribute ? LAttribute : (DX extends DReference ? LReference : (DX extends DRefEdge ? LRefEdge : (DX extends DExtEdge ? LExtEdge : (DX extends DDataType ? LDataType : (DX extends DClass ? LClass : (DX extends DStructuralFeature ? LStructuralFeature : (DX extends DParameter ? LParameter : (DX extends DOperation ? LOperation : (DX extends DEdge ? LEdge : (DX extends DEdgePoint ? LEdgePoint : (DX extends DGraphVertex ? LGraphVertex : (DX extends DModel ? LModel : (DX extends DValue ? LValue : (DX extends DObject ? LObject : (DX extends DEnumLiteral ? LEnumLiteral : (DX extends DPackage ? LPackage : (DX extends DClassifier ? LClassifier : (DX extends DTypedElement ? LTypedElement : (DX extends DVertex ? LVertex : (DX extends DVoidEdge ? LVoidEdge : (DX extends DVoidVertex ? LVoidVertex : (DX extends DGraph ? LGraph : (DX extends DNamedElement ? LNamedElement : (DX extends DAnnotation ? LAnnotation : (DX extends DGraphElement ? LGraphElement : (DX extends DMap ? LMap : (DX extends DModelElement ? LModelElement : (DX extends DUser ? LUser : (DX extends DPointerTargetable ? LPointerTargetable : (ERROR)))))))))))))))))))))))))))))))>(data: DX): LX;
    static fromD<DX extends DPointerTargetable, LX = DX extends DEnumerator ? LEnumerator : (DX extends DAttribute ? LAttribute : (DX extends DReference ? LReference : (DX extends DRefEdge ? LRefEdge : (DX extends DExtEdge ? LExtEdge : (DX extends DDataType ? LDataType : (DX extends DClass ? LClass : (DX extends DStructuralFeature ? LStructuralFeature : (DX extends DParameter ? LParameter : (DX extends DOperation ? LOperation : (DX extends DEdge ? LEdge : (DX extends DEdgePoint ? LEdgePoint : (DX extends DGraphVertex ? LGraphVertex : (DX extends DModel ? LModel : (DX extends DValue ? LValue : (DX extends DObject ? LObject : (DX extends DEnumLiteral ? LEnumLiteral : (DX extends DPackage ? LPackage : (DX extends DClassifier ? LClassifier : (DX extends DTypedElement ? LTypedElement : (DX extends DVertex ? LVertex : (DX extends DVoidEdge ? LVoidEdge : (DX extends DVoidVertex ? LVoidVertex : (DX extends DGraph ? LGraph : (DX extends DNamedElement ? LNamedElement : (DX extends DAnnotation ? LAnnotation : (DX extends DGraphElement ? LGraphElement : (DX extends DMap ? LMap : (DX extends DModelElement ? LModelElement : (DX extends DUser ? LUser : (DX extends DPointerTargetable ? LPointerTargetable : (ERROR)))))))))))))))))))))))))))))))>(data: DX[]): LX[];
    static fromPointer<T extends AnyPointer | AnyPointer[], // <DPointerTargetable, 1, 'N', LPointerTargetable>,
    DDD extends (T extends Pointer<any, any, any, infer D> ? D : 'undefined L'), LOW extends (T extends Pointer<any, infer LO> ? LO : 'undefined_upp'), UPP extends (T extends Pointer<any, number, infer UP> ? UP : 'undefined_low'), DDDARR extends (T extends Pointer<any, any, any, infer D>[] ? D : 'undefined_DARR'), LOWARR extends (T extends Pointer<any, infer LO>[] ? LO : 'undefined_uppARR'), UPPARR extends (T extends Pointer<any, number, infer UP>[] ? 'UP_is_N' : 'undefined_lowARR'), RET = UPPARR extends 'UP_is_N' ? (DDDARR[]) : (UPP extends 1 ? (LOW extends 0 ? DDD | null : DDD) : (LOW extends 1 ? DDD : undefined)), INFERRED = {
        ret: RET;
        upp: UPP;
        low: LOW;
        ddd: DDD;
        dddARR: DDDARR;
        lowARR: LOWARR;
        uppARR: UPPARR;
    }>(ptr: T | undefined, state?: DState): RET;
    static fromArr(...a: any): any;
    static from<// LOW extends number, UPP extends number | 'N',
    PTR extends Pointer<DPointerTargetable, 0 | 1, 1 | 'N', LPointerTargetable> | Pointer[], // <DPointerTargetable, 1, 'N', LPointerTargetable>,
    LOW extends (PTR extends Pointer<any, infer LO> ? LO : 'undefined_upp'), UPP extends (PTR extends Pointer<any, number, infer UP> ? UP : 'undefined_low'), DDD extends (PTR extends Pointer<any, number, any, infer LL> ? LL : 'undefined_L'), LOWARR extends (PTR extends Pointer<any, infer LO>[] ? LO : 'undefined_uppARR'), UPPARR extends (PTR extends Pointer<any, number, infer UP>[] ? 'UP_is_N' : 'undefined_lowARR'), DDDARR extends (PTR extends Pointer<any, any, any, infer LL>[] ? LL : 'undefined_LARR'), DX extends DPointerTargetable, RETPTR = UPPARR extends 'UP_is_N' ? (DDDARR[]) : (UPP extends 1 ? (LOW extends 0 ? DDD | null : DDD) : (LOW extends 1 ? DDD : undefined)), LX = DX extends DEnumerator ? LEnumerator : (DX extends DAttribute ? LAttribute : (DX extends DReference ? LReference : (DX extends DRefEdge ? LRefEdge : (DX extends DExtEdge ? LExtEdge : (DX extends DDataType ? LDataType : (DX extends DClass ? LClass : (DX extends DStructuralFeature ? LStructuralFeature : (DX extends DParameter ? LParameter : (DX extends DOperation ? LOperation : (DX extends DEdge ? LEdge : (DX extends DEdgePoint ? LEdgePoint : (DX extends DGraphVertex ? LGraphVertex : (DX extends DModel ? LModel : (DX extends DValue ? LValue : (DX extends DObject ? LObject : (DX extends DEnumLiteral ? LEnumLiteral : (DX extends DPackage ? LPackage : (DX extends DClassifier ? LClassifier : (DX extends DTypedElement ? LTypedElement : (DX extends DVertex ? LVertex : (DX extends DVoidEdge ? LVoidEdge : (DX extends DVoidVertex ? LVoidVertex : (DX extends DGraph ? LGraph : (DX extends DNamedElement ? LNamedElement : (DX extends DAnnotation ? LAnnotation : (DX extends DGraphElement ? LGraphElement : (DX extends DMap ? LMap : (DX extends DModelElement ? LModelElement : (DX extends DUser ? LUser : (DX extends DPointerTargetable ? LPointerTargetable : (ERROR))))))))))))))))))))))))))))))), RET = LX extends 'ERROR' ? RETPTR : (RETPTR extends LX ? RETPTR : LX), INFERRED = {
        ret: RET;
        RETPTR: RETPTR;
        upp: UPP;
        low: LOW;
        ddd: DDD;
        dddARR: DDDARR;
        lowARR: LOWARR;
        uppARR: UPPARR;
        LX: LX;
        DX: DX;
    }>(ptr: PTR | DX, s?: DState): RET;
    dependencies(): Dependency[];
    protected get_dependencies(context: Context): () => Dependency[];
    delete(): void;
    protected get_delete(context: Context): () => void;
}
export declare class WPointerTargetable extends DPointerTargetable {
    id: never;
    _storePath: never;
    _subMaps: never;
    pointedBy: never;
    static fromD<DX extends DPointerTargetable, WX extends DtoW<DX>>(data: DX): WX;
}
export declare class DUser extends DPointerTargetable {
    static offlineMode: boolean;
    static current: Pointer<DUser>;
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    id: Pointer<DUser>;
    username: string;
    projects: Pointer<DProject, 0, 'N', LProject>;
    project: Pointer<DProject, 0, 1, LProject>;
    __isUser: true;
    static new(username: string, id?: DUser['id'], persist?: boolean): DUser;
}
export declare class LUser<Context extends LogicContext<DUser> = any, D extends DUser = DUser> extends LPointerTargetable {
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    __raw: DUser;
    id: Pointer<DUser>;
    username: string;
    projects: LProject[];
    project: LProject | null;
    __isUser: true;
    protected get_projects(context: Context): this['projects'];
    protected set_projects(val: PackArr<this['projects']>, context: Context): boolean;
    protected get_project(context: Context): this['project'];
    protected set_project(val: Pack<Exclude<this['project'], null>> | null, context: Context): boolean;
}
export declare type WUser = getWParams<LUser, DUser>;
export declare class DProject extends DPointerTargetable {
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    id: Pointer<DProject, 1, 1, LProject>;
    type: 'public' | 'private' | 'collaborative';
    name: string;
    author: Pointer<DUser>;
    collaborators: Pointer<DUser, 0, 'N'>;
    onlineUsers: number;
    metamodels: Pointer<DModel, 0, 'N'>;
    models: Pointer<DModel, 0, 'N'>;
    graphs: Pointer<DGraph, 0, 'N'>;
    viewpoints: Pointer<DViewPoint, 0, 'N'>;
    activeViewpoint: Pointer<DViewPoint, 1, 1>;
    static new(type: DProject['type'], name: string, m2?: DModel[], m1?: DModel[]): DProject;
}
export declare class LProject<Context extends LogicContext<DProject> = any, D extends DProject = DProject> extends LPointerTargetable {
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    readonly id: Pointer<DProject>;
    type: 'public' | 'private' | 'collaborative';
    author: LUser;
    collaborators: LUser[];
    onlineUsers: number;
    name: string;
    metamodels: LModel[];
    models: LModel[];
    graphs: LGraph[];
    viewpoints: LViewPoint[];
    activeViewpoint: LViewPoint;
    readonly packages: LPackage[];
    readonly classes: LClass[];
    readonly attributes: LAttribute[];
    readonly references: LReference[];
    readonly operations: LOperation[];
    readonly parameters: LParameter[];
    readonly enumerators: LEnumerator[];
    readonly literals: LEnumLiteral[];
    readonly objects: LObject[];
    readonly values: LValue[];
    readonly allNodes: NodeTypes[];
    readonly graphVertexes: LGraphVertex[];
    readonly voidVertexes: LVoidVertex[];
    readonly vertexes: LVertex[];
    readonly fields: LGraphElement[];
    readonly edges: LEdge[];
    readonly edgePoints: LEdgePoint[];
    readonly children: LPointerTargetable[];
    readonly views: LViewElement[];
    protected get_name(context: Context): this['name'];
    protected set_name(val: this['name'], context: Context): boolean;
    protected get_author(context: Context): this['author'];
    protected set_author(val: Pack<this['author']>, context: Context): boolean;
    protected get_collaborators(context: Context): this['collaborators'];
    protected set_collaborators(val: PackArr<this['collaborators']>, context: Context): boolean;
    protected get_onlineUsers(context: Context): this['onlineUsers'];
    protected set_onlineUsers(val: this['onlineUsers'], context: Context): boolean;
    protected get_metamodels(context: Context): this['metamodels'];
    protected set_metamodels(val: PackArr<this['metamodels']>, context: Context): boolean;
    protected get_models(context: Context): this['models'];
    protected set_models(val: PackArr<this['models']>, context: Context): boolean;
    protected get_graphs(context: Context): this['graphs'];
    protected set_graphs(val: PackArr<this['graphs']>, context: Context): boolean;
    protected get_views(c: Context): this['views'];
    protected set_views(val: PackArr<this['views']>, context: Context): boolean;
    protected get_viewpoints(context: Context): this['viewpoints'];
    protected set_viewpoints(val: PackArr<this['viewpoints']>, context: Context): boolean;
    protected get_activeViewpoint(context: Context): this['activeViewpoint'];
    protected set_activeViewpoint(val: Pack1<this['activeViewpoint']>, context: Context): boolean;
    protected get_packages(context: Context): this['packages'];
    protected get_classes(context: Context): this['classes'];
    protected get_attributes(context: Context): this['attributes'];
    protected get_references(context: Context): this['references'];
    protected get_operations(context: Context): this['operations'];
    protected get_parameters(context: Context): this['parameters'];
    protected get_enumerators(context: Context): this['enumerators'];
    protected get_literals(context: Context): this['literals'];
    protected get_objects(context: Context): this['objects'];
    protected get_values(context: Context): this['values'];
    protected get_allNodes(context: Context): this['allNodes'];
    protected get_graphVertexes(context: Context): this['graphVertexes'];
    protected get_voidVertexes(context: Context): this['voidVertexes'];
    protected get_vertexes(context: Context): this['vertexes'];
    protected get_fields(context: Context): this['fields'];
    protected get_edges(context: Context): this['edges'];
    protected get_edgePoints(context: Context): this['edgePoints'];
    protected get_children(context: Context): this['children'];
    delete(): void;
    protected get_delete(context: Context): () => void;
}
export declare type WProject = getWParams<LProject, DProject>;
export declare class MyError extends Error {
    constructor(message?: string, ...otherMsg: any[]);
}
export declare class JsType {
    printableTypeName: string;
    check: (data: any) => boolean;
    isExclusiveType: boolean;
    static all: JsType[];
    static object: JsType;
    static function: JsType;
    static array: JsType;
    static date: JsType;
    static lambdaFunction: JsType;
    static nonLambdaFunction: JsType;
    static symbol: JsType;
    static undefined: JsType;
    static null: JsType;
    static boolean: JsType;
    static number: JsType;
    static bigint: JsType;
    static string: JsType;
    private constructor();
    toString(): string;
    static isOnlyType(data: any, type: JsType): boolean;
    static isAnyOfTypes(data: any, ...acceptables: JsType[]): boolean;
    static getTypes(data: any, stopIfTypeIsNot?: JsType): JsType[];
    static isObject(data: GObject | any, returnIfNull?: boolean): boolean;
    static isFunction(data: Function | any): boolean;
    static isLambdaFunction(data: Function | any): boolean;
    static isNonLambdaFunction(data: Function | any): boolean;
    static isArray(data: Array<any> | any): boolean;
    static isSymbol(data: symbol | any): boolean;
    static isBoolean(data: symbol | any): boolean;
    static isNumber(data: number | any): boolean;
    static isBigint(data: bigint | any): boolean;
    static isString(data: string | any): boolean;
    static isNull(data: null | any): boolean;
    static isUndefined(data: undefined | any): boolean;
    static isDate(data: Date | any): boolean;
    static asObject<T>(data: GObject | any, fallbackReturn: T): T | GObject;
    static asFunction<T>(data: Function | any, fallbackReturn: T): T | Function;
    static asLambdaFunction<T>(data: Function | any, fallbackReturn: T): T | Function;
    static asNonLambdaFunction<T>(data: Function | any, fallbackReturn: T): T | Function;
    static asArray<T, A>(data: Array<A> | any, fallbackReturn: T): T | Array<A>;
    static asSymbol<T>(data: symbol | any, fallbackReturn: T): T | symbol;
    static asBoolean<T>(data: boolean | any, fallbackReturn: T): T | boolean;
    static asNumber<T>(data: number | any, fallbackReturn: T): T | number;
    static asBigint<T>(data: bigint | any, fallbackReturn: T): T | bigint;
    static asString<T>(data: string | any, fallbackReturn: T): T | string;
    static asNull<T>(data: null | any, fallbackReturn: T): T | null;
    static asUndefined<T>(data: undefined | any, fallbackReturn: T): T | undefined;
    static asDate<T>(data: Date | any, fallbackReturn: T): T | Date;
    static isPrimitive(data: any): boolean;
}
export declare function MixOnlyFuncs2<A1 extends any[], I1, S1, A2 extends any[], I2, S2>(c1: Class<A1, I1, S1> & typeof RuntimeAccessibleClass, c2: Class<A2, I2, S2> & typeof RuntimeAccessibleClass): Class<A1, I1, S1> & Class<A2, I2, S2>;
export declare function MixOnlyFuncs3<A1 extends any[], I1, S1, A2 extends any[], I2, S2>(c1: Class<A1, I1, S1> & typeof RuntimeAccessibleClass, c2: Class<A2, I2, S2> & typeof RuntimeAccessibleClass): Class<A1 & A2, I1 & I2, S1 & S2>;
export declare function MixOnlyFuncs<A1 extends any[], I1, S1, A2 extends any[], I2, S2>(c1: Class<A1, I1, S1> & typeof RuntimeAccessibleClass, c2: Class<A2, I2, S2> & typeof RuntimeAccessibleClass): CClass<Longest<A1, A2>, I1 & I2 & {
    superclass1: Dictionary<DocString<'constructor name to make sure the user knows what superclass constructor is calling'>, (...superConstructor1Params: ConstructorParameters<Class<A1, I1, S1>>) => void>;
    superclass2: Dictionary<DocString<'constructor name to make sure the user knows what superclass constructor is calling'>, (...superConstructor2Params: ConstructorParameters<Class<A2, I2, S2>>) => void>;
} & AbstractMixedClass, S1 & S2 & GObject & typeof AbstractMixedClass>;
export declare type NotAString<T extends any = 'uselessval', T2 extends any = any, T3 extends any = any, T4 extends any = any> = string & Omit<string, 'bold'> & {
    bolda?: T;
};
export declare type Pointer<T extends DPointerTargetable = DPointerTargetable, lowerbound extends number = 1, upperbound extends number | 'N' = 1, RET extends LPointerTargetable = DtoL<T>> = upperbound extends 'N' ? NotAString<T, lowerbound, upperbound, RET>[] : (upperbound extends 0 ? never : (lowerbound extends 0 ? (NotAString<T, lowerbound, upperbound, RET> | null) : NotAString<T, upperbound, lowerbound, RET>));
export declare type PtrString = any;
declare type ERROR = "_TYPE_ERROR_";
/**
 i have a documentation type that is actually a string, but it\'s have a different purpose from the others, and i made a type to keep documentally separated.
 let's say it's
 type StringOf<P> = string; // regardless of P

 and i use it to define objects

 class C {
           str: StringOf<Date>;
           str2: StringOf<number>;
           purestring: string;
           num: number
         }
 now i want to crete a derivate type that excludes all properties of type StringOf from C



 type OnlyKeysOfTypeTmp<T, IncludeType> = ({[P in keyof T]: T[P] extends IncludeType ? P : never })[keyof T];
 type OnlyKeysOfType<T, IncludeType> = Pick<T, OnlyKeysOfTypeTmp<T, IncludeType>>;
 type RemoveKeysOfType<T, ExcludeType> = Exclude2<T, OnlyKeysOfType<T, string>>;

 type D = RemoveKeysOfType<C, StringOf<any>>
 due to duck typing, this removes all StringOf attributes, but also "purestring" attribute.
 how can i remove only StringOf attributes?


 */
export declare type getWParams<L extends LPointerTargetable, D extends Object> = {
    [Property in keyof L]: (Property extends string ? (Property extends "id" ? 'id is read-only' : (L[`set_${Property}`] extends (a: any, b: any, ...b: any) => any ? Parameters<L[`set_${Property}`]>[0] : never)) : never);
};
export declare enum EGraphElements {
    "GraphElement" = "GraphElement",
    "Field" = "GraphElement",
    "Vertex" = "Vertex",
    "todo" = "todo"
}
export declare enum EModelElements {
    "(m2) Model" = "DModel",
    "(m2) Package" = "DPackage",
    "(m2) Class" = "DClass",
    "(m2) Enum" = "DEnumerator",
    "(m2) Literal" = "DEnumLiteral",
    "(m2) Operation" = "DOperation",
    "(m2) Parameter" = "DParameter",
    "(m2) Attribute" = "DAttribute",
    "(m2) Reference" = "DReference",
    "(m2) Annotation" = "DAnnotation",
    "(abstract m2) Feature" = "DStructuralFeature",
    "(abstract m2) Classifier" = "DClassifier",
    "(m1) Object" = "DObject",
    "(m1) Value" = "DValue"
}
export declare class ViewEClassMatch {
    static NOT_EVALUATED_YET: undefined;
    static MISMATCH: number;
    static MISMATCH_PRECONDITIONS: number;
    static MISMATCH_OCL: number;
    static IMPLICIT_MATCH: number;
    static INHERITANCE_MATCH: number;
    static EXACT_MATCH: number;
}
export declare class NodeTransientProperties {
    viewSorted_modelused?: LModelElement;
    viewSorted_pvid_used?: DViewElement;
    viewSorted_nodeused?: LGraphElement;
    stackViews: LViewElement[];
    validMainViews: LViewElement[];
    mainView: LViewElement;
    viewScores: Dictionary<Pointer<DViewElement>, {
        jsxOutput: React.ReactNode | React.ReactElement | undefined;
        score: number;
        usageDeclarations: GObject;
        evalContext: GObject;
        shouldUpdate: boolean;
        shouldUpdate_reason: GObject;
        nodeidcounter: Dictionary<number, number>;
    }>;
    evalContext: GObject;
}
declare type ViewTransientProperties = {
    oclUpdateCondition_PARSED: (oldData: LModelElement, newData: LModelElement) => boolean;
    oclEngine: OclEngine;
    JSXFunction: (scope: GObject) => ReactNode;
    UDFunction: (scope: GObject, ret: GObject) => void;
    constantsList: string[];
    UDList: string[];
    constants: GObject;
    onDataUpdate: undefined | ((context: GObject) => void);
    onDragStart: undefined | ((context: GObject) => void);
    onDragEnd: undefined | ((context: GObject) => void);
    whileDragging: undefined | ((context: GObject) => void);
    onResizeStart: undefined | ((context: GObject) => void);
    onResizeEnd: undefined | ((context: GObject) => void);
    whileResizing: undefined | ((context: GObject) => void);
    onRotationStart: undefined | ((context: GObject) => void);
    onRotationEnd: undefined | ((context: GObject) => void);
    whileRotating: undefined | ((context: GObject) => void);
};
declare type METransientProperties = {
    nodes: Dictionary<Pointer<DGraphElement>, LGraphElement>;
    node?: LGraphElement;
};
export declare const transientProperties: {
    node: Dictionary<NotAString<DGraphElement, 1, 1, LGraphElement<any, any>>, NodeTransientProperties>;
    view: Dictionary<NotAString<DViewElement, 1, 1, LPointerTargetable<any, DPointerTargetable>>, ViewTransientProperties>;
    modelElement: Dictionary<NotAString<DModelElement, 1, 1, LModelElement<any, DModelElement>>, METransientProperties>;
};
export {};
