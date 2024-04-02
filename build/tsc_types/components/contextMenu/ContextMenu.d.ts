import React, { ReactElement } from 'react';
import './style.scss';
import { LGraphElement, LUser } from '../../joiner';
declare function ContextMenuComponent(props: AllProps): JSX.Element;
interface OwnProps {
}
interface StateProps {
    user: LUser;
    display: boolean;
    position: {
        x: number;
        y: number;
    };
    node: LGraphElement | null;
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const ContextMenuConnected: import("react-redux").ConnectedComponent<typeof ContextMenuComponent, import("react-redux").Omit<OwnProps & StateProps & DispatchProps, "node" | "display" | "position" | "user"> & OwnProps>;
export declare const ContextMenu: (props: OwnProps, childrens?: (string | React.Component)[]) => ReactElement;
export default ContextMenu;
