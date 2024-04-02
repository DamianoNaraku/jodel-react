import { DAttribute, DClass, DClassifier, DEdge, DEdgePoint, DEnumerator, DEnumLiteral, DGraph, DGraphElement, DGraphVertex, Dictionary, DLog, DModel, DModelElement, DObject, DocString, DOperation, DPackage, DParameter, DPointerTargetable, DProject, DReference, DUser, DValue, DVertex, DViewElement, DViewPoint, GObject, LGraphElement, LModelElement, LObject, LogicContext, LPointerTargetable, LUser, LValue, LViewElement, Pointer, RuntimeAccessibleClass } from '../joiner';
export declare const statehistory: {
    [userpointer: Pointer<DUser>]: {
        undoable: GObject<"delta">[];
        redoable: GObject<"delta">[];
    };
} & {
    globalcanundostate: boolean;
};
export declare class DState extends DPointerTargetable {
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    static new(): DState;
    env: Dictionary;
    debug: boolean;
    logs: Pointer<DLog>[];
    models: Pointer<DModel, 0, 'N'>;
    viewelements: Pointer<DViewElement, 0, 'N'>;
    stackViews: Pointer<DViewElement, 0, 'N'>;
    idlookup: Record<Pointer<DPointerTargetable>, DPointerTargetable>;
    graphs: Pointer<DGraph, 0, 'N'>;
    voidvertexs: Pointer<DGraphVertex, 0, 'N'>;
    vertexs: Pointer<DVertex, 0, 'N'>;
    graphvertexs: Pointer<DGraphVertex, 0, 'N'>;
    graphelements: Pointer<DGraphVertex, 0, 'N'>;
    edgepoints: Pointer<DEdgePoint, 0, 'N'>;
    edges: Pointer<DEdge, 0, "N">;
    classifiers: Pointer<DClassifier, 0, 'N'>;
    enumerators: Pointer<DEnumerator, 0, 'N'>;
    packages: Pointer<DPackage, 0, 'N'>;
    primitiveTypes: Pointer<DClass, 0, "N">;
    attributes: Pointer<DAttribute, 0, "N">;
    enumliterals: Pointer<DEnumLiteral, 0, "N">;
    references: Pointer<DReference, 0, "N">;
    classs: Pointer<DClass, 0, "N">;
    operations: Pointer<DOperation, 0, "N">;
    parameters: Pointer<DParameter, 0, "N">;
    ecoreClasses: Pointer<DClass, 0, "N">;
    returnTypes: Pointer<DClass, 0, "N">;
    isEdgePending: {
        user: Pointer<DUser>;
        source: Pointer<DClass>;
    };
    contextMenu: {
        display: boolean;
        x: number;
        y: number;
        nodeid: Pointer;
    };
    objects: Pointer<DObject, 0, 'N', LObject>;
    values: Pointer<DValue, 0, 'N', LValue>;
    _lastSelected?: {
        node: Pointer<DGraphElement, 1, 1>;
        view: Pointer<DViewElement, 1, 1>;
        modelElement: Pointer<DModelElement, 0, 1>;
    };
    users: Pointer<DUser, 0, 'N', LUser>;
    viewpoint: Pointer<DViewPoint>;
    viewpoints: Pointer<DViewPoint, 0, 'N'>;
    m2models: Pointer<DModel, 0, 'N'>;
    m1models: Pointer<DModel, 0, 'N'>;
    isLoading: boolean;
    projects: Pointer<DProject, 0, 'N'>;
    collaborativeSession: boolean;
    VIEWS_RECOMPILE_onDataUpdate: Pointer<DViewElement>[];
    VIEWS_RECOMPILE_onDragStart: Pointer<DViewElement>[];
    VIEWS_RECOMPILE_onDragEnd: Pointer<DViewElement>[];
    VIEWS_RECOMPILE_whileDragging: Pointer<DViewElement>[];
    VIEWS_RECOMPILE_onResizeStart: Pointer<DViewElement>[];
    VIEWS_RECOMPILE_onResizeEnd: Pointer<DViewElement>[];
    VIEWS_RECOMPILE_whileResizing: Pointer<DViewElement>[];
    VIEWS_RECOMPILE_onRotationStart: Pointer<DViewElement>[];
    VIEWS_RECOMPILE_onRotationEnd: Pointer<DViewElement>[];
    VIEWS_RECOMPILE_whileRotating: Pointer<DViewElement>[];
    VIEWS_RECOMPILE_constants: Pointer<DViewElement>[];
    VIEWS_RECOMPILE_usageDeclarations: Pointer<DViewElement>[];
    VIEWS_RECOMPILE_jsxString: Pointer<DViewElement>[];
    VIEWS_RECOMPILE_oclCondition: Pointer<DViewElement>[];
    VIEWS_RECOMPILE_jsCondition: Pointer<DViewElement>[];
    VIEWOCL_NEEDS_RECALCULATION: Pointer<DViewElement>[];
    VIEWOCL_UPDATE_NEEDS_RECALCULATION: Pointer<DViewElement>[];
    ClassNameChanged: Dictionary<Pointer<DModelElement>, DocString<"name">>;
    static init(store?: DState): void;
}
export declare class ViewPointState extends DPointerTargetable {
    name: string;
}
export declare class ModelStore {
    private _meta;
    instances: (ModelStore | string)[];
    get meta(): ModelStore | string;
    set meta(value: ModelStore | string);
}
export declare class LState<Context extends LogicContext<DState> = any, C extends Context = Context, D extends DState = DState> extends LPointerTargetable {
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    __raw: DPointerTargetable & DState;
    static structure: typeof DPointerTargetable;
    static singleton: LPointerTargetable;
    static get<T2 extends typeof RuntimeAccessibleClass & {
        logic?: typeof LPointerTargetable | undefined;
    }>(): T2 & LState;
    contextMenu: {
        display: boolean;
        x: number;
        y: number;
    };
    user: LUser;
    debug: boolean;
    room: string;
    _lastSelected?: {
        modelElement?: LModelElement;
        node?: LGraphElement;
        view?: LViewElement;
    };
    idlookup: Dictionary<Pointer, DPointerTargetable>;
    get_contextMenu(c: Context): this["contextMenu"];
    get_debug(c: Context): this["debug"];
    get_idlookup(c: Context): this["idlookup"];
    get__lastSelected(c: Context): this["_lastSelected"];
    _defaultCollectionGetter(c: Context, k: keyof DState): LPointerTargetable[];
    _defaultGetter(c: Context, k: keyof DState): string | number | boolean | string[] | ((() => void) | import("./action/action").Action)[] | import("../joiner").PointedBy[] | DModelElement[] | {
        user: import("../joiner/classes").NotAString<DUser, 1, 1, LUser<any, DUser>>;
        source: import("../joiner/classes").NotAString<DClass, 1, 1, import("../joiner").LClass<DClass, any, any>>;
    } | {
        display: boolean;
        x: number;
        y: number;
        nodeid: import("../joiner/classes").NotAString<DPointerTargetable, 1, 1, LPointerTargetable<any, DPointerTargetable>>;
    } | {
        node: import("../joiner/classes").NotAString<DGraphElement, 1, 1, LGraphElement<any, any>>;
        view: import("../joiner/classes").NotAString<DViewElement, 1, 1, LPointerTargetable<any, DPointerTargetable>>;
        modelElement: import("../joiner/classes").NotAString<DModelElement, 0, 1, LModelElement<any, DModelElement>> | null;
    } | (() => {
        [key: string]: any;
    }[]) | LPointerTargetable<any, DPointerTargetable>[] | Dictionary<any, any> | Record<import("../joiner/classes").NotAString<DPointerTargetable, 1, 1, LPointerTargetable<any, DPointerTargetable>>, DPointerTargetable> | undefined;
}
