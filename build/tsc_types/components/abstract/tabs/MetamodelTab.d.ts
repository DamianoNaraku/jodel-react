import React, { ReactElement } from "react";
import type { DModel, Pointer } from "../../../joiner";
import { LGraph, LModel, DUser, DClass } from "../../../joiner";
declare function MetamodelTabComponent(props: AllProps): JSX.Element;
interface OwnProps {
    modelid: Pointer<DModel, 1, 1, LModel>;
}
interface StateProps {
    model: LModel;
    graph: LGraph;
    isEdgePending: {
        user: Pointer<DUser>;
        source: Pointer<DClass>;
    };
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const MetamodelTabConnected: import("react-redux").ConnectedComponent<typeof MetamodelTabComponent, import("react-redux").Omit<OwnProps & StateProps & DispatchProps, "isEdgePending" | "model" | "graph"> & OwnProps>;
export declare const MetamodelTab: (props: OwnProps, children?: (string | React.Component)[]) => ReactElement;
export default MetamodelTab;
