import { DViewElement, GraphSize, LViewElement, Pointer, RuntimeAccessibleClass } from "../../joiner";
export declare class DViewPoint extends DViewElement {
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    id: Pointer<DViewPoint, 1, 1, LViewPoint>;
    name: string;
    static new(name: string, jsxString: string, defaultVSize?: GraphSize, usageDeclarations?: string, constants?: string, preRenderFunc?: string, appliableToClasses?: string[], oclApplyCondition?: string, priority?: number, persist?: boolean): DViewElement;
    static new2(name: string, jsxString: string, callback?: (d: DViewElement) => void, persist?: boolean, id?: string): DViewElement;
}
export declare class LViewPoint extends LViewElement {
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    id: Pointer<DViewPoint, 1, 1, LViewPoint>;
    name: string;
}
