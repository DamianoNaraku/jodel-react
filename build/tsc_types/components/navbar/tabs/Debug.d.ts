import React, { ReactElement } from 'react';
import { LUser } from '../../../joiner';
declare function DebugComponent(props: AllProps): JSX.Element;
interface OwnProps {
}
interface StateProps {
    user: LUser;
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const DebugConnected: import("react-redux").ConnectedComponent<typeof DebugComponent, import("react-redux").Omit<OwnProps & StateProps & DispatchProps, "user"> & OwnProps>;
export declare const Debug: (props: OwnProps, children?: (string | React.Component)[]) => ReactElement;
export default Debug;
