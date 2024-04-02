import React, { ReactElement, ReactNode } from 'react';
import { DocString, DPointerTargetable, GObject, LPointerTargetable, Overlap, Pointer } from '../../joiner';
import './style.scss';
declare function TextAreaComponent(props: AllProps): JSX.Element;
declare namespace TextAreaComponent {
    var cname: string;
}
export interface TextAreaOwnProps {
    data: LPointerTargetable | DPointerTargetable | Pointer<DPointerTargetable, 1, 1, LPointerTargetable>;
    field: string;
    label?: string;
    getter?: <T extends LPointerTargetable>(data: T, field: DocString<"keyof T">) => string;
    setter?: <T extends LPointerTargetable>(value: string | boolean, data: T, field: DocString<"keyof T">) => void;
    jsxLabel?: ReactNode;
    readonly?: boolean;
    tooltip?: string | boolean | ReactElement;
    hidden?: boolean;
    key?: React.Key | null;
    className?: string;
    inputClassName?: string;
    style?: GObject;
    inputStyle?: GObject;
    placeholder?: string;
}
interface StateProps {
    debugmode: boolean;
    data: LPointerTargetable & GObject;
}
interface DispatchProps {
}
declare type AllProps = Overlap<TextAreaOwnProps, Overlap<StateProps, DispatchProps>>;
export declare const TextAreaConnected: import("react-redux").ConnectedComponent<typeof TextAreaComponent, import("react-redux").Omit<Omit<TextAreaOwnProps, keyof StateProps> & Omit<StateProps, never> & DispatchProps, "data" | "debugmode"> & TextAreaOwnProps>;
export declare const TextArea: {
    (props: TextAreaOwnProps, children?: (string | React.Component)[]): ReactElement;
    cname: string;
};
export default TextArea;
