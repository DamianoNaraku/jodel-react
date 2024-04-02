import React, { InputHTMLAttributes, PureComponent, ReactNode } from 'react';
import './GenericInput.scss';
import { Info, GObject } from '../../joiner';
import { DPointerTargetable, LPointerTargetable } from '../../joiner';
interface ThisState {
}
declare class GenericInputComponent extends PureComponent<AllProps, ThisState> {
    constructor(props: AllProps, context: any);
    render(): ReactNode;
}
interface _OwnProps {
    data: DPointerTargetable | LPointerTargetable;
    field: string;
    info?: Info | undefined;
    tooltip?: boolean | string;
    className?: string;
    rootClassName?: string;
    inputClassName?: string;
    rootStyle?: GObject;
    style?: GObject;
    inputStyle?: GObject;
}
declare type OwnProps = _OwnProps & InputHTMLAttributes<Event>;
interface StateProps {
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const GenericInput: import("react-redux").ConnectedComponent<typeof GenericInputComponent, import("react-redux").Omit<React.ClassAttributes<GenericInputComponent> & _OwnProps & React.InputHTMLAttributes<Event> & StateProps & DispatchProps, never> & _OwnProps & React.InputHTMLAttributes<Event>>;
export {};
