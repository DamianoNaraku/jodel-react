import React, { CSSProperties, ReactNode } from "react";
import type { DEdge, DGraph, DGraphElement, DModelElement, DViewElement, LGraph, LGraphElement, LModelElement, LViewElement, Pointer } from "../../../joiner";
import { Dictionary, LClass, LEdge, LUser, LViewPoint, LVoidVertex } from "../../../joiner";
import { InitialVertexSize } from "../../../joiner/types";
export declare class GraphElementStatee {
    classes: string[];
}
export declare class GraphElementReduxStateProps {
    view: LViewElement;
    views: LViewElement[];
    node: LGraphElement;
    data?: LModelElement;
    isEdgePending: {
        user: LUser;
        source: LClass;
    };
    nodeid: Pointer<DGraphElement>;
    dataid?: Pointer<DModelElement>;
    viewid: Pointer<DViewElement>;
    viewsid: Pointer<DViewElement>[];
    parentviewid?: Pointer<DViewElement>;
}
export declare class GraphElementDispatchProps {
}
export declare class BasicReactOwnProps {
    children?: ReactNode;
    style?: CSSProperties;
    class?: string | string[];
    className?: string | string[];
    key?: string;
}
export declare class GraphElementOwnProps extends BasicReactOwnProps {
    data?: Pointer<DModelElement, 0, 1, LModelElement> | LModelElement;
    view?: Pointer<DViewElement, 1, 1, LViewElement> | LViewElement;
    views?: LViewElement[] | Pointer<DViewElement>[];
    initialSize?: InitialVertexSize;
    parentnodeid?: Pointer<DGraphElement, 1, 1, LGraphElement>;
    nodeid?: Pointer<DGraphElement, 1, 1, LGraphElement>;
    graphid?: Pointer<DGraph, 1, 1, LGraph>;
    parentViewId?: Pointer<DViewElement, 1, 1, LViewElement>;
    htmlindex?: number;
    childStyle?: CSSProperties;
}
export declare class EdgeOwnProps extends GraphElementOwnProps {
    onclick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onmousedown?: (e: React.MouseEvent<HTMLDivElement>) => void;
    isgraph?: boolean;
    isvertex?: boolean;
    start: LGraphElement["id"];
    end: LGraphElement["id"];
    label?: DEdge["longestLabel"];
    labels?: DEdge["labels"];
}
export declare class EdgeStateProps extends GraphElementReduxStateProps {
    node: LEdge;
    edge: LEdge;
    isEdgePending: {
        user: LUser;
        source: LClass;
    };
    viewpoint: LViewPoint;
    start: LGraphElement;
    end: LGraphElement;
}
export declare class DefaultUsageDeclarations {
    view?: GraphElementReduxStateProps["view"];
    node?: GraphElementReduxStateProps["node"];
    data: GraphElementOwnProps["data"];
    [key: string]: any;
    constructor(ret: GraphElementReduxStateProps, ownProps: GraphElementOwnProps);
}
export declare class EdgeDefaultUsageDeclarations extends DefaultUsageDeclarations {
    start: EdgeOwnProps["start"];
    end: EdgeOwnProps["end"];
}
export declare class VertexOwnProps extends GraphElementOwnProps {
    isedgepoint?: boolean;
    isgraph?: boolean;
    isvertex?: boolean;
    isvoid?: boolean;
    decorated?: boolean;
    sides?: number;
    innerRadius?: number;
    ratio?: number;
    rotate?: number;
}
export declare class VertexStateProps extends GraphElementReduxStateProps {
    node: LVoidVertex;
    isEdgePending: {
        user: LUser;
        source: LClass;
    };
    viewpoint: LViewPoint;
}
export declare let contextFixedKeys: Dictionary<string, boolean>;
