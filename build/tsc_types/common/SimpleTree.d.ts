import { Dictionary, GObject } from "../joiner";
export declare class SimpleTree<T extends GObject> {
    subelements: SimpleTree<T>[];
    node: T;
    [Symbol.iterator]: (this: SimpleTree<T>) => Generator<SimpleTree<T>, void, unknown>;
    getiIsSubElementMatrix(namekey: keyof T): Dictionary<string, Dictionary<string, boolean>>;
    add(e: T, childKey?: keyof T, loopdetector?: WeakMap<T, boolean>): SimpleTree<T> | undefined;
    getSubtree(e: T): SimpleTree<T> | undefined;
    constructor(roots: GObject | GObject[], childKey?: keyof T, loopdetector?: WeakMap<T, boolean>);
}
