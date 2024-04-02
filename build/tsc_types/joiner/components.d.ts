/// <reference types="react" />
import type { Dictionary } from "./types";
import { GraphElement } from "../graph/graphElement/graphElement";
import { Edge } from "../graph/damedges/damedge";
export { GraphElement, GraphElementComponent } from "../graph/graphElement/graphElement";
export { Graph, Vertex, VoidVertex, GraphVertex, Field, EdgePoint, VertexComponent } from "../graph/vertex/Vertex";
export { Polygon, Circle, Cross, Decagon, Asterisk, Ellipse, Enneagon, Hexagon, Nonagon, Octagon, Heptagon, Pentagon, Rectangle, Septagon, Square, Star, SimpleStar, DecoratedStar, Trapezoid, Triangle } from "../graph/vertex/Shapes";
export { DefaultNode, DefaultNodeComponent } from "../graph/defaultNode/DefaultNode";
export { GraphsContainer, GraphsContainerComponent } from "../graph/graph/graphContainer";
export { Edge, EdgeComponent, } from "../graph/damedges/damedge";
export { GenericInput } from "../components/forEndUser/GenericInput";
export { OclEditor } from "../components/rightbar/oclEditor/OclEditor";
export { Input } from "../components/forEndUser/Input";
export { TextArea } from "../components/forEndUser/TextArea";
export { Select } from "../components/forEndUser/Select";
export { DataOutputComponent } from "../components/logger/DataOutput";
export { LoggerComponent } from "../components/logger/loggerComponent";
export { Overlap } from "../components/forEndUser/Overlap";
declare type dict = Dictionary<string, typeof GraphElement | typeof Edge>;
export declare const Graphs: {
    Graph: {
        (props: import("../graph/graphElement/sharedTypes/sharedTypes").VertexOwnProps, children?: import("react").ReactNode): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
        cname: string;
    };
    GraphVertex: {
        (props: import("../graph/graphElement/sharedTypes/sharedTypes").VertexOwnProps, children?: import("react").ReactNode): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
        cname: string;
    };
};
export declare const Edges: {
    Edge: {
        (props: import("./index").EdgeOwnProps, children?: (string | import("react").Component<{}, {}, any>)[]): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
        cname: string;
    };
    EdgePoint: {
        (props: import("../graph/graphElement/sharedTypes/sharedTypes").VertexOwnProps, children?: import("react").ReactNode): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
        cname: string;
    };
};
export declare const Fields: {
    Field: {
        (props: import("../graph/graphElement/sharedTypes/sharedTypes").VertexOwnProps, children?: import("react").ReactNode): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
        cname: string;
    };
};
export declare const Vertexes: {
    Vertex: {
        (props: import("../graph/graphElement/sharedTypes/sharedTypes").VertexOwnProps, children?: import("react").ReactNode): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
        cname: string;
    };
    Circle: {
        (props: import("../graph/graphElement/sharedTypes/sharedTypes").VertexOwnProps, children?: import("react").ReactNode): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
        cname: string;
    };
    Polygon: {
        (props: import("../graph/graphElement/sharedTypes/sharedTypes").VertexOwnProps, children?: import("react").ReactNode): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
        cname: string;
    };
    Cross: {
        (props: import("../graph/graphElement/sharedTypes/sharedTypes").VertexOwnProps, children?: import("react").ReactNode): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
        cname: string;
    };
    Asterisk: {
        (props: import("../graph/graphElement/sharedTypes/sharedTypes").VertexOwnProps, children?: import("react").ReactNode): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
        cname: string;
    };
    SimpleStar: {
        (props: import("../graph/graphElement/sharedTypes/sharedTypes").VertexOwnProps, children?: import("react").ReactNode): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
        cname: string;
    };
    DecoratedStar: {
        (props: import("../graph/graphElement/sharedTypes/sharedTypes").VertexOwnProps, children?: import("react").ReactNode): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
        cname: string;
    };
    Triangle: {
        (props: import("../graph/graphElement/sharedTypes/sharedTypes").VertexOwnProps, children?: import("react").ReactNode): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
        cname: string;
    };
    Square: {
        (props: import("../graph/graphElement/sharedTypes/sharedTypes").VertexOwnProps, children?: import("react").ReactNode): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
        cname: string;
    };
    Pentagon: {
        (props: import("../graph/graphElement/sharedTypes/sharedTypes").VertexOwnProps, children?: import("react").ReactNode): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
        cname: string;
    };
    Hexagon: {
        (props: import("../graph/graphElement/sharedTypes/sharedTypes").VertexOwnProps, children?: import("react").ReactNode): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
        cname: string;
    };
    Heptagon: {
        (props: import("../graph/graphElement/sharedTypes/sharedTypes").VertexOwnProps, children?: import("react").ReactNode): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
        cname: string;
    };
    Octagon: {
        (props: import("../graph/graphElement/sharedTypes/sharedTypes").VertexOwnProps, children?: import("react").ReactNode): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
        cname: string;
    };
    Enneagon: {
        (props: import("../graph/graphElement/sharedTypes/sharedTypes").VertexOwnProps, children?: import("react").ReactNode): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
        cname: string;
    };
    Decagon: {
        (props: import("../graph/graphElement/sharedTypes/sharedTypes").VertexOwnProps, children?: import("react").ReactNode): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
        cname: string;
    };
    Ellipse: {
        (props: import("../graph/graphElement/sharedTypes/sharedTypes").VertexOwnProps, children?: import("react").ReactNode): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
        cname: string;
    };
    Rectangle: {
        (props: import("../graph/graphElement/sharedTypes/sharedTypes").VertexOwnProps, children?: import("react").ReactNode): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
        cname: string;
    };
    Trapezoid: {
        (props0: import("../graph/graphElement/sharedTypes/sharedTypes").VertexOwnProps, children?: import("react").ReactNode): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
        cname: string;
    };
};
export declare const GraphElements: dict;
