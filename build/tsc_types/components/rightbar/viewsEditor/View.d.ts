import React, { ReactElement } from 'react';
import type { LViewElement } from '../../../joiner';
import { LProject, LViewPoint } from "../../../joiner";
declare function ViewDataComponent(props: AllProps): JSX.Element;
interface OwnProps {
    view: LViewElement;
    setSelectedView: React.Dispatch<React.SetStateAction<LViewElement | undefined>>;
}
interface StateProps {
    project: LProject;
    viewpoints: LViewPoint[];
    debug: boolean;
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const ViewDataConnected: import("react-redux").ConnectedComponent<typeof ViewDataComponent, import("react-redux").Omit<OwnProps & StateProps & DispatchProps, "debug" | "viewpoints" | "project"> & OwnProps>;
export declare const ViewData: (props: OwnProps, children?: (string | React.Component)[]) => ReactElement;
export default ViewData;
