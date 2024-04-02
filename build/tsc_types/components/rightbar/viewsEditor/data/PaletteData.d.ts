import React, { ReactElement } from 'react';
import { DViewElement, LViewElement, Pointer } from '../../../../joiner';
declare function PaletteDataComponent(props: AllProps): JSX.Element;
interface OwnProps {
    viewID: Pointer<DViewElement, 1, 1, LViewElement>;
    readonly: boolean;
}
interface StateProps {
    view: LViewElement;
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const PaletteDataConnected: import("react-redux").ConnectedComponent<typeof PaletteDataComponent, import("react-redux").Omit<OwnProps & StateProps & DispatchProps, "view"> & OwnProps>;
export declare const PaletteData: (props: OwnProps, children?: (string | React.Component)[]) => ReactElement;
export default PaletteData;
