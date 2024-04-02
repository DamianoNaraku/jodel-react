import { PureComponent, ReactNode } from "react";
import './logger.scss';
import { Dictionary, UnixTimestamp } from "../../joiner";
interface ThisState {
    messages: Dictionary<string, Dictionary<string, any[]>>;
    filters: {
        category: ((cat: string) => boolean) | null;
        tag: ((tag: string) => boolean) | null;
        datafilter: ((data: any[]) => boolean) | null;
    };
    categoriesActive: Dictionary<string, boolean>;
    searchTag: string;
    searchTagAsRegExp: boolean;
    id: number;
    minDate: UnixTimestamp;
    maxDate: UnixTimestamp;
}
export declare class LoggerComponent extends PureComponent<AllProps, ThisState> {
    static cname: string;
    static loggers: LoggerComponent[];
    private static max_id;
    static Log(category: string, key: string, data: any[]): void;
    constructor(props: AllProps, context: any);
    private isCatActive;
    private changeSearchTag;
    private changeRegexpTag;
    private changeMinDate;
    private changeMaxDate;
    render(): ReactNode;
    log: (category: string, key: string, data: any[], fullconcat?: string | undefined) => void;
    componentWillUnmount(): void;
}
interface OwnProps {
}
interface StateProps {
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export {};
