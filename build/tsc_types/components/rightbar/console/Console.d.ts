import "./console.scss";
import React, { PureComponent, ReactElement } from "react";
import { DGraphElement, LGraphElement, LModelElement, LViewElement, Pointer } from "../../../joiner";
declare class ThisState {
    expression: string;
    output: any;
}
export declare class ConsoleComponent extends PureComponent<AllProps, ThisState> {
    static cname: string;
    lastNode?: Pointer<DGraphElement>;
    constructor(props: AllProps);
    private _context;
    change(evt?: React.ChangeEvent<HTMLTextAreaElement>): void;
    render(): JSX.Element;
    private setNativeConsoleVariables;
}
interface OwnProps {
}
interface StateProps {
    data: LModelElement | null;
    node: LGraphElement | null;
    view: LViewElement | null;
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const ConsoleConnected: import("react-redux").ConnectedComponent<typeof ConsoleComponent, import("react-redux").Omit<React.ClassAttributes<ConsoleComponent> & OwnProps & StateProps & DispatchProps, "view" | "node" | "data"> & OwnProps>;
export declare const Console: {
    (props: OwnProps, children?: (string | React.Component)[]): ReactElement;
    cname: string;
};
export default Console;
