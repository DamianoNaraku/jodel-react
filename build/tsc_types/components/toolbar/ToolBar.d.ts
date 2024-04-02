import React, { ReactElement } from "react";
import "./style.scss";
import { DModel, DModelElement, LGraphElement, LModel, LModelElement, Pointer } from "../../joiner";
interface ThisState {
}
declare function ToolBarComponent(props: AllProps, state: ThisState): JSX.Element;
interface OwnProps {
    model: Pointer<DModel, 1, 1, LModel>;
    isMetamodel: boolean;
    metamodelId?: Pointer<DModelElement, 1, 1, LModelElement>;
}
interface StateProps {
    node: LGraphElement | null;
    metamodel?: LModel;
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const ToolBarConnected: import("react-redux").ConnectedComponent<typeof ToolBarComponent, import("react-redux").Omit<OwnProps & StateProps & DispatchProps, "node" | "metamodel"> & OwnProps>;
export declare const ToolBar: (props: OwnProps, children?: (string | React.Component)[]) => ReactElement;
export default ToolBar;
