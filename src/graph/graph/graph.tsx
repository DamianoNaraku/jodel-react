import React, {PureComponent, ReactElement} from "react";
import {connect} from "react-redux";

import {
    IStore,
    windoww,
    GraphElementStatee, GraphElementDispatchProps, GraphElementReduxStateProps, GraphElementOwnProps,
    GraphElementRaw, RuntimeAccessibleClass
} from "../../joiner";
// import {GraphElementStatee, GraphElementDispatchProps, GraphElementReduxStateProps, GraphElementOwnProps} from  "../graphElement/sharedTypes/sharedTypes";

console.info('GraphComponent loading');

class GraphStatee extends GraphElementStatee {
    /*graphid!: string
    constructor(preRenderFunc: string | undefined, evalContext: GObject, templatefunc: () => React.ReactNode, id: string) {
        super(preRenderFunc, evalContext, templatefunc);
        this.graphid = id;
    }*/
}

const superclass = RuntimeAccessibleClass.classes.GraphElementRaw as any as typeof GraphElementRaw;
export class GraphRaw<AllProps extends AllPropss, GraphState extends GraphStatee>
    // extends GraphElementRaw<AllProps, GraphState>
    // @ts-ignore
    extends superclass<AllProps, GraphState>{
    /*static addLGraphElementStuff(state: IStore, ownProps: GraphOwnProps, stateProps: GraphReduxStateProps, dataClass: typeof DGraph = DGraph): void {
        let dgraph: DGraph = DGraph.create(ownProps.data as string);
        new CreateElementAction(dgraph);
        stateProps.nodeid = dgraph.id;
        stateProps.graphid = dgraph.id;
        super.addLGraphElementStuff(state, ownProps, stateProps, dataClass, dgraph);

    }*/

}
// todo: devo permettere agli elementi di: multi-selezionare, resize, drag, rotate, drop (outside-inside container)
// private
class GraphOwnProps extends GraphElementOwnProps {
    onclick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    // propsRequestedFromHtmlAsAttributes: string;
}
// private
class GraphReduxStateProps extends GraphElementReduxStateProps{
    /*nodeid!: string;
    graphid!: string;*/
    // propsFromReduxStateOrOtherKindOfStateManagement: boolean; // flux or custom things too, unrelated to this.state of react.
}

// private
class GraphDispatchProps extends GraphElementDispatchProps {
    // propsFromReduxActions: typeof funzioneTriggeraAzioneDaImportare;
}


// private
type AllPropss = GraphOwnProps & GraphReduxStateProps & GraphDispatchProps;


const GraphConnected = connect<GraphReduxStateProps, GraphDispatchProps, GraphOwnProps, IStore>(
    GraphRaw.mapStateToProps,
    GraphRaw.mapDispatchToProps
)(GraphRaw as any);

// nb: necessario per usarlo a runtime
export const Graph = (props: GraphOwnProps, childrens: (string | React.Component)[] = []): ReactElement => {
    return <GraphConnected {...{...props, childrens}} />; }


if (!windoww.mycomponents) windoww.mycomponents = {};
windoww.mycomponents.Graph = GraphRaw;
console.info('GraphComponent loaded');
