import React, { ReactElement } from "react";
declare function EdgeEditorComponent(props: AllProps): JSX.Element;
declare namespace EdgeEditorComponent {
    var cname: string;
}
interface OwnProps {
}
interface StateProps {
    strokeWidth: number;
    zIndex: number;
    color: string;
    path: string;
    extend: boolean;
    referenceM2: boolean;
    referenceM1: boolean;
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const EdgeEditorConnected: import("react-redux").ConnectedComponent<typeof EdgeEditorComponent, import("react-redux").Omit<OwnProps & StateProps & DispatchProps, "color" | "path" | "zIndex" | "strokeWidth" | "extend" | "referenceM2" | "referenceM1"> & OwnProps>;
export declare const EdgeEditor: {
    (props: OwnProps, children?: (string | React.Component)[]): ReactElement;
    cname: string;
};
export default EdgeEditor;
