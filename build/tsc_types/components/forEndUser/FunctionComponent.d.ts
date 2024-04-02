import React, { ReactElement, ReactNode } from 'react';
import type { GObject } from "../../joiner";
import { LPointerTargetable } from "../../joiner";
import "./FunctionComponent.scss";
interface OwnProps {
    advancedMode?: boolean;
    collapsed?: boolean;
    data: LPointerTargetable;
    field: string;
    getter?: (data: LPointerTargetable) => string;
    setter?: (value: string | boolean) => void;
    readonly?: boolean;
    label?: string;
    jsxLabel?: ReactNode;
    className?: string;
    style?: GObject;
    tooltip?: string | boolean | ReactElement;
    hidden?: boolean;
    autosize?: boolean;
    inputClassName?: string;
    inputStyle?: GObject;
    asLabel?: boolean;
    key?: React.Key | null;
}
export declare const Function: {
    (props: OwnProps, children?: (string | React.Component)[]): ReactElement;
    cname: string;
};
export {};
