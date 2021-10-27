import {Mixin} from "ts-mixer";
import {isDeepStrictEqual} from "util";

import {
    Action,
    bool,
    GraphPoint,
    GraphSize,
    LogicContext,
    Pointer,
    DPointerTargetable,
    SetFieldAction,
    TargetableProxyHandler,
    LPointerTargetable,
    U,
    store,
    LModel,
    DModel,
    RuntimeAccessibleClass, RuntimeAccessible, Dictionary, DocString, DUser, GObject,
} from "../../joiner";

@RuntimeAccessible
export class DGraphElement extends DPointerTargetable {
    static logic: typeof LPointerTargetable;
    graphID: Pointer<DGraph, 1, 1, LGraph>;
    graph!: LGraph;
    size: GraphSize;
    isSelected: Dictionary<DocString<Pointer<DUser>>, boolean> = {};


    containedIn: Pointer<DGraphElement, 0, 1, LGraphElement>;
    subElements: Pointer<DGraphElement, 0, 'N', LGraphElement>;

    constructor(isUser: boolean = false, nodeID: string | undefined, graphID: string, a?: any) {
        super(false, nodeID);
        this.graphID = graphID;
        this.subElements = [];
        this.size = new GraphSize(0, 0, 0, 0);
    }

    get_graph(context: LogicContext<this>): LGraph {
        return TargetableProxyHandler.wrap(this.graphID); }

    set_containedIn(context: LogicContext< this>, val: Pointer<DGraphElement, 0, 'N', LGraphElement>[]): boolean {
        new SetFieldAction(context.data, 'containedIn', val);
        return true;
    }

    set_subElements(context: LogicContext<this>, val: Pointer<DGraphElement, 0, 'N', LGraphElement>): boolean {
        if (isDeepStrictEqual(context.data.subElements, val)) return true;
        new SetFieldAction(context.data, 'subElements', val, Action.SubType.vertexSubElements);
        const idlookup = store.getState().idlookup;
        // new subelements
        for (let newsubelementid of val) {
            let subelement: DGraphElement = (newsubelementid && idlookup[newsubelementid]) as DGraphElement;
            if (subelement.containedIn === context.data.id) continue;
            DPointerTargetable.wrap<DGraphElement, LGraphElement>(subelement).containedIn = context.data.id; // trigger side-action
        }
        // old subelements
        for (let oldsubelementid of context.data.subElements) {
            let subelement: DGraphElement = (oldsubelementid && idlookup[oldsubelementid]) as DGraphElement;
            if (subelement.containedIn !== context.data.id) continue;
            DPointerTargetable.wrap<DGraphElement, LGraphElement>(subelement).containedIn = null; // todo: can this happen? è transitorio o causa vertici senza parent permanenti?
        }
        return true;
    }
}

@RuntimeAccessible
export class DGraph extends DGraphElement {
    size!: GraphSize; // x,y are minimum x,y position of contained vertices, w,h are distance(min_pos, max_pos)
    zoom!: GraphPoint;
    model!: Pointer<DModel, 1, 1, LModel>;

    static create(model: Pointer<DModel>): DGraph {
        let ret = new DGraph(false, undefined, undefined, model);
        ret.id = DGraph.makeID(model);
        return ret;
    }

    constructor(isUser: boolean = false, nodeID: string | undefined, graphID: string | undefined, model: Pointer<DModel>) {
        super(false, nodeID, undefined as any);
        this.graphID = this.id;
        this.size = new GraphSize(0, 0, 0, 0);
        this.zoom = new GraphPoint(1, 1);
        this.model = model;
    }

    static makeID(modelid:Pointer<DModel, 1, 1>): Pointer<DGraph, 1, 1, LGraph> {
        if (!modelid) return modelid;
        return modelid + '^graph';
    }
}

export const defaultVSize: GraphSize = new GraphSize(0, 0, 300, 160); // useless?

