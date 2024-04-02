import React, { PureComponent, ReactNode } from "react";
import './example.scss';
interface ThisState {
    listAllStateVariables: boolean;
}
declare class ExampleComponent_disconnected extends PureComponent<AllProps, ThisState> {
    static cname: string;
    constructor(props: AllProps, context: any);
    render(): ReactNode;
}
interface OwnProps {
}
interface StateProps {
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const ExampleComponent: import("react-redux").ConnectedComponent<typeof ExampleComponent_disconnected, import("react-redux").Omit<React.ClassAttributes<ExampleComponent_disconnected> & OwnProps & StateProps & DispatchProps, never> & OwnProps>;
export {};
