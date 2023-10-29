import {
    Constructors,
    CoordinateMode,
    CreateElementAction,
    DAttribute,
    DClass,
    DClassifier,
    DEdgePoint,
    DEnumerator,
    DEnumLiteral,
    DExtEdge,
    DGraph,
    DGraphElement,
    DGraphVertex,
    Dictionary,
    DLog,
    DModel,
    DModelElement,
    DObject,
    DOperation,
    DPackage,
    DParameter,
    DPointerTargetable,
    DRefEdge,
    DReference,
    DUser,
    DValue,
    DVertex,
    DViewElement,
    DViewPoint,
    DVoidEdge,
    EdgeBendingMode,
    EdgeHead,
    GObject,
    GraphPoint,
    GraphSize,
    LAttribute,
    LClass,
    LClassifier,
    LEdgePoint,
    LEnumerator,
    LEnumLiteral,
    LExtEdge,
    LGraph,
    LGraphElement,
    LGraphVertex,
    LLog,
    LModel,
    LModelElement,
    LObject,
    LogicContext,
    LOperation,
    LPackage,
    LParameter,
    LPointerTargetable,
    LRefEdge,
    LReference,
    LUser,
    LValue,
    LVertex,
    LViewElement,
    LViewPoint,
    Pointer,
    Pointers,
    RuntimeAccessible,
    RuntimeAccessibleClass,
    SetRootFieldAction,
    ShortAttribETypes,
    store,
} from '../joiner';

import React from "react";
import {DV} from "../common/DV";
import LeaderLine from "leader-line-new";
import {DefaultEClasses, ShortDefaultEClasses} from "../common/U";

console.warn('ts loading store');

// @RuntimeAccessible
// NB: le voci che iniziano con '_' sono personali e non condivise


export interface EdgeOptions{
    id: number,
    options: LeaderLine.Options,
    source: string,
    target: string
}

// export const statehistory_obsoleteidea: {past: IStore[], current: IStore, future: IStore[]} = { past:[], current: null, future:[] } as any;
export const statehistory: {
        [userpointer:Pointer<DUser>]: {undoable:GObject<"delta">[], redoable: GObject<"delta">[]}
} & {
    globalcanundostate: boolean // set to true at first user click }
} = { globalcanundostate: false} as any;
statehistory[DUser.current] = {undoable:[], redoable:[]}; // todo: make it able to combine last 2 changes with a keystroke. reapeat N times to combine N actions. let it "redo" multiple times, it's like recording a macro.

(window as any).statehistory = statehistory;
@RuntimeAccessible
export class DState extends DPointerTargetable{
    public static cname: string = "DState";
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    static new(): DState {
        return new Constructors(new DState('dwc'), undefined, false, undefined).DPointerTargetable().DState().end();
    }

    debug: boolean = true;
    logs: Pointer<DLog, 0, 'N', LLog> = [];
    models: Pointer<DModel, 0, 'N'> = []; // Pointer<DModel, 0, 'N'>[] = [];
    currentUser!: DUser;

    viewelements: Pointer<DViewElement, 0, 'N', LViewElement> = [];
    stackViews: Pointer<DViewElement, 0, 'N', LViewElement> = [];

    // users: Dictionary<DocString<Pointer<DUser>>, UserState> = {};
    // collaborators: UserState[];
    idlookup: Record<Pointer<DPointerTargetable, 1, 1>, DPointerTargetable> = {};

    //// DClass section to fill
    graphs: Pointer<DGraph, 0, 'N', LGraph> = [];
    voidvertexs: Pointer<DGraphVertex, 0, 'N', LGraphVertex> = [];
    vertexs: Pointer<DVertex, 0, 'N', LVertex> = [];
    graphvertexs: Pointer<DGraphVertex, 0, 'N', LGraphVertex> = [];

