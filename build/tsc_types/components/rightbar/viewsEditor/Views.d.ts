import React, { ReactElement } from 'react';
import { LProject } from '../../../joiner';
import { LViewElement } from '../../../joiner';
import "./Vews.scss";
declare function ViewsDataComponent(props: AllProps): JSX.Element;
interface OwnProps {
    setSelectedView: React.Dispatch<React.SetStateAction<LViewElement | undefined>>;
}
interface StateProps {
    project: LProject;
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const ViewsDataConnected: import("react-redux").ConnectedComponent<typeof ViewsDataComponent, import("react-redux").Omit<OwnProps & StateProps & DispatchProps, "project"> & OwnProps>;
export declare const ViewsData: (props: OwnProps, children?: (string | React.Component)[]) => ReactElement;
export default ViewsData;
