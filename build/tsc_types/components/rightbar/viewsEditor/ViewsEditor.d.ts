import React, { ReactElement } from "react";
import { LViewElement } from "../../../joiner";
declare function ViewsEditorComponent(props: AllProps): JSX.Element;
interface OwnProps {
}
interface StateProps {
    stackViews: LViewElement[];
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const ViewsEditorConnected: import("react-redux").ConnectedComponent<typeof ViewsEditorComponent, import("react-redux").Omit<OwnProps & StateProps & DispatchProps, "stackViews"> & OwnProps>;
export declare const ViewsEditor: (props: OwnProps, children?: (string | React.Component)[]) => ReactElement;
export default ViewsEditor;
