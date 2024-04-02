import React, { ReactElement } from 'react';
import { LUser } from '../joiner';
import "./dashboard.scss";
declare function DashboardComponent(props: AllProps): JSX.Element;
interface OwnProps {
}
interface StateProps {
    user: LUser;
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const DashboardConnected: import("react-redux").ConnectedComponent<typeof DashboardComponent, import("react-redux").Omit<OwnProps & StateProps & DispatchProps, "user"> & OwnProps>;
declare const Dashboard: (props: OwnProps, children?: (string | React.Component)[]) => ReactElement;
export default Dashboard;
