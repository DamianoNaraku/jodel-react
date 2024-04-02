import React, { ReactElement } from "react";
import type { DModel, Pointer } from "../../../joiner";
import { DModelElement, LGraph, LModel, LModelElement } from "../../../joiner";
declare function ModelTabComponent(props: AllProps): JSX.Element;
interface OwnProps {
    modelid: Pointer<DModel, 1, 1, LModel>;
    metamodelid?: Pointer<DModelElement, 1, 1, LModelElement>;
}
interface StateProps {
    model: LModel;
    graph?: LGraph;
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const ModelTabConnected: import("react-redux").ConnectedComponent<typeof ModelTabComponent, import("react-redux").Omit<OwnProps & StateProps & DispatchProps, "model" | "graph"> & OwnProps>;
export declare const ModelTab: (props: OwnProps, children?: (string | React.Component)[]) => ReactElement;
export default ModelTab;
