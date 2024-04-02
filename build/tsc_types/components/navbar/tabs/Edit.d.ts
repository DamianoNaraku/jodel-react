import React, { ReactElement } from 'react';
import { GObject } from "../../../joiner";
declare function EditComponent(props: AllProps): JSX.Element;
interface OwnProps {
}
interface StateProps {
    undo: GObject<'delta'>[];
    redo: GObject<'delta'>[];
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const EditConnected: import("react-redux").ConnectedComponent<typeof EditComponent, import("react-redux").Omit<OwnProps & StateProps & DispatchProps, "undo" | "redo"> & OwnProps>;
export declare const Edit: (props: OwnProps, children?: (string | React.Component)[]) => ReactElement;
export default Edit;
