import { PureComponent, ReactNode } from "react";
import './logger.scss';
import { GObject } from "../../joiner";
interface ThisState {
}
export declare class DataOutputComponent extends PureComponent<AllProps, ThisState> {
    static cname: string;
    render(): ReactNode;
}
interface OwnProps {
    data: GObject;
    rootName?: string;
}
declare type AllProps = OwnProps;
export {};
