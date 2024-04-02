import React, { ReactElement } from 'react';
import { LUser } from "../../../joiner";
declare function FileComponent(props: AllProps): JSX.Element;
interface OwnProps {
}
interface StateProps {
    user: LUser;
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const FileConnected: import("react-redux").ConnectedComponent<typeof FileComponent, import("react-redux").Omit<OwnProps & StateProps & DispatchProps, "user"> & OwnProps>;
declare const File: (props: OwnProps, children?: (string | React.Component)[]) => ReactElement;
export default File;
