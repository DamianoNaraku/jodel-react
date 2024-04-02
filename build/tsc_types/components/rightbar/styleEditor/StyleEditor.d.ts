import React, { ReactElement } from "react";
import { LModelElement, LViewElement, LGraphElement } from "../../../joiner";
declare function NodeEditorComponent(props: AllProps): JSX.Element;
interface OwnProps {
}
interface StateProps {
    selected?: {
        node: LGraphElement;
        view: LViewElement;
        modelElement?: LModelElement;
    };
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const NodeEditorConnected: import("react-redux").ConnectedComponent<typeof NodeEditorComponent, import("react-redux").Omit<OwnProps & StateProps & DispatchProps, "selected"> & OwnProps>;
export declare const NodeEditor: (props: OwnProps, children?: (string | React.Component)[]) => ReactElement;
export default NodeEditor;
