import { ReactElement } from 'react';
declare function ShareComponent(props: AllProps): JSX.Element;
interface OwnProps {
}
interface StateProps {
    debug: boolean;
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const ShareConnected: import("react-redux").ConnectedComponent<typeof ShareComponent, import("react-redux").Omit<OwnProps & StateProps & DispatchProps, "debug"> & OwnProps>;
export declare const Share: (props: OwnProps, children?: (string | React.Component)[]) => ReactElement;
export default Share;
