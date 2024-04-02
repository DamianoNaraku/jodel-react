import React, { ReactElement } from 'react';
import { DViewElement, LViewElement, Pointer } from '../../../joiner';
declare function OclEditorComponent(props: AllProps): JSX.Element;
declare namespace OclEditorComponent {
    var cname: string;
}
interface OwnProps {
    readonly?: boolean;
    viewid: Pointer<DViewElement, 1, 1, LViewElement>;
}
interface StateProps {
    view: LViewElement;
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const OclEditorConnected: import("react-redux").ConnectedComponent<typeof OclEditorComponent, import("react-redux").Omit<OwnProps & StateProps & DispatchProps, "view"> & OwnProps>;
export declare const OclEditor: {
    (props: OwnProps, children?: (string | React.Component)[]): ReactElement;
    cname: string;
};
export default OclEditor;
