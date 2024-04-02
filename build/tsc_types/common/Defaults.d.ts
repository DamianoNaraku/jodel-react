import { Pointer, DViewElement, DViewPoint, Dictionary } from '../joiner';
export declare class Defaults {
    static cname: string;
    static views: Pointer<DViewElement>[];
    static defaultViewsMap: Dictionary<Pointer, boolean>;
    static viewpoints: Pointer<DViewPoint>[];
    static check(id: string): boolean;
}
