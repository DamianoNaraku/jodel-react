import React, { ReactElement, ReactNode } from "react";
import { GraphElementComponent, GraphElementDispatchProps, GraphElementStatee, Overlap, EdgeOwnProps, EdgeStateProps } from "../../joiner";
declare const superclassGraphElementComponent: typeof GraphElementComponent;
declare class ThisStatee extends GraphElementStatee {
}
export declare class EdgeComponent<AllProps extends AllPropss = AllPropss, ThisState extends ThisStatee = ThisStatee> extends superclassGraphElementComponent<AllProps, ThisState> {
    static cname: string;
    constructor(props: AllProps, context: any);
    render(): ReactNode;
}
declare class DispatchProps extends GraphElementDispatchProps {
}
declare type AllPropss = Overlap<Overlap<EdgeOwnProps, EdgeStateProps>, DispatchProps>;
export declare const EdgeConnected: import("react-redux").ConnectedComponent<any, import("react-redux").Omit<unknown, never> & EdgeOwnProps>;
export declare const Edge: {
    (props: EdgeOwnProps, children?: (string | React.Component)[]): ReactElement;
    cname: string;
};
export {};