@RuntimeAccessible
export class DVoidVertex extends Mixin(DGraphElement, GraphSize) {
    // size: GraphSize;
    // selected: boolean = false;
    size!: GraphSize; // virtual, gets extracted from this. x and y are stored directly here as it extends GraphSize

    constructor(isUser: boolean = false, nodeID: string | undefined, graphID: string) {
        super(false, nodeID, graphID);
        this.clone(defaultVSize as this);
        // this.size = defaultVSize.duplicate();
    }
}

@RuntimeAccessible
export class DEdgePoint extends DVoidVertex {
    static logic: typeof LVoidVertex;// typeof LEdgePoint;
}

@RuntimeAccessible
export class DVoidEdge extends DGraphElement {
    static logic: typeof LGraphElement; //typeof LVoidEdge;
}

@RuntimeAccessible
export class DVertex extends DVoidVertex {
    static logic: typeof LVoidVertex; // typeof LVertex;
}

@RuntimeAccessible
export class DEdge extends DVoidEdge{
    static logic: typeof LVoidEdge; //typeof LEdge;
}

@RuntimeAccessible
export class DExtEdge extends DEdge {
    static logic: typeof LEdge; // typeof LExtEdge;
}

@RuntimeAccessible
export class DRefEdge extends DEdge {
    static logic: typeof LEdge; // typeof LRefEdge;
}

// for edges without a modelling element

@RuntimeAccessible
export class LGraphElement extends Mixin(LPointerTargetable, DGraphElement) {
    static structure: typeof DGraphElement;
    static singleton: LGraphElement;
}

@RuntimeAccessible
export class LGraph extends Mixin(LGraphElement, DGraph) {
    zoom!: GraphPoint;
    // @ts-ignore
    model?: LModel;
    set_size(context: LogicContext< this>, val: GraphSize): boolean {
        new SetFieldAction(context.data, 'size', val);
        return true;
    }
}

@RuntimeAccessible
export class LVoidVertex extends Mixin(LGraphElement, DVoidVertex) {
    static structure: typeof DVoidVertex;
    static singleton: LVoidVertex;

    get_size(context: LogicContext<this>): GraphSize {
        return new GraphSize(context.data.x, context.data.y, context.data.w, context.data.h);
    }
    set_size(context: LogicContext<this>, val: GraphSize): boolean {
        new SetFieldAction(context.data, 'size', val, Action.SubType.vertexSize);
        // (context.proxy as unknown as LGraphElement).graph.size
        const graph: LGraph = this.get_graph(context);
        const gsize = graph.size;
        val.boundary(gsize);
        if (val.equals(gsize)) return true;
        graph.size = val;
        return true;
    }

    get_isSelected(context: LogicContext<this>): GObject {
        return DPointerTargetable.mapWrap(this, context.data, 'idlookup.' + context.data.id + '.isSelected', []);
    }
}

@RuntimeAccessible
export class LVoidEdge extends Mixin(LGraphElement, DVoidEdge) {
    static structure: typeof DVoidEdge;
    static singleton: LVoidEdge;
}

@RuntimeAccessible
export class LVertex extends Mixin(LVoidVertex, DVertex) {
    static structure: typeof DVertex;
    static singleton: LVertex;
}

@RuntimeAccessible
export class LEdge extends Mixin(LVoidEdge, DEdge) {
    static structure: typeof DEdge;
    static singleton: LEdge;
}

@RuntimeAccessible
export class LExtEdge extends Mixin(LEdge, DExtEdge) {
    static structure: typeof DExtEdge;
    static singleton: LExtEdge;
}

@RuntimeAccessible
export class LRefEdge extends Mixin(LEdge, DRefEdge) {
    static structure: typeof DRefEdge;
    static singleton: LRefEdge;
}

@RuntimeAccessible
export class LEdgePoint extends Mixin(LVoidEdge, DEdgePoint) {
    static structure: typeof DEdgePoint;
    static singleton: LEdgePoint;
}