import {DState} from "../../redux/store";
import React, {Dispatch, ReactElement, useEffect} from "react";
import {connect} from "react-redux";
import {DGraphElement, LGraphElement} from "../../model/dataStructure";
import {GObject, Pointer, SetRootFieldAction} from "../../joiner";
import Xarrow from "react-xarrows";
import {useStateIfMounted} from "use-state-if-mounted";
import {useEffectOnce} from "usehooks-ts";
import crypto from "crypto";
import $ from "jquery";

function ExtendEdgeComponent(props: AllProps) {
    const source = props.source;
    const target = props.target;
    let options = props.options;
    options = {
        ...options,
        showHead: true,
        headSize: 15,
        headColor: 'white',
        headShape: {svgElem:<svg><path strokeWidth={0.1} stroke={options.color} d={'M 0 0 L 1 0.5 L 0 1 L 0 0 z'} /></svg>}
    }

    const [middleAnchor, setMiddleAnchor] = useStateIfMounted('');
    useEffectOnce(() => {
        setMiddleAnchor(crypto.randomBytes(20).toString('hex'));
    });
    useEffect(() => {
        const middleware: GObject = $('[id="' + middleAnchor + '"]');
        if(middleware) {
            middleware.draggable({
                cursor: "grabbing",
                containment: "window",
                drag: function (event: GObject, obj: GObject) {
                    SetRootFieldAction.new("dragging", {})
                }
            });
        }
    });

    if(props.display) {
        return(<>
            <div style={{borderColor: options.color}} id={middleAnchor} className={'middle-anchor'}></div>
            <Xarrow start={source.id} end={middleAnchor} {...options} showHead={false} />
            <Xarrow start={middleAnchor} end={target.id} {...options} />
        </>);
    } else { return(<></>); }

}
interface OwnProps {
    sourceID: Pointer<DGraphElement, 1, 1, LGraphElement>;
    targetID: Pointer<DGraphElement, 1, 1, LGraphElement>;
}
interface StateProps { source: LGraphElement, target: LGraphElement, options: GObject, display: boolean }
interface DispatchProps {}
type AllProps = OwnProps & StateProps & DispatchProps;


function mapStateToProps(state: DState, ownProps: OwnProps): StateProps {
    const ret: StateProps = { } as any;
    /*
    ret.source = LGraphElement.fromPointer(ownProps.sourceID);
    ret.target = LGraphElement.fromPointer(ownProps.targetID);
    ret.options = state._edgeSettings;
    ret.display = state._edgesDisplayed.extend;*/
    return ret;
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    const ret: DispatchProps = {};
    return ret;
}


export const ExtendEdgeConnected = connect<StateProps, DispatchProps, OwnProps, DState>(
    mapStateToProps,
    mapDispatchToProps
)(ExtendEdgeComponent);

export const ExtendEdge = (props: OwnProps, children: (string | React.Component)[] = []): ReactElement => {
    return <ExtendEdgeConnected {...{...props, children}} />;
}
export default ExtendEdge;
