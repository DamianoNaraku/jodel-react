import React, { ReactElement } from "react";
import { LGraphElement } from "../../../joiner";
declare function TreeEditorComponent(props: AllProps): JSX.Element;
interface OwnProps {
}
interface StateProps {
    node: LGraphElement | null;
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const TreeEditorConnected: import("react-redux").ConnectedComponent<typeof TreeEditorComponent, import("react-redux").Omit<OwnProps & StateProps & DispatchProps, "node"> & OwnProps>;
export declare const TreeEditor: (props: OwnProps, children?: (string | React.Component)[]) => ReactElement;
export default TreeEditor;
