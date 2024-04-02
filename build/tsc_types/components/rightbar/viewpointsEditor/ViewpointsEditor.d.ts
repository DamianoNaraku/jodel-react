import React, { ReactElement } from 'react';
import { LProject, LViewPoint } from '../../../joiner';
declare function ViewpointsEditorComponent(props: AllProps): JSX.Element;
interface OwnProps {
}
interface StateProps {
    project: LProject;
    viewpoints: LViewPoint[];
    active: LViewPoint;
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const ViewpointsEditorConnected: import("react-redux").ConnectedComponent<typeof ViewpointsEditorComponent, import("react-redux").Omit<OwnProps & StateProps & DispatchProps, "viewpoints" | "project" | "active"> & OwnProps>;
export declare const ViewpointsEditor: (props: OwnProps, children?: (string | React.Component)[]) => ReactElement;
export default ViewpointsEditor;
