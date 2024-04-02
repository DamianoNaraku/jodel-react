import React, { ReactElement } from 'react';
declare function ExamplesComponent(props: AllProps): JSX.Element;
interface OwnProps {
}
interface StateProps {
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const ExamplesConnected: import("react-redux").ConnectedComponent<typeof ExamplesComponent, import("react-redux").Omit<OwnProps & StateProps & DispatchProps, never> & OwnProps>;
export declare const Examples: (props: OwnProps, children?: (string | React.Component)[]) => ReactElement;
export default Examples;
