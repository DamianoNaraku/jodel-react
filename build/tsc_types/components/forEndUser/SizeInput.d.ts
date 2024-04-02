import React, { PureComponent, ReactNode } from "react";
import type { GObject } from "../../joiner";
import { LPointerTargetable } from "../../joiner";
export declare let useless: number;
interface ThisState {
}
declare class SizeInputComponent extends PureComponent<AllProps, ThisState> {
    static cname: string;
    constructor(props: AllProps, context: any);
    render(): ReactNode;
}
interface OwnProps {
    data: LPointerTargetable;
    field: string;
    xgetter?: (data: LPointerTargetable) => string;
    xsetter?: (value: string | boolean) => void;
    ygetter?: (data: LPointerTargetable) => string;
    ysetter?: (value: string | boolean) => void;
    wgetter?: (data: LPointerTargetable) => string;
    wsetter?: (value: string | boolean) => void;
    hgetter?: (data: LPointerTargetable) => string;
    hsetter?: (value: string | boolean) => void;
    label?: JSX.Element | string;
    readonly?: boolean;
    tooltip?: JSX.Element | boolean;
    key?: React.Key | null;
    className?: string;
    rootClassName?: string;
    inputClassName?: string;
    rootStyle?: GObject;
    style?: GObject;
    inputStyle?: GObject;
}
interface StateProps {
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const SizeInput: import("react-redux").ConnectedComponent<typeof SizeInputComponent, import("react-redux").Omit<React.ClassAttributes<SizeInputComponent> & OwnProps & StateProps & DispatchProps, never> & OwnProps>;
export {};