    edgepoints: Pointer<DEdgePoint, 0, 'N', LEdgePoint> = [];
    //my addon
    extEdges: Pointer<DExtEdge, 0, "N", LExtEdge> = [];
    refEdges: Pointer<DRefEdge, 0, "N", LRefEdge> = [];

    classifiers: Pointer<DClassifier, 0, 'N', LClassifier> = [];
    enumerators: Pointer<DEnumerator, 0, 'N', LEnumerator> = [];
    packages: Pointer<DPackage, 0, 'N', LPackage> = [];
    attributes: Pointer<DAttribute, 0, "N", LAttribute> = [];
    enumliterals: Pointer<DEnumLiteral, 0, "N", LEnumLiteral> = [];
    references: Pointer<DReference, 0, "N", LReference> = [];
    classs: Pointer<DClass, 0, "N", LClass> = [];
    operations: Pointer<DOperation, 0, "N", LOperation> = [];
    parameters: Pointer<DParameter, 0, "N", LParameter> = [];
    primitiveTypes: Pointer<DClass, 0, "N", LClass> = [];
    ecoreClasses: Pointer<DClass, 0, "N", LClass> = [];
    returnTypes: Pointer<DClass, 0, "N", LClass> = [];
    /// DClass section end

    isEdgePending: { user: Pointer<DUser, 1, 1, LUser>, source: Pointer<DClass, 1, 1, LClass> } = {
        user: '',
        source: ''
    };

    contextMenu: { display: boolean, x: number, y: number } = {display: false, x: 0, y: 0};

    //dragging: {random: number, id: string} = { random: 0, id: "" }; fix
    edges: EdgeOptions[] = [];  // delete

    deleted: string[] = [];

    objects: Pointer<DObject, 0, 'N', LObject> = [];
    values: Pointer<DValue, 0, 'N', LValue> = [];

    // private, non-shared fields
    _lastSelected?: {
        node: Pointer<DGraphElement, 1, 1>,
        view: Pointer<DViewElement, 1, 1>,
        modelElement: Pointer<DModelElement, 0, 1> // if a node is clicked: a node and a view are present, a modelElement might be. a node can exist without a modelElement counterpart.
    };
    users!: Pointer<DUser, 1, 'N', LUser>;

    viewpoint: Pointer<DViewPoint, 1, 1, LViewPoint> = '';
    viewpoints: Pointer<DViewPoint, 0, 'N', LViewPoint> = [];

    m2models: Pointer<DModel, 0, 'N', LModel> = [];
    m1models: Pointer<DModel, 0, 'N', LModel> = [];

    room: string = '';
    isCleaning: boolean = false;    // check if a room is being cleaned

    //selected: Dictionary<Pointer<DUser>, Pointer<DModelElement, 0, 1, LModelElement>> = {};
    selected: Pointer<DModelElement, 0, 1, LModelElement> = '';
    iot: null|boolean = null;
    topics: string[] = [];

    isLoading: boolean = true;


    static init(store?: DState): void {
        const viewpoint = DViewPoint.new('Default', '');
        viewpoint.id = 'Pointer_DefaultViewPoint';
        CreateElementAction.new(viewpoint);
        SetRootFieldAction.new('viewpoint', viewpoint.id, '', true);

        const views: DViewElement[] = makeDefaultGraphViews();
        for (let view of views) {
            view.id = 'Pointer_View' + view.name;
            view.viewpoint = 'Pointer_DefaultViewPoint';
            CreateElementAction.new(view);
        }

        for (let primitiveType of Object.values(ShortAttribETypes)) {
            let dPrimitiveType;
            if (primitiveType === ShortAttribETypes.EVoid) continue; // or make void too without primitiveType = true, but with returnType = true?
            else {
                dPrimitiveType = DClass.new(primitiveType, false, false, true, false, '', undefined, false);
                dPrimitiveType.id = 'Pointer_' + primitiveType.toUpperCase();
                CreateElementAction.new(dPrimitiveType);
            }
            SetRootFieldAction.new('primitiveTypes', dPrimitiveType.id, '+=', true);
        }

        for (let defaultEcoreClass of Object.values(DefaultEClasses)){
            // todo: creat everyone and not just object, make the whole m3 populated.
        }
        let dObject = DClass.new(ShortDefaultEClasses.EObject, false, false, false, false, '', undefined, false);
        dObject.id = 'Pointer_' + ShortDefaultEClasses.EObject.toUpperCase();
        CreateElementAction.new(dObject);
        SetRootFieldAction.new('ecoreClasses', dObject.id, '+=', true);

    }
}

