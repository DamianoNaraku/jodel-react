import {EdgeOptions, IStore} from "../../redux/store";
import React, {Dispatch, ReactElement, useEffect, useState} from "react";
import {connect} from "react-redux";
import {
    LModelElement,
    LGraphElement,
    LReference,
    MyProxyHandler, LClass, U, GObject,
} from "../../joiner";
import EdgeTest from "./Test";
import LeaderLine from "leader-line-new";
import edges_OLD from "./edges_OLD";


interface ThisState {}


function EdgesManagerComponent(props: AllProps, state: ThisState) {
    const reduxEdges = props.edges;
    const dragging = props.dragging;
    const [edges, setEdges] = useState(new Map<number, LeaderLine>());

    useEffect(() => {
        for (let reduxEdge of reduxEdges) {
            const id = reduxEdge.id;
            const options = reduxEdge.options;
            if(!edges.has(id)){
                options.color = "green";
                const ld = new LeaderLine(options);
                edges.set(id, ld);
            }
        }
        for(let edge of edges.entries()) {
            const id = edge[0];
            const ld = edge[1];
            if(reduxEdges.filter((x) => {return x.id === id}).length > 0) {
                ld.position();
            } else {
                edges.delete(id);
                ld.remove();
            }
        }
    },[reduxEdges, dragging]);

    return <></>;
}
interface OwnProps {}
interface StateProps { edges: EdgeOptions[], dragging: number }
interface DispatchProps {}
type AllProps = OwnProps & StateProps & DispatchProps;


function mapStateToProps(state: IStore, ownProps: OwnProps): StateProps {
    const ret: StateProps = { edges: state.edges, dragging: state.dragging };
    return ret;
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    const ret: DispatchProps = {};
    return ret;
}


export const EdgesManagerConnected = connect<StateProps, DispatchProps, OwnProps, IStore>(
    mapStateToProps,
    mapDispatchToProps
)(EdgesManagerComponent);

export const EdgesManager = (props: OwnProps, childrens: (string | React.Component)[] = []): ReactElement => {
    // @ts-ignore
    return <EdgesManagerConnected {...{...props, childrens}} />;
}
export default EdgesManager;

