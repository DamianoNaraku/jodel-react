import { DPointerTargetable, LPointerTargetable } from "../../joiner";
export declare class DLog extends DPointerTargetable {
    static cname: string;
    static logic: typeof LPointerTargetable;
    value: string;
    constructor(value: string);
}