function makeDefaultGraphViews(): DViewElement[] {

    let modelView: DViewElement = DViewElement.new('Model', DV.modelView(), undefined, '', '', '', [DModel.cname]);
    modelView.draggable = false; modelView.resizable = false;
    modelView.query = 'context DModel inv: true';
    modelView.usageDeclarations = "(ret)=>{\n" +
        "// ** preparations and default behaviour here ** //\n" +
        "//ret.data = data\n" +
        "ret.node = node\n" +
        "ret.view = view\n" +
        "// custom preparations:\n" +
        "let packages = data?.packages || [];\n" +
        "let suggestedEdges = data?.suggestedEdges || {};\n" +
        "// data, node, view are dependencies by default. delete them above if you want to remove them.\n" +
        "// add preparation code here (like for loops to count something), then list the dependencies below.\n" +
        "// ** declarations here ** //\n" +
        "ret.firstPackage = packages[0]\n"+
        "ret.otherPackages = packages.slice(1)\n"+
        "ret.m1Objects = data?.allSubObjects || []\n"+
        "ret.refEdges = (suggestedEdges.reference || []).filter(e => !e.vertexOverlaps)\n"+
        "ret.extendEdges = (suggestedEdges.extend || []).filter(e => !e.vertexOverlaps)\n"+
        "}";

    let packageView: DViewElement = DViewElement.new('Package', DV.packageView(), undefined, '', '', '', [DPackage.cname]);
    packageView.defaultVSize = new GraphSize(0, 0, 400, 500);
    packageView.query = `context DPackage inv: true`;

/*
    const defaultPackage: DViewElement = DViewElement.new('DefaultPackage', DV.defaultPackage());
    defaultPackage.defaultVSize = new GraphSize(0, 0);
    defaultPackage.explicitApplicationPriority = 2;
    defaultPackage.query = `context DPackage inv: self.name = 'default'`;
    defaultPackage.draggable = false; defaultPackage.resizable = false;*/


    let classView: DViewElement = DViewElement.new('Class', DV.classView(), undefined, '', '', '', [DClass.cname]);
    classView.adaptWidth = true; classView.adaptHeight = true;
    classView.query = 'context DClass inv: true';

    let enumView: DViewElement = DViewElement.new('Enum', DV.enumeratorView(), undefined, '', '', '', [DEnumerator.cname]);
    enumView.adaptWidth = true; enumView.adaptHeight = true;
    enumView.query = 'context DEnumerator inv: true';

    let attributeView: DViewElement = DViewElement.new('Attribute', DV.attributeView(), undefined, '', '', '', [DAttribute.cname]);
    attributeView.query = 'context DAttribute inv: true';

    let referenceView: DViewElement = DViewElement.new('Reference', DV.referenceView(), undefined, '', '', '', [DReference.cname]);
    referenceView.query = 'context DReference inv: true';

    let operationView: DViewElement = DViewElement.new('Operation', DV.operationView(), undefined, '', '', '', [DOperation.cname]);
    operationView.query = 'context DOperation inv: true';

    let literalView: DViewElement = DViewElement.new('Literal', DV.literalView(), undefined, '', '', '', [DEnumLiteral.cname]);
    literalView.query = 'context DEnumLiteral inv: true';

    let objectView: DViewElement = DViewElement.new('Object', DV.objectView(), undefined, '', '', '', [DObject.cname]);
    objectView.adaptWidth = true; objectView.adaptHeight = true;
    objectView.query = 'context DObject inv: true';
    objectView.usageDeclarations = "(ret)=>{\n" +
        "// ** preparations and default behaviour here ** //\n" +
        "ret.data = data\n" +
        "ret.node = node\n" +
        "ret.view = view\n" +
        "// data, node, view are dependencies by default. delete them above if you want to remove them.\n" +
        "// add preparation code here (like for loops to count something), then list the dependencies below.\n" +
        "// ** declarations here ** //\n" +
        "ret.metaclassName = data.instanceof?.name || \"Object\"\n" +
        "ret.features = data.features\n" +
        "}";

    let valuecolormap: GObject = {};
    valuecolormap[ShortAttribETypes.EBoolean] = "orange";
    valuecolormap[ShortAttribETypes.EByte] = "orange";
    valuecolormap[ShortAttribETypes.EShort] = "orange";
    valuecolormap[ShortAttribETypes.EInt] = "orange";
    valuecolormap[ShortAttribETypes.ELong] = "orange";
    valuecolormap[ShortAttribETypes.EFloat] = "orange";
    valuecolormap[ShortAttribETypes.EDouble] = "orange";
    valuecolormap[ShortAttribETypes.EDate] = "green";
    valuecolormap[ShortAttribETypes.EString] = "green";
    valuecolormap[ShortAttribETypes.EChar] = "green";
    valuecolormap[ShortAttribETypes.EVoid] = "gray";
    let valueView: DViewElement = DViewElement.new2('Value', DV.valueView(), (v)=>{
        v.appliableToClasses = [DValue.cname];
        v.constants = "(ret)=>{ // scope: only native js functions. NOT data, node, view... \n" +
            "// ** preparation code here ** //.\n" +
            "// example: the first N elements of fibonacci sequence are constants, but they require to be computed before usage\n"+
            "let howmany = 10;\n" +
            "let fib = [1, 1];\n" +
            "for (let i = 2; i < howmany; i++) fib[i] = fib[i-2] + fib[i-1];\n" +
            "// ** declarations here ** //\n" +
            "ret.fib = fib\n"+
            "ret.colorMap = " + JSON.stringify(valuecolormap) + "\n"+
        'ret.'+ShortAttribETypes.EBoolean+' = "orange"\n'+
        'ret.'+ShortAttribETypes.EByte+' = "orange"\n'+
        'ret.'+ShortAttribETypes.EShort+' = "orange"\n'+
        'ret.'+ShortAttribETypes.EInt+' = "orange"\n'+
        'ret.'+ShortAttribETypes.ELong+' = "orange"\n'+
        'ret.'+ShortAttribETypes.EFloat+' = "orange"\n'+
        'ret.'+ShortAttribETypes.EDouble+' = "orange"\n'+
        'ret.'+ShortAttribETypes.EDate+' = "green"\n'+
        'ret.'+ShortAttribETypes.EString+' = "green"\n'+
        'ret.'+ShortAttribETypes.EChar+' = "green"\n'+
        'ret.'+ShortAttribETypes.EVoid+' = "gray"\n'+
            "}";
        console.log("colormap 1", {v:{...v}});
    }, false);
    valueView.query = 'context DValue inv: true';

    valueView.usageDeclarations = "(ret)=>{ // scope: data, node, view, state, \n" +
        "// ** preparations and default behaviour here ** //\n" +
        "// ret.data = data // object does not need it because it displays only: features (listed individually) and name input being a subcomponent\n" +
        "ret.node = node\n" +
        "ret.view = view\n" +
        "// todo: put only first N values as dependency and show only those.\n" +
        "// data, node, view are dependencies by default. delete them above if you want to remove them.\n" +
        "// add preparation code here (like for loops to count something), then list the dependencies below.\n" +
        "// ** declarations here ** //\n" +
        "ret.instanceofname = data.instanceof?.name\n" +
        "ret.valuesString = data.valuesString()\n" +
        "ret.typeString = data.typeString\n" +
        "}";

    let voidView: DViewElement = DViewElement.new('Void', DV.voidView(), undefined, '', '', '', [DObject.cname]);
    voidView.appliableToClasses=["VoidVertex"];
    voidView.explicitApplicationPriority = 2;
    voidView.adaptWidth = true; voidView.adaptHeight = true;

    let edgePointView: DViewElement = DViewElement.new('EdgePoint', DV.edgePointView(), new GraphSize(0, 0, 25, 25), '', '', '', []);
    edgePointView.appliableTo = 'edgePoint'; edgePointView.resizable = false;
    // edgePointView.edgePointCoordMode = CoordinateMode.relativePercent;
    edgePointView.edgePointCoordMode = CoordinateMode.absolute;

    let edgeViews: DViewElement[] = [];
    let size0: GraphPoint = new GraphPoint(0, 0), size1: GraphPoint = new GraphPoint(20, 20), size2: GraphPoint = new GraphPoint(20, 20); // todo: riportalo in 40,20
    let edgeConstants: string = "(ret)=>{\n" +
        "// ** preparations and default behaviour here ** //\n" +
        "// add preparation code here (like for loops to count something), then list the dependencies below.\n" +
        "// ** declarations here ** //\n" +
        "   ret.strokeColor = 'gray'\n"+
        "   ret.strokeWidth = '2px'\n"+
        "   ret.strokeColorHover = 'black'\n"+
        "   ret.strokeColorLong = 'gray'\n"+
        "   ret.strokeLengthLimit = 300\n"+
        "   ret.strokeWidthHover = '4px'\n"+
        "}";
    let edgePrerenderFunc: string = "(ret)=>{\n" +
        "// ** preparations and default behaviour here ** //\n" +
        "// add preparation code here (like for loops to count something), then list the dependencies below.\n" +
        "// ** declarations here ** //\n" +
        "ret.segments = edge.segments\n"+
        "}";

    let edgeUsageDeclarations = "(ret)=>{\n" +
        "// ** preparations and default behaviour here ** //\n" +
        "// ret.data = data\n" +
        "// ret.edge = edge\n" +
        "ret.view = view\n" +
        "// data, edge, view are dependencies by default. delete them above if you want to remove them.\n" +
        "// add preparation code here (like for loops to count something), then list the dependencies below.\n" +
        "// ** declarations here ** //\n" +
        "ret.start = edge.start\n"+
        "ret.end = edge.end\n"+
        "}";
    function makeEdgeView(name: string, type: EdgeHead, headSize: GraphPoint | undefined, tailSize: GraphPoint | undefined, dashing: boolean): DViewElement{
        let ev = DViewElement.new2("Edge"+name, DV.edgeView(type,
                headSize ? DV.svgHeadTail("Head", type) : "", tailSize ? DV.svgHeadTail("Tail", type) : "", dashing ? "10.5,9,0,0" : undefined),
            (v: DViewElement) => {
                v.explicitApplicationPriority = 2;
                v.bendingMode = EdgeBendingMode.Line;
                v.appliableToClasses = [DVoidEdge.cname];
                v.edgeHeadSize = headSize || size0;
                v.edgeTailSize = tailSize || size0;
                v.constants = edgeConstants;
                v.usageDeclarations = edgeUsageDeclarations;
                v.preRenderFunc = edgePrerenderFunc;
                v.appliableTo = 'edge'; // todo: remove the entire property?
        }, false);
        edgeViews.push(ev);
        return ev;
    }

    makeEdgeView("Association", EdgeHead.reference,             size1,   undefined,  false);
    makeEdgeView("Dependency",  EdgeHead.reference,             size1,   undefined,  true);
    makeEdgeView("Inheritance", EdgeHead.extend,                size1,   undefined,  false);
    makeEdgeView("Dependency",  EdgeHead.extend,                size1,   undefined,  true);
    makeEdgeView("Aggregation", EdgeHead.aggregation,   undefined,      size2,      false);
    makeEdgeView("Composition", EdgeHead.composition,   undefined,      size2,      false);

    // edgeView.forceNodeType="Edge"

    /*
    for (let ev of edgeViews){
        ev.explicitApplicationPriority = 2;
        ev.bendingMode = EdgeBendingMode.Line;
        ev.subViews = [edgePointView.id];
    }*/
    // nb: Error is not a view, just jsx. transform it in a view so users can edit it

    return [modelView, packageView, //defaultPackage,
        classView, enumView, attributeView, referenceView, operationView,
        literalView, objectView, valueView, voidView, ...edgeViews, edgePointView];
}

