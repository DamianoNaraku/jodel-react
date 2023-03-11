import React, {Dispatch, ReactElement, ReactNode} from "react";
import {connect} from "react-redux";
import {
    DGraph,
    DGraphElement,
    DGraphVertex,
    DVoidVertex,
    GraphElementComponent,
    GraphElementDispatchProps,
    GraphElementOwnProps,
    GraphElementReduxStateProps,
    GraphElementStatee,
    IStore,
    LClass,
    LModelElement,
    LPointerTargetable,
    LUser,
    LVoidVertex,
    RuntimeAccessibleClass,
    U,
} from "../../joiner";
import RootVertex from "./RootVertex";
import {LViewPoint} from "../../view/viewPoint/viewpoint";

const superclassGraphElementComponent: typeof GraphElementComponent = RuntimeAccessibleClass.classes.GraphElementComponent as any as typeof GraphElementComponent;
class ThisStatee extends GraphElementStatee {}

export class VertexComponent<AllProps extends AllPropss = AllPropss, ThisState extends ThisStatee = ThisStatee>
    extends superclassGraphElementComponent<AllProps, ThisState> {

    /*
    shouldComponentUpdate(newProps: Readonly<AllProps>, newState: Readonly<ThisState>, newContext: any): boolean {
        const oldProps = this.props;
        const newData = newProps.data; const oldData = oldProps.data;
        const newNode = newProps.node; const oldNode = oldProps.node;
        const newViewpoint = newProps.viewpoint; const oldViewpoint = oldProps.viewpoint;
        const newEdgePending = newProps.isEdgePending; const oldEdgePending = oldProps.isEdgePending;

        if(newData.__raw !== oldData.__raw) return true;
        if(newNode?.__raw !== oldNode?.__raw) return true;
        if(newViewpoint.__raw !== oldViewpoint.__raw) return true;
        if(newEdgePending !== oldEdgePending) return true;
        return false;
    }
     */

    constructor(props: AllProps, context: any) {
        super(props, context);
    }
    render(): ReactNode {
        return(<RootVertex props={this.props} render={super.render()} />);
    }
}

class OwnProps extends GraphElementOwnProps {
    onclick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onmousedown?: (e: React.MouseEvent<HTMLDivElement>) => void;
    isGraph?: boolean = false;
    isVertex?: boolean = true;
}

class StateProps extends GraphElementReduxStateProps {
    node!: LVoidVertex;
    lastSelected!: LModelElement | null;
    isEdgePending!: { user: LUser, source: LClass };
    viewpoint!: LViewPoint
}

class DispatchProps extends GraphElementDispatchProps {
}

export type AllPropss = OwnProps & StateProps & DispatchProps;

function mapStateToProps(state: IStore, ownProps: OwnProps): StateProps {
    let DGraphElementClass: typeof DGraphElement;
    if (ownProps.isVertex && ownProps.isGraph) DGraphElementClass = DGraphVertex;
    else if (ownProps.isVertex && !ownProps.isGraph) DGraphElementClass = DVoidVertex;
    else if (!ownProps.isVertex && ownProps.isGraph) DGraphElementClass = DGraph;
    else DGraphElementClass = DGraphElement;
    const superret: StateProps = GraphElementComponent.mapStateToProps(state, ownProps, DGraphElementClass) as StateProps;
    //superret.lastSelected = state._lastSelected?.modelElement;
    superret.lastSelected = state._lastSelected ? LPointerTargetable.from(state._lastSelected.modelElement) : null;
    superret.isEdgePending = {
        user: LPointerTargetable.from(state.isEdgePending.user),
        source: LPointerTargetable.from(state.isEdgePending.source)
    };
    superret.viewpoint = LViewPoint.fromPointer(state.viewpoint);
    const ret: StateProps = new StateProps();
    U.objectMergeInPlace(superret, ret);
    U.removeEmptyObjectKeys(superret);
    return superret;
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    const superret: GraphElementDispatchProps = GraphElementComponent.mapDispatchToProps(dispatch);
    const ret: GraphElementDispatchProps = new GraphElementDispatchProps();
    U.objectMergeInPlace(superret, ret);
    U.removeEmptyObjectKeys(superret);
    return superret;
}


export const VertexConnected = connect<StateProps, DispatchProps, OwnProps, IStore>(
    mapStateToProps,
    mapDispatchToProps
)(VertexComponent as any);

export const Vertex = (props: OwnProps, childrens: (string | React.Component)[] = []): ReactElement => {
    return <VertexConnected {...{...props, childrens}} isGraph={false} isVertex={true} />;
}

export const Graph = (props: OwnProps, childrens: (string | React.Component)[] = []): ReactElement => {
    return <VertexConnected {...{...props, childrens}} isGraph={true} isVertex={false} />;
}

export const GraphVertex = (props: OwnProps, childrens: (string | React.Component)[] = []): ReactElement => {
    return <VertexConnected {...{...props, childrens}} isGraph={true} isVertex={true} />;
}

export const Field = (props: OwnProps, childrens: (string | React.Component)[] = []): ReactElement => {
    return <VertexConnected {...{...props, childrens}} isGraph={false} isVertex={false} />;
}

