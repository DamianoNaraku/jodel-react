import React, {Dispatch, ReactElement} from "react";
import {connect} from "react-redux";
import Xarrow from "react-xarrows";
import {DState} from "../../joiner";


function EdgeComponent(props: AllProps) {
    const source = props.source;
    const target = props.target;
    const label = (props.label) ? props.label : '';

    return(<Xarrow start={source} end={target} labels={label} />);
}
interface OwnProps {
    source: string,
    target: string,
    label?: string
}
interface StateProps { }
interface DispatchProps { }
type AllProps = OwnProps & StateProps & DispatchProps;


function mapStateToProps(state: DState, ownProps: OwnProps): StateProps {
    const ret: StateProps = {} as any;
    return ret;
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    const ret: DispatchProps = {};
    return ret;
}


export const EdgeConnected = connect<StateProps, DispatchProps, OwnProps, DState>(
    mapStateToProps,
    mapDispatchToProps
)(EdgeComponent);

export const Edge = (props: OwnProps, children: (string | React.Component)[] = []): ReactElement => {
    return <EdgeConnected {...{...props, children}} />;
}
export default Edge;