@RuntimeAccessible
export class ViewPointState extends DPointerTargetable{
    public static cname: string = "ViewPointState";
    name: string = '';
}

// todo: ogni entità ha: dati (store), logica con operazioni, dati di presentazione, ...?

@RuntimeAccessible
export class ModelStore {
    public static cname: string = "ModelStore";
    private _meta!: ModelStore | string; // todo: credo sia un Pointer? roba vecchia. oldcomment: // string memorizzata nello store, logicamente si comporta come una reference perchè usi la stringa per recuperare un modelstore (il tipo modelstore è di documentazione)
    instances!: (ModelStore | string)[];

    // getter e setter senza proxy
    get meta(): ModelStore | string {
        return this._meta;
    }

    set meta(value: ModelStore | string) {
        this._meta = value;
    }
}



@RuntimeAccessible
export class LState<Context extends LogicContext<DState> = any, C extends Context = Context, D extends DState = DState> extends LPointerTargetable {
    public static cname: string = "LState";
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    public __raw!: DPointerTargetable & DState;
    public static structure: typeof DPointerTargetable;
    public static singleton: LPointerTargetable;
    // return type is wrong, but have to extend the static method of RuntimeAccessibleClass which is completely different and returns a class constructor.
    static get<T2 extends typeof RuntimeAccessibleClass & { logic?: typeof LPointerTargetable | undefined; }>(): T2 & LState { return LState.wrap(store.getState() as any) as any; }
    contextMenu!: {display: boolean, x: number, y: number};
    currentUser!: LUser;
    debug!: boolean;
    room!: string;
    _lastSelected?: {modelElement?: LModelElement, node?: LGraphElement, view?: LViewElement};
    idlookup!:Dictionary<Pointer, DPointerTargetable>;

