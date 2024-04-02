import React, { ReactElement } from 'react';
declare function NameComponent(props: AllProps): JSX.Element;
interface OwnProps {
}
interface StateProps {
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const NameConnected: import("react-redux").ConnectedComponent<typeof NameComponent, import("react-redux").Omit<OwnProps & StateProps & DispatchProps, never> & OwnProps>;
declare const Name: (props: OwnProps, children?: (string | React.Component)[]) => ReactElement;
export default Name;
