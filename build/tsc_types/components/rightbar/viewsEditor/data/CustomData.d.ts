import React, { ReactElement } from 'react';
import { DViewElement, LViewElement, Pointer } from '../../../../joiner';
declare function ViewEventsComponent(props: AllProps): JSX.Element;
interface OwnProps {
    viewID: Pointer<DViewElement, 1, 1, LViewElement>;
    readonly: boolean;
}
interface StateProps {
    view: LViewElement;
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const ViewEventsConnected: import("react-redux").ConnectedComponent<typeof ViewEventsComponent, import("react-redux").Omit<OwnProps & StateProps & DispatchProps, "view"> & OwnProps>;
export declare const ViewEvents: (props: OwnProps, children?: (string | React.Component)[]) => ReactElement;
export default ViewEvents;
