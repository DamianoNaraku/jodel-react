import React, { PureComponent, ReactElement, ReactNode } from "react";
import { LGraphElement, LModelElement, LViewElement } from "../../../joiner";
interface ThisState {
}
declare class StructureEditorComponent extends PureComponent<AllProps, ThisState> {
    constructor(props: AllProps, context: any);
    render(): ReactNode;
}
interface OwnProps {
}
interface StateProps {
    node?: LGraphElement;
    view?: LViewElement;
    data?: LModelElement;
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const StructureEditorConnected: import("react-redux").ConnectedComponent<typeof StructureEditorComponent, import("react-redux").Omit<React.ClassAttributes<StructureEditorComponent> & OwnProps & StateProps & DispatchProps, "view" | "node" | "data"> & OwnProps>;
export declare const StructureEditor: (props: OwnProps, children?: (string | React.Component)[]) => ReactElement;
export default StructureEditor;
