import React, { ReactElement, ReactNode } from 'react';
import { DPointerTargetable, GObject, LPointerTargetable, Overlap, Pointer } from '../../joiner';
import './color.scss';
declare function ColorComponent(props: AllProps): JSX.Element;
declare namespace ColorComponent {
    var cname: string;
}
export interface InputOwnProps {
    data: LPointerTargetable | DPointerTargetable | Pointer<DPointerTargetable, 1, 1, LPointerTargetable>;
    field: string;
    getter?: (data: LPointerTargetable, field: string) => string;
    setter?: (value: string) => void;
    label?: string;
    jsxLabel?: ReactNode;
    type?: 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'tel' | 'text' | 'time' | 'url' | 'week';
    className?: string;
    style?: GObject;
    readonly?: boolean;
    tooltip?: string | boolean | ReactElement;
    hidden?: boolean;
    autosize?: boolean;
    inputClassName?: string;
    inputStyle?: GObject;
    asLabel?: boolean;
    key?: React.Key | null;
    canDelete?: boolean;
    children?: any;
    childrenn?: any;
}
interface StateProps {
    debugmodee: string;
    data: LPointerTargetable & GObject;
}
interface DispatchProps {
}
declare type AllProps = Overlap<InputOwnProps, Overlap<StateProps, DispatchProps>>;
export declare const ColorConnected: import("react-redux").ConnectedComponent<typeof ColorComponent, import("react-redux").Omit<Omit<InputOwnProps, keyof StateProps> & Omit<StateProps, never> & DispatchProps, "data" | "debugmodee"> & InputOwnProps>;
export declare function Color(props: InputOwnProps, children?: (string | React.Component)[]): ReactElement;
export declare namespace Color {
    var cname: string;
}
export {};