    get_contextMenu(c: Context): this["contextMenu"] { return c.data.contextMenu; }
    get_currentUser(c: Context): this["currentUser"] { return LState.wrap(c.data.currentUser) as LUser; }
    get_debug(c: Context): this["debug"] { return c.data.debug; }
    get_room(c: Context): this["room"] { return c.data.room; }
    get_idlookup(c: Context): this["idlookup"] { return c.data.idlookup; }
    get__lastSelected(c: Context): this["_lastSelected"] {
        let ls = c.data._lastSelected;
        return ls && {modelElement: LState.wrap(ls.modelElement), node: LState.wrap(ls.node), view: LState.wrap(ls.view)}; }

    _defaultCollectionGetter(c: Context, k: keyof DState): LPointerTargetable[] { return LPointerTargetable.fromPointer(c.data[k] as any); }
    _defaultGetter(c: Context, k: keyof DState) {
        //console.log("default Getter");
        let v = c.data[k];
        if (Array.isArray(v)) {
            if (v.length === 0) return [];
            else if (Pointers.isPointer(v[0] as any)) return this._defaultCollectionGetter(c, k);
            return v;
        }
        return v;
    }
}

// console.error("dpt" +DPointerTargetable, DPointerTargetable);
RuntimeAccessibleClass.set_extend(DPointerTargetable, DState);
RuntimeAccessibleClass.set_extend(LPointerTargetable, LState);

