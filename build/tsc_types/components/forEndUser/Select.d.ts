import { DPointerTargetable, LClass } from '../../joiner';
import { GObject, LPointerTargetable, Overlap, Pointer } from '../../joiner';
import React, { LegacyRef, ReactElement, ReactNode } from 'react';
import './style.scss';
declare function SelectComponent(props: AllProps): JSX.Element;
declare namespace SelectComponent {
    var cname: string;
}
export interface SelectOwnProps {
    data?: DPointerTargetable | Pointer<DPointerTargetable, 1, 1, LPointerTargetable>;
    field: string;
    label?: string;
    jsxLabel?: ReactNode;
    tooltip?: boolean | string;
    hidden?: boolean;
    options?: JSX.Element;
    key?: React.Key | null;
    className?: string;
    style?: GObject;
    ref?: React.RefObject<HTMLElement> | LegacyRef<HTMLElement>;
    readonly?: boolean;
    inputClassName?: string;
    inputStyle?: GObject;
    getter?: <T extends DPointerTargetable = any>(data: any | T | Pointer<T>, field: (string | number | symbol) | keyof T) => string;
    setter?: <T extends DPointerTargetable = any>(data: T | Pointer<T>, field: keyof T, selectedValue: string) => void;
}
interface StateProps {
    debugmode: boolean;
    data: LPointerTargetable;
    primitives: LClass[];
    returns: LClass[];
}
interface DispatchProps {
}
declare type AllProps = Overlap<SelectOwnProps, Overlap<StateProps, DispatchProps>>;
export declare const SelectConnected: import("react-redux").ConnectedComponent<typeof SelectComponent, import("react-redux").Omit<Omit<SelectOwnProps, keyof StateProps> & Omit<StateProps, never> & DispatchProps, "data" | "debugmode" | "primitives" | "returns"> & SelectOwnProps>;
export declare const Select: {
    (props: SelectOwnProps, children?: (string | React.Component)[]): ReactElement;
    cname: string;
};
export default Select;
