import React, { ReactElement } from "react";
declare function PersistanceTabComponent(props: AllProps): JSX.Element;
interface OwnProps {
}
interface StateProps {
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const PersistanceTabConnected: import("react-redux").ConnectedComponent<typeof PersistanceTabComponent, import("react-redux").Omit<OwnProps & StateProps & DispatchProps, never> & OwnProps>;
export declare const PersistanceTab: (props: OwnProps, childrens?: (string | React.Component)[]) => ReactElement;
export default PersistanceTab;
