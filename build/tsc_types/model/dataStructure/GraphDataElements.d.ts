/// <reference types="react" />
import { Dictionary, DModelElement, DocString, DPointerTargetable, DUser, DViewElement, EdgeBendingMode, getWParams, GObject, GraphElementComponent, GraphPoint, GraphSize, Info, LModelElement, LogicContext, LPointerTargetable, LViewElement, Pack1, PackArr, Point, Pointer, PrimitiveType, RuntimeAccessibleClass, Size } from "../../joiner";
import { EdgeGapMode, InitialVertexSize } from "../../joiner/types";
import { labelfunc } from "../../joiner/classes";
export declare const packageDefaultSize: GraphSize;
export declare class DGraphElement extends DPointerTargetable {
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    id: Pointer<DGraphElement, 1, 1, LGraphElement>;
    graph: Pointer<DGraph, 1, 1, LGraph>;
    model?: Pointer<DModelElement, 0, 1, LModelElement>;
    isSelected: Dictionary<DocString<Pointer<DUser>>, boolean>;
    subElements: Pointer<DGraphElement, 0, 'N', LGraphElement>;
    state: GObject;
    father: Pointer<DGraphElement, 1, 1, LGraphElement>;
    x: number;
    y: number;
    zIndex: number;
    w: number;
    h: number;
    view: Pointer<DViewElement, 1, 1, LViewElement>;
    favoriteNode: boolean;
    edgesIn: Pointer<DEdge>[];
    edgesOut: Pointer<DEdge>[];
    static new(htmlindex: number, model: DGraphElement["model"] | null | undefined, parentNodeID: DGraphElement["father"], graphID: DGraphElement["graph"], nodeID?: DGraphElement["id"] | undefined, a?: any, b?: any, ...c: any): DGraphElement;
}
export declare class LGraphElement<Context extends LogicContext<DGraphElement> = any, C extends Context = Context> extends LPointerTargetable {
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    static getNodeId<L extends LGraphElement, D extends DGraphElement>(o?: L | D | Pointer<D> | LModelElement | DModelElement | Pointer<DModelElement>): Pointer<D>;
    __raw: DGraphElement;
    id: Pointer<DGraphElement, 1, 1, LGraphElement>;
    father: LGraphElement;
    graph: LGraph;
    model?: LModelElement;
    subElements: LGraphElement[];
    state: GObject<"proxified">;
    allSubNodes: LGraphElement[];
    x: number;
    y: number;
    width: number;
    height: number;
    z: number;
    zIndex: number;
    __info_of_z__: Info;
    __info_of_zIndex__: Info;
    zoom: GraphPoint;
    html?: Element;
    w: number;
    h: number;
    size: GraphSize;
    position: GraphPoint;
    htmlSize: Size;
    htmlPosition: Point;
    view: LViewElement;
    component: GraphElementComponent;
    favoriteNode: boolean;
    vertex?: LVoidVertex;
    __info__of__vertex: Info;
    __info__of__favoriteNode: Info;
    startPoint: GraphPoint;
    endPoint: GraphPoint;
    __info_of__startPoint: Info;
    __info_of__endPoint: Info;
    __info_of__graph: Info;
    innerGraph: LGraph;
    __info_of__innnerGraph: Info;
    outerGraph: LGraph;
    __info_of__outerGraphGraph: Info;
    get_graph(context: Context): LGraph;
    __info_of__graphAncestors: Info;
    graphAncestors: LGraph[];
    edgesIn: LVoidEdge[];
    edgesOut: LVoidEdge[];
    __info_of__edgesIn: Info;
    __info_of__edgesOut: Info;
    __info_of__edgesStart: Info;
    __info_of__edgesEnd: Info;
    get_edgesIn(context: Context): this["edgesIn"];
    get_edgesOut(context: Context): this["edgesOut"];
    set_edgesIn(val: PackArr<LVoidEdge>, c: Context): boolean;
    set_edgesOut(val: PackArr<LVoidEdge>, c: Context): boolean;
    get_edgesStart(context: Context): this["edgesIn"];
    get_edgesEnd(context: Context): this["edgesOut"];
    set_edgesStart(val: PackArr<LVoidEdge>, context: Context): boolean;
    set_edgesEnd(val: PackArr<LVoidEdge>, context: Context): boolean;
    protected _defaultGetter(c: Context, k: keyof Context["data"]): any;
    protected _defaultSetter(v: any, c: Context, k: keyof Context["data"]): true;
    get_graphAncestors(c: Context): LGraph[];
    get_outerGraph(context: Context): LGraph;
    get_vertex(context: Context): this["vertex"];
    get_innerGraph(context: Context): LGraph;
    get_x(context: Context): this["x"];
    set_x(val: this["x"], context: Context): boolean;
    get_y(context: Context): this["y"];
    set_y(val: this["y"], context: Context): boolean;
    get_w(context: Context): this["w"];
    set_w(val: this["w"], context: Context): boolean;
    get_h(context: Context): this["h"];
    set_h(val: this["h"], context: Context): boolean;
    get_width(context: Context): this["w"];
    set_width(val: this["w"], context: Context): boolean;
    get_height(context: Context): this["h"];
    set_height(val: this["h"], context: Context): boolean;
    get_position(context: Context): this["position"];
    set_position(val: this["position"], context: Context): boolean;
    get_sizeold(context: Context): this["size"];
    get_component(context: Context): this["component"];
    get_view(context: Context): this["view"];
    set_view(val: Pack1<this["view"]>, context: Context): void;
    outerSize: LGraphElement["size"];
    __info_of__outerSize: Info;
    innerSize: LGraphElement["size"];
    __info_of__innerSize: Info;
    __info_of__size: Info;
    getSize(outer?: boolean, canTriggerSet?: boolean): Readonly<GraphSize>;
    get_getSize(c: Context): ((outer?: boolean, canTriggerSet?: boolean) => Readonly<GraphSize>);
    get_outerSize(context: Context, canTriggerSet?: boolean): Readonly<GraphSize>;
    get_size(context: Context, canTriggerSet?: boolean): Readonly<GraphSize>;
    get_innerSize(context: Context, canTriggerSet?: boolean, outerSize?: boolean): Readonly<GraphSize>;
    protected get_innerSize_impl(context: Context, canTriggerSet?: boolean, outerSize?: boolean): Readonly<GraphSize>;
    set_size(size: Partial<GraphSize>, c: Context): boolean;
    get_html(context: Context): this["html"];
    set_html(val: this["htmlSize"], context: Context): boolean;
    get_htmlSize(context: Context): this["htmlSize"];
    set_htmlSize(val: this["htmlSize"], context: Context): boolean;
    get_htmlPosition(context: Context): this["htmlPosition"];
    set_htmlPosition(val: this["htmlPosition"], context: Context): boolean;
    get_zIndex(context: Context): this["zIndex"];
    set_zIndex(val: this["zIndex"], context: Context): boolean;
    get_z(context: Context): this["zIndex"];
    set_z(val: this["zIndex"], context: Context): boolean;
    get_subElements(context: Context): this["subElements"];
    set_subElements(val: PackArr<this["subElements"]>, context: LogicContext<DGraphElement>): boolean;
    get_isResized(context: LogicContext<DVoidVertex>): DVoidVertex["isResized"];
    set_isResized(val: DVoidVertex["isResized"], context: LogicContext<DVoidVertex>): DVoidVertex["isResized"];
    get_model(context: Context): this["model"];
    private get_allSubNodes;
    get_father(context: Context): this["father"];
    set_father(val: Pack1<this["father"]>, context: Context): boolean;
    __info_of__isselected: Info;
    __info_of_select: Info;
    __info_of_deselect: Info;
    __info_of_toggleSelect: Info;
    __info_of_isSelected: Info;
    select(forUser?: Pointer<DUser>): void;
    deselect(forUser?: Pointer<DUser>): void;
    toggleSelected(forUser?: Pointer<DUser>): void;
    isSelected(forUser?: Pointer<DUser>): boolean;
    get_select(c: Context): (forUser?: Pointer<DUser>) => void;
    get_deselect(c: Context): (forUser?: Pointer<DUser>) => void;
    get_toggleSelected(context: Context): ((forUser?: Pointer<DUser>) => boolean);
    get_isSelected(context: Context): ((forUser?: Pointer<DUser>) => boolean);
    set_isSelected(val: this["isSelected"], context: Context): boolean;
    get_state(context: LogicContext<DGraphElement>): this["state"];
    set_state(val: this["state"], c: LogicContext<DGraphElement>): boolean;
    get_startPoint(c: Context | undefined, size?: GraphSize, view?: LViewElement): GraphPoint;
    get_endPoint(c: Context | undefined, size?: GraphSize, view?: LViewElement): GraphPoint;
    private get_startEndPoint;
}
export declare class DGraph extends DGraphElement {
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    father: Pointer<DGraphElement, 1, 1, LGraphElement>;
    id: Pointer<DGraph, 1, 1, LGraph>;
    graph: Pointer<DGraph, 1, 1, LGraph>;
    model: Pointer<DModelElement, 1, 1, LModelElement>;
    isSelected: Dictionary<DocString<Pointer<DUser>>, boolean>;
    subElements: Pointer<DGraphElement, 0, 'N', LGraphElement>;
    state: GObject;
    zoom: GraphPoint;
    offset: GraphPoint;
    static new(htmlindex: number, model: DGraph["model"], parentNodeID?: DGraphElement["father"], // immediate parent
    parentgraphID?: DGraphElement["graph"], // graph containing this subgraph (redudant? could get it from father chain)
    nodeID?: DGraphElement["id"]): DGraph;
    static getNodes(dmp: import("../logicWrapper/LModelElement").DModelElement[], out: {
        $matched: JQuery<HTMLElement>;
        $notMatched: JQuery<HTMLElement>;
    }): JQuery<HTMLElement>;
}
export declare class LGraph<Context extends LogicContext<DGraph> = any, D extends DGraph = any> extends LGraphElement {
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    __raw: DGraph;
    id: Pointer<DGraph, 1, 1, LGraph>;
    graph: LGraph;
    model?: LModelElement;
    isSelected(forUser?: Pointer<DUser>): boolean;
    subElements: LGraphElement[];
    state: GObject<"proxified">;
    zoom: GraphPoint;
    graphSize: GraphSize;
    offset: GraphPoint;
    get_offset(context: LogicContext<DGraph>): Readonly<GraphSize>;
    set_offset(val: Partial<GraphPoint>, context: Context): boolean;
    get_zoom(context: Context): GraphPoint;
    toGraphSize(...a: Parameters<this["coord"]>): ReturnType<this["coord"]>;
    coord(htmlSize: Size): GraphSize;
    get_coord(context: Context): (htmlSize: Size) => GraphSize;
    translateSize<T extends GraphSize | GraphPoint>(ret: T, innerGraph: LGraph): T;
    translateHtmlSize<T extends Size | Point, G = T extends Size ? GraphSize : GraphPoint>(size: T): G;
    __info_of__zoom: Info;
    __info_of__offset: Info;
    __info_of__graphSize: Info;
    __info_of__translateSize: Info;
    __info_of__translateHtmlSize: Info;
    get_translateHtmlSize<T extends Size | Point, G = T extends Size ? GraphSize : GraphPoint>(c: Context): ((size: T) => G);
    get_translateSize<T extends GraphSize | GraphPoint>(c: Context): ((size: T, innerGraph: LGraph) => T);
    contains(elem: LGraphElement): boolean;
    get_contains(c: Context): ((elem: LGraphElement) => boolean);
}
export declare class DVoidVertex extends DGraphElement {
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    id: Pointer<DVoidVertex, 1, 1, LVoidVertex>;
    graph: Pointer<DGraph, 1, 1, LGraph>;
    model: Pointer<DModelElement, 0, 1, LModelElement>;
    isSelected: Dictionary<DocString<Pointer<DUser>>, boolean>;
    subElements: Pointer<DGraphElement, 0, 'N', LGraphElement>;
    state: GObject;
    zoom: GraphPoint;
    x: number;
    y: number;
    w: number;
    h: number;
    isResized: boolean;
    static new(htmlindex: number, model: DGraphElement["model"], parentNodeID: DGraphElement["father"], graphID: DGraphElement["graph"], nodeID?: DGraphElement["id"], size?: InitialVertexSize): DVoidVertex;
}
export declare class LVoidVertex<Context extends LogicContext<DVoidVertex> = any, C extends Context = Context> extends LGraphElement {
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    __raw: DVoidVertex;
    id: Pointer<DVoidVertex, 1, 1, LVoidVertex>;
    graph: LGraph;
    model?: LModelElement;
    isSelected(forUser?: Pointer<DUser>): boolean;
    subElements: LGraphElement[];
    state: GObject<"proxified">;
    zoom: GraphPoint;
    isResized: boolean;
    x: number;
    y: number;
    w: number;
    h: number;
    size: GraphSize;
    __info_of__size: {
        type: string;
        txt: string;
    };
    get_isResized(context: LogicContext<DVoidVertex>): DVoidVertex["isResized"];
    set_isResized(val: DVoidVertex["isResized"], context: LogicContext<DVoidVertex>): DVoidVertex["isResized"];
}
export declare class DEdgePoint extends DVoidVertex {
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    id: Pointer<DEdgePoint, 1, 1, LEdgePoint>;
    father: Pointer<DVoidEdge, 1, 1, LVoidEdge>;
    graph: Pointer<DGraph, 1, 1, LGraph>;
    model: Pointer<DModelElement, 0, 1, LModelElement>;
    isSelected: Dictionary<DocString<Pointer<DUser>>, boolean>;
    subElements: Pointer<DGraphElement, 0, 'N', LGraphElement>;
    zoom: GraphPoint;
    x: number;
    y: number;
    w: number;
    h: number;
    size?: GraphSize;
    __isDEdgePoint: true;
    static new(htmlindex: number, model: DEdgePoint["model"] | undefined, parentNodeID: DEdgePoint["father"], graphID?: DEdgePoint["graph"], nodeID?: DGraphElement["id"], size?: InitialVertexSize): DEdgePoint;
}
export declare class LEdgePoint<Context extends LogicContext<DEdgePoint> = any, C extends Context = Context> extends LVoidVertex {
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    father: LVoidEdge;
    id: Pointer<DEdgePoint, 1, 1, LEdgePoint>;
    graph: LGraph;
    model?: LModelElement;
    isSelected(forUser?: Pointer<DUser>): boolean;
    subElements: LGraphElement[];
    zoom: GraphPoint;
    x: number;
    y: number;
    w: number;
    h: number;
    size: GraphSize;
    __isLEdgePoint: true;
    edge: LVoidEdge;
    __info_of__edge: Info;
    get_edge(c: Context): LVoidEdge;
    set_edge(v: Pack1<LVoidEdge>, c: Context): boolean;
    decodePosCoords<T extends Partial<GraphSize> | Partial<GraphPoint>>(c: Context, size: T & any, view: LViewElement, sp0?: GraphPoint, ep0?: GraphPoint): T;
    encodePosCoords<T extends Partial<GraphSize> | Partial<GraphPoint>>(c: Context, size: T, view: LViewElement, sp0?: GraphPoint, ep0?: GraphPoint): T;
}
export declare class DVertex extends DGraphElement {
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    id: Pointer<DVertex, 1, 1, LVertex>;
    graph: Pointer<DGraph, 1, 1, LGraph>;
    model: Pointer<DModelElement, 0, 1, LModelElement>;
    isSelected: Dictionary<DocString<Pointer<DUser>>, boolean>;
    subElements: Pointer<DGraphElement, 0, 'N', LGraphElement>;
    zoom: GraphPoint;
    x: number;
    y: number;
    w: number;
    h: number;
    isResized: boolean;
    __isDVertex: true;
    static new(htmlindex: number, model: DGraphElement["model"], parentNodeID: DGraphElement["father"], graphID: DGraphElement["graph"], nodeID?: DGraphElement["id"], size?: GraphSize): DVertex;
}
export declare class LVertex<Context extends LogicContext<any> = any, D = DVertex> extends LVoidVertex {
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    __raw: DVertex;
    id: Pointer<DVertex, 1, 1, LVertex>;
    graph: LGraph;
    model?: LModelElement;
    isSelected(forUser?: Pointer<DUser>): boolean;
    subElements: LGraphElement[];
    zoom: GraphPoint;
    x: number;
    y: number;
    w: number;
    h: number;
    size: GraphSize;
    isResized: boolean;
    __isLVertex: true;
}
export declare class DGraphVertex extends DGraphElement {
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    id: Pointer<DGraphVertex, 1, 1>;
    graph: Pointer<DGraph, 1, 1, LGraph>;
    model: Pointer<DModelElement, 1, 1, LModelElement>;
    isSelected: Dictionary<DocString<Pointer<DUser>>, boolean>;
    subElements: Pointer<DGraphElement, 0, 'N', LGraphElement>;
    zoom: GraphPoint;
    offset: GraphPoint;
    x: number;
    y: number;
    w: number;
    h: number;
    isResized: boolean;
    __isDVertex: true;
    __isDGraph: true;
    __isDGraphVertex: true;
    static new(htmlindex: number, model: DGraph["model"], parentNodeID: DGraphElement["father"], graphID: DGraphElement["graph"], nodeID?: DGraphElement["id"], size?: GraphSize): DGraphVertex;
}
declare class LG extends LGraph {
}
declare class LV extends LVertex {
}
declare const Mixed: typeof LG & typeof LV & typeof RuntimeAccessibleClass;
export declare class LGraphVertex<Context extends LogicContext<any> = any, D extends DGraphVertex = any> extends Mixed {
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    __raw: DGraphVertex;
    id: Pointer<DGraphVertex, 1, 1>;
    graph: LGraph;
    model?: LModelElement;
    isSelected(forUser?: Pointer<DUser>): boolean;
    zoom: GraphPoint;
    offset: GraphPoint;
    graphSize: GraphSize;
    x: number;
    y: number;
    w: number;
    h: number;
    isResized: boolean;
    size: GraphSize;
    __isLVertex: true;
    __isLGraph: true;
    __isLGraphVertex: true;
}
export declare class DVoidEdge extends DGraphElement {
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    id: Pointer<DVoidEdge, 1, 1, LVoidEdge>;
    graph: Pointer<DGraph, 1, 1, LGraph>;
    model: Pointer<DModelElement, 0, 1, LModelElement>;
    isSelected: Dictionary<DocString<Pointer<DUser>>, boolean>;
    subElements: Pointer<DGraphElement, 0, 'N', LGraphElement>;
    start: Pointer<DGraphElement, 1, 1, LGraphElement>;
    end: Pointer<DGraphElement, 1, 1, LGraphElement>;
    __isDVoidEdge: true;
    midPoints: InitialVertexSize[];
    midnodes: Pointer<DEdgePoint, 1, 1, LEdgePoint>[];
    longestLabel: PrimitiveType | labelfunc;
    labels: PrimitiveType[] | labelfunc[];
    static new(htmlindex: number, model: DGraph["model"] | null | undefined, parentNodeID: DGraphElement["father"], graphID: DGraphElement["graph"], nodeID: DGraphElement["id"] | undefined, start: DGraphElement["id"], end: DGraphElement["id"], longestLabel: DEdge["longestLabel"], labels: DEdge["labels"]): DEdge;
}
export declare class EdgeSegment {
    index: number;
    prev: EdgeSegment | undefined;
    start: segmentmaker;
    bezier: segmentmaker[];
    end: segmentmaker;
    length: number;
    d: string;
    dpart: string;
    m: number;
    rad: number;
    radLabels: number;
    isLongest: boolean;
    label: PrimitiveType | JSX.Element | undefined;
    svgLetter: EdgeBendingMode;
    constructor(start: segmentmaker, mid: segmentmaker[], end: segmentmaker, svgLetter: EdgeBendingMode, gapMode: EdgeGapMode, index: number, prevSegment: EdgeSegment | undefined);
    addBezierPoint(): void;
    makeD(index: number, gapMode: EdgeGapMode): string;
    static invertLastBezierPt(bezier: GraphPoint, end: GraphPoint): GraphPoint;
    calcLength(): void;
}
export declare class EdgeFillSegment extends EdgeSegment {
    static cname: string;
    makeD(index: number, gapMode: EdgeGapMode): string;
}
declare type segmentmaker = {
    size: GraphSize;
    view: LViewElement;
    ge: LGraphElement;
    pt: GraphPoint;
    uncutPt: GraphPoint;
};
export declare class LVoidEdge<Context extends LogicContext<DVoidEdge> = any, D extends DEdge = DEdge> extends LGraphElement {
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    __raw: DVoidEdge;
    id: Pointer<DVoidEdge, 1, 1, LVoidEdge>;
    graph: LGraph;
    model?: LModelElement;
    isSelected(forUser?: Pointer<DUser>): boolean;
    subElements: LGraphElement[];
    start: LGraphElement;
    end: LGraphElement;
    __isLVoidEdge: true;
    midPoints: InitialVertexSize[];
    midnodes: LEdgePoint[];
    edge: LVoidEdge;
    __info_of__edge: Info;
    label: PrimitiveType;
    longestLabel: PrimitiveType;
    labels: PrimitiveType[];
    allNodes: [LGraphElement, ...Array<LEdgePoint>, LGraphElement];
    __info_of__longestLabel: Info;
    __info_of__label: Info;
    __info_of__labels: Info;
    __info_of__allNodes: Info;
    get_label(c: Context): this["longestLabel"];
    get_longestLabel(c: Context): this["longestLabel"];
    set_longestLabel(val: this["longestLabel"], c: Context): boolean;
    get_labels(c: Context): this["labels"];
    set_labels(val: this["labels"], c: Context): boolean;
    headPos_impl(c: Context, isHead: boolean, headSize0?: GraphPoint, segment0?: EdgeSegment, zoom0?: GraphPoint): GraphSize & {
        rad: number;
    };
    headPos(headSize0?: GraphPoint, segment0?: EdgeSegment, zoom0?: GraphPoint): GraphSize & {
        rad: number;
    };
    tailPos(headSize0?: GraphPoint, segment0?: EdgeSegment, zoom0?: GraphPoint): GraphSize & {
        rad: number;
    };
    protected get_headPos(c: Context): this["headPos"];
    protected get_tailPos(c: Context): this["tailPos"];
    protected get_allNodes(c: Context): this["allNodes"];
    protected get_edge(c: Context): this;
    protected set_edge(v: any, c: Context): false;
    protected get_midPoints(c: Context): this["midPoints"];
    addMidPoint(v: this["midPoints"][0]): boolean;
    protected get_addMidPoint(c: Context): (v: this["midPoints"][0]) => boolean;
    protected set_midPoints(val: this["midPoints"], c: Context): boolean;
    protected impl_addMidPoints(val: this["midPoints"][0], c: Context): boolean;
    protected get_label_impl(c: Context, segment: EdgeSegment, nodes: this["allNodes"], segments: EdgeSegment[]): PrimitiveType | undefined;
    __info_of__startPoint: Info;
    __info_of__endPoint: Info;
    get_startPoint(context: Context): GraphPoint;
    get_endPoint(context: Context): GraphPoint;
    get_startPoint_Outer(c: Context): GraphPoint;
    get_endPoint_Outer(c: Context): GraphPoint;
    get_startPoint_inner(c: Context): GraphPoint;
    get_endPoint_inner(c: Context): GraphPoint;
    private get_edgeStartEnd_inner;
    segments: {
        all: EdgeSegment[];
        segments: EdgeSegment[];
        fillers: EdgeSegment[];
        head: GraphSize & {
            rad: number;
        };
        tail: GraphSize & {
            rad: number;
        };
    };
    segments_inner: {
        all: EdgeSegment[];
        segments: EdgeSegment[];
        fillers: EdgeSegment[];
        head: GraphSize & {
            rad: number;
        };
        tail: GraphSize & {
            rad: number;
        };
    };
    segments_outer: {
        all: EdgeSegment[];
        segments: EdgeSegment[];
        fillers: EdgeSegment[];
        head: GraphSize & {
            rad: number;
        };
        tail: GraphSize & {
            rad: number;
        };
    };
    __info_of__segments: Info;
    private svgLetterSize;
    private get_points_impl;
    private get_points;
    private get_points_outer;
    private get_points_inner;
    d: string;
    __info_of__d: Info;
    get_d(c: Context): string;
    get_segments(c: Context): this["segments"];
    get_segments_outer(c: Context): this["segments"];
    get_segments_inner(c: Context): this["segments"];
    private get_segments_impl;
    private setLabels;
    private snapSegmentsToNodeBorders;
    get_edgeEnd(context: Context): GraphPoint;
    get_edgeEnd_outer(c: Context): GraphPoint;
    get_edgeEnd_inner(c: Context): GraphPoint;
    protected get_midnodes(context: Context): this["midnodes"];
    protected set_midnodes(val: D["midnodes"], context: Context): boolean;
    protected get_start(context: Context): this["start"];
    protected get_end(context: Context): this["end"];
}
export declare class DEdge extends DVoidEdge {
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    id: Pointer<DEdge, 1, 1, LEdge>;
    graph: Pointer<DGraph, 1, 1, LGraph>;
    model: Pointer<DModelElement, 0, 1, LModelElement>;
    isSelected: Dictionary<DocString<Pointer<DUser>>, boolean>;
    subElements: Pointer<DGraphElement, 0, 'N', LGraphElement>;
    state: GObject;
    start: Pointer<DGraphElement, 1, 1, LGraphElement>;
    end: Pointer<DGraphElement, 1, 1, LGraphElement>;
    __isDEdge: true;
    __isDVoidEdge: true;
    midnodes: Pointer<DEdgePoint, 1, 1, LEdgePoint>[];
}
export declare class LEdge<Context extends LogicContext<DEdge> = any, D extends DEdge = DEdge> extends LVoidEdge {
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    __raw: DEdge;
    id: Pointer<DEdge, 1, 1, LEdge>;
    graph: LGraph;
    model?: LModelElement;
    isSelected(forUser?: Pointer<DUser>): boolean;
    subElements: LGraphElement[];
    state: GObject<"proxified">;
    start: LGraphElement;
    end: LGraphElement;
    midnodes: LEdgePoint[];
    __isLEdge: true;
    __isLVoidEdge: true;
}
export declare class DExtEdge extends DEdge {
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    id: Pointer<DExtEdge, 1, 1, LExtEdge>;
    graph: Pointer<DGraph, 1, 1, LGraph>;
    model: Pointer<DModelElement, 0, 1, LModelElement>;
    isSelected: Dictionary<DocString<Pointer<DUser>>, boolean>;
    subElements: Pointer<DGraphElement, 0, 'N', LGraphElement>;
    state: GObject;
    start: Pointer<DGraphElement, 1, 1, LGraphElement>;
    end: Pointer<DGraphElement, 1, 1, LGraphElement>;
    __isDExtEdge: true;
    __isDEdge: true;
    __isDVoidEdge: true;
}
export declare class LExtEdge extends LEdge {
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    __raw: DExtEdge;
    id: Pointer<DExtEdge, 1, 1, LExtEdge>;
    graph: LGraph;
    model?: LModelElement;
    isSelected(forUser?: Pointer<DUser>): boolean;
    subElements: LGraphElement[];
    state: GObject<"proxified">;
    start: LGraphElement;
    end: LGraphElement;
    __isLExtEdge: true;
    __isLEdge: true;
    __isLVoidEdge: true;
}
export declare class DRefEdge extends DEdge {
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    start: Pointer<DGraphElement, 1, 1, LGraphElement>;
    end: Pointer<DGraphElement, 1, 1, LGraphElement>;
    isSelected: Dictionary<DocString<Pointer<DUser>>, boolean>;
    __isDRefEdge: true;
}
export declare class LRefEdge extends LEdge {
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    start: LGraphElement;
    end: LGraphElement;
    __isLRefEdge: true;
}
export declare type WExtEdge = getWParams<LExtEdge, DExtEdge>;
export declare type WRefEdge = getWParams<LRefEdge, DRefEdge>;
export declare type WVoidEdge = getWParams<LVoidEdge, DVoidEdge>;
export declare type WGraphVertex = any;
export declare type WEdgePoint = getWParams<LEdgePoint, DEdgePoint>;
export declare type WVoidVertex = getWParams<LVoidVertex, DVoidVertex>;
export declare type WVertex = getWParams<LVertex, DVertex>;
export declare type WEdge = getWParams<LEdge, DEdge>;
export declare type WGraph = getWParams<LGraph, DGraph>;
export declare type WGraphElement = getWParams<LGraphElement, DGraphElement>;
export {};
