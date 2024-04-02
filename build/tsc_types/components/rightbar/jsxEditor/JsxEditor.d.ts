import React, { ReactElement } from "react";
import { DViewElement, LViewElement, Pointer } from "../../../joiner";
declare function JsxEditorComponent(props: AllProps): JSX.Element;
declare namespace JsxEditorComponent {
    var cname: string;
}
interface OwnProps {
    viewid: Pointer<DViewElement, 1, 1, LViewElement>;
    readonly?: boolean;
}
interface StateProps {
    view: LViewElement;
    debugmode: boolean;
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const JsxEditorConnected: import("react-redux").ConnectedComponent<typeof JsxEditorComponent, import("react-redux").Omit<OwnProps & StateProps & DispatchProps, "view" | "debugmode"> & OwnProps>;
export declare const JsxEditor: {
    (props: OwnProps, children?: (string | React.Component)[]): ReactElement;
    cname: string;
};
export default JsxEditor;
