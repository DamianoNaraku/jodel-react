import React, { ReactElement, ReactNode } from "react";
import { GraphElementComponent, GraphElementDispatchProps, GraphElementOwnProps, GraphElementReduxStateProps, GraphElementStatee, DState } from "../../joiner";
declare const superclass: typeof GraphElementComponent;
declare class DefaultNodeStatee extends GraphElementStatee {
}
export declare class DefaultNodeComponent<AllProps extends AllPropss = AllPropss, NodeState = DefaultNodeStatee> extends superclass<AllProps, NodeState> {
    static mapStateToProps(state: DState, ownProps: GraphElementOwnProps): GraphElementReduxStateProps;
    constructor(props: AllProps, context: any);
    shouldComponentUpdate(nextProps: Readonly<AllProps>, nextState: Readonly<NodeState>, nextContext: any): boolean;
    render(): ReactNode;
}
declare class DefaultNodeOwnProps extends GraphElementOwnProps {
}
declare class DefaultNodeReduxStateProps extends GraphElementReduxStateProps {
}
declare class DefaultNodeDispatchProps extends GraphElementDispatchProps {
}
declare type AllPropss = DefaultNodeOwnProps & DefaultNodeReduxStateProps & DefaultNodeDispatchProps;
export declare const DefaultNode: {
    (props: DefaultNodeOwnProps, children?: (string | React.Component)[]): ReactElement;
    cname: string;
};
export {};
