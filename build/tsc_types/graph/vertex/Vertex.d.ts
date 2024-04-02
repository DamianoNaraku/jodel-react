import { ReactElement, ReactNode } from 'react';
import { DUser, GObject, GraphElementComponent, GraphElementDispatchProps, GraphElementStatee, GraphPoint, GraphSize, Pointer } from '../../joiner';
import 'jqueryui';
import 'jqueryui/jquery-ui.css';
import { VertexOwnProps, VertexStateProps } from '../graphElement/sharedTypes/sharedTypes';
declare const superclassGraphElementComponent: typeof GraphElementComponent;
declare class ThisStatee extends GraphElementStatee {
    forceupdate?: number;
}
export declare class VertexComponent<AllProps extends AllPropss = AllPropss, ThisState extends ThisStatee = ThisStatee> extends superclassGraphElementComponent<AllProps, ThisState> {
    static cname: string;
    draggableOptions: GObject | undefined;
    resizableOptions: GObject | undefined;
    rotableOptions: GObject | undefined;
    constructor(props: AllProps, context: any);
    setVertexProperties(): void;
    getSize(): Readonly<GraphSize>;
    setSize(x_or_size_or_point: Partial<GraphPoint>): void;
    setSize(x_or_size_or_point: Partial<GraphSize>): void;
    render(): ReactNode;
    select(forUser?: Pointer<DUser>): void;
}
declare class DispatchProps extends GraphElementDispatchProps {
}
export declare type AllPropss = VertexOwnProps & VertexStateProps & DispatchProps;
export declare const VertexConnected: import("react-redux").ConnectedComponent<any, import("react-redux").Omit<unknown, never> & VertexOwnProps>;
export declare const Vertex: {
    (props: VertexOwnProps, children?: ReactNode | undefined): ReactElement;
    cname: string;
};
export declare const VoidVertex: {
    (props: VertexOwnProps, children?: ReactNode | undefined): ReactElement;
    cname: string;
};
export declare const EdgePoint: {
    (props: VertexOwnProps, children?: ReactNode | undefined): ReactElement;
    cname: string;
};
export declare const Graph: {
    (props: VertexOwnProps, children?: ReactNode | undefined): ReactElement;
    cname: string;
};
export declare const GraphVertex: {
    (props: VertexOwnProps, children?: ReactNode | undefined): ReactElement;
    cname: string;
};
export declare const Field: {
    (props: VertexOwnProps, children?: ReactNode | undefined): ReactElement;
    cname: string;
};
export {};
