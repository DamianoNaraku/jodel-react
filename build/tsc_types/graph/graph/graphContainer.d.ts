import React, { PureComponent, ReactElement, ReactNode } from "react";
import { LGraph, LModel } from "../../joiner";
interface ThisState {
}
export declare class GraphsContainerComponent extends PureComponent<AllProps, ThisState> {
    static cname: string;
    constructor(props: AllProps, context: any);
    render(): ReactNode;
}
interface OwnProps {
}
interface StateProps {
    models: LModel[];
    graphs: LGraph[];
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const GraphsContainer: {
    (props: OwnProps, children?: (string | React.Component)[]): ReactElement;
    cname: string;
};
export {};
