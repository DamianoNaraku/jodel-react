import './style.scss';
import React, { ReactElement } from 'react';
import { LUser } from '../../joiner';
declare function NavbarComponent(props: AllProps): JSX.Element;
interface OwnProps {
}
interface StateProps {
    debug: boolean;
    user: LUser;
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const NavbarConnected: import("react-redux").ConnectedComponent<typeof NavbarComponent, import("react-redux").Omit<OwnProps & StateProps & DispatchProps, "debug" | "user"> & OwnProps>;
export declare const Navbar: (props: OwnProps, children?: (string | React.Component)[]) => ReactElement;
export default Navbar;
