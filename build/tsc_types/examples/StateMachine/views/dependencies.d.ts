import { LClass } from "../../../model/logicWrapper";
export declare class Dependencies {
    static state: string;
    static command: string;
    static events: (event: LClass) => string;
    static event: string;
    static transition: string;
}
