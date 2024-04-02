import React, { ReactElement } from 'react';
import { DViewElement, LProject, LViewElement, Pointer } from '../../../../joiner';
declare function SubViewsDataComponent(props: AllProps): JSX.Element;
interface OwnProps {
    viewID: Pointer<DViewElement, 1, 1, LViewElement>;
    readonly: boolean;
    setSelectedView: React.Dispatch<React.SetStateAction<LViewElement | undefined>>;
}
interface StateProps {
    view: LViewElement;
    project: LProject;
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const SubViewsDataConnected: import("react-redux").ConnectedComponent<typeof SubViewsDataComponent, import("react-redux").Omit<OwnProps & StateProps & DispatchProps, "view" | "project"> & OwnProps>;
export declare const SubViewsData: (props: OwnProps, children?: (string | React.Component)[]) => ReactElement;
export default SubViewsData;
