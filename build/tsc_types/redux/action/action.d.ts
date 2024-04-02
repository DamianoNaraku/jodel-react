import { Dictionary, DocString, DPointerTargetable, DState, DUser, GObject, Json, LPointerTargetable, orArr, Pack1, Pointer, RuntimeAccessibleClass, unArr } from "../../joiner";
export declare function BEGIN(): void;
export declare function ABORT(): void;
export declare function END(actionstoPrepend?: Action[]): boolean;
export declare function FINAL_END(): boolean;
declare type NoAsyncFn<T extends (...args: any) => any, ReturnsPromise extends (...args: any) => any = ReturnType<T> extends Promise<any> ? never : T> = ReturnsPromise;
export declare function TRANSACTION<F extends (...args: any) => any>(func: NoAsyncFn<F>, ...params: Parameters<F>): boolean | DState;
declare type AccessModifier = '' | '[]' | '+=' | '-=' | `.${number}` | `[${number}]` | undefined;
export declare class Action extends RuntimeAccessibleClass {
    static cname: string;
    static maxCounter: number;
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    static type: string;
    static SubType: {
        vertexSubElements: 'vertexSubElements';
        vertexSize: 'vertexSize';
    };
    field: string;
    value: any;
    id: Pointer;
    timestamp: number;
    sender: Pointer<DUser, 0, 1>;
    hasFired: number;
    consoleTargetSelector: string;
    type: string;
    subType?: string;
    private stack?;
    protected constructor(field: string, value: any, subType?: string);
    fire(forceRelaunch?: boolean): boolean;
    static possibleInconsistencies: Dictionary<DocString<'subtype'>, Pointer[]>;
    private static parse1;
    static parse<T extends Action | Action[], RET extends T extends any[] ? ParsedAction[] : ParsedAction>(actions: T): RET;
    static fromJson(json: Json): Action;
}
export declare class LoadAction extends Action {
    static cname: string;
    static type: string;
    static new(state: DState | GObject): boolean;
    static create(state: DState | GObject): LoadAction;
    constructor(state: DState | GObject, fire?: boolean);
}
export declare class SetRootFieldAction extends Action {
    static cname: string;
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    static type: string;
    isPointer: boolean;
    static create(fullpath: string, val: string | string[], accessModifier: AccessModifier | undefined, isPointer: boolean): SetRootFieldAction;
    static create<VAL extends any, PATH extends VAL extends string | string[] ? 'must specify "isPointer" parameter' : string, ISPOINTER extends boolean, AM extends AccessModifier | undefined = undefined>(fullpath: PATH, val: VAL, accessModifier?: AM | undefined, isPointer?: ISPOINTER): SetRootFieldAction;
    static new(...a: Parameters<(typeof SetRootFieldAction)["create"]>): boolean;
    protected constructor(fullpath: string, value?: any, fire?: boolean, isPointer?: boolean);
    static create_old<T extends string, VAL extends any, ISPOINTER extends boolean, AM extends AccessModifier | undefined = undefined>(tocheck: never, fullpath: T, val: VAL, accessModifier?: AM | undefined, isPointer?: ISPOINTER): SetRootFieldAction;
    fire(forceRelaunch?: boolean, doChecks?: boolean): boolean;
}
export declare class SetFieldAction extends SetRootFieldAction {
    static type: string;
    static create<D extends DPointerTargetable, T extends (keyof D), VAL extends D[T] extends string | string[] ? 'must specify "isPointer" parameter' : (AM extends undefined | '' ? D[T] : (AM extends '-=' ? number[] : (AM extends '+=' | '[]' | `[${number}]` | `.${number}` ? unArr<D[T]> | D[T] | D[T][] : '_error_'))), ISPOINTER extends boolean | "todo: ISPOINTER type = boolean but required only if val is UnArr< string > = string | string[], maybe do with override", AM extends AccessModifier | undefined = undefined>(me: D | Pointer<D>, field: T, val: VAL, accessModifier?: AM | undefined, isPointer?: ISPOINTER): SetFieldAction;
    static create<D extends DPointerTargetable, T extends (keyof D), VAL extends AM extends '' | undefined ? orArr<string | null | undefined> : (AM extends '-=' ? orArr<number> : (AM extends '+=' ? orArr<string | null | undefined> : '_am_typeerror_')), AM extends AccessModifier | undefined = undefined>(me: D | Pointer<D>, field: T, val: VAL, accessModifier: AM, isPointer: boolean): SetFieldAction;
    static new<D extends DPointerTargetable, T extends (keyof D), VAL extends D[T] extends string | string[] ? 'must specify "isPointer" parameter' : (AM extends undefined | '' ? D[T] : (AM extends '-=' ? number[] : (AM extends '+=' | '[]' | `[${number}]` | `.${number}` ? unArr<D[T]> | D[T] | D[T][] : '_error_'))), ISPOINTER extends boolean | "todo: ISPOINTER type = boolean but required only if val is UnArr< string > = string | string[], maybe do with override", AM extends AccessModifier | undefined = undefined>(me: D | Pointer<D>, field: T, val: VAL, accessModifier?: AM | undefined, isPointer?: ISPOINTER): boolean;
    static new<D extends DPointerTargetable, T extends (keyof D), VAL extends AM extends '' | undefined ? orArr<string | null | undefined> : (AM extends '-=' ? orArr<number> : (AM extends '+=' ? orArr<string | null | undefined> : '_am_typeerror_')), AM extends AccessModifier | undefined = undefined>(me: D | Pointer<D>, field: T, val: VAL, accessModifier: AM, isPointer: boolean): boolean;
    me: Pointer | DPointerTargetable;
    me_field: string;
    protected constructor(me: DPointerTargetable | Pointer, field: string, val: any, fire?: boolean, isPointer?: boolean);
    fire(forceRelaunch?: boolean): boolean;
}
export declare class RedoAction extends Action {
    static cname: string;
    static type: string;
    static new<F extends boolean = true>(amount?: number, notfire?: F): (F extends false ? boolean : RedoAction);
    private constructor();
}
export declare class UndoAction extends Action {
    static cname: string;
    static type: string;
    static new<F extends boolean = true>(amount?: number, notfire?: F): (F extends false ? boolean : UndoAction);
    private constructor();
}
export declare class CombineHistoryAction extends Action {
    static cname: string;
    static type: string;
    static new<F extends boolean = true>(notfire?: F): (F extends false ? boolean : CombineHistoryAction);
    private constructor();
}
export declare class CreateElementAction extends Action {
    static cname: string;
    static type: string;
    value: DPointerTargetable;
    static newBatch<F extends boolean = true>(me: DPointerTargetable[], notfire?: F): (F extends false ? boolean : CreateElementAction)[];
    static create<F extends boolean = true>(me: DPointerTargetable): CreateElementAction;
    static new<F extends boolean = true>(me: DPointerTargetable, notfire?: F): (F extends false ? boolean : CreateElementAction);
    private constructor();
    fire(forceRelaunch?: boolean): boolean;
}
export declare class DeleteElementAction extends SetFieldAction {
    static type: string;
    static create(me: Pack1<LPointerTargetable>): DeleteElementAction;
    static new(me: Pack1<LPointerTargetable>): boolean;
    constructor(me: Pack1<LPointerTargetable>);
}
export declare class CompositeAction extends Action {
    static type: string;
    actions: Action[];
    static new(actions: Action[], launch?: boolean): CompositeAction;
    constructor(actions: Action[], launch?: boolean);
    fire(forceRelanch?: boolean): boolean;
}
export declare class ParsedAction extends SetRootFieldAction {
    path: string;
    pathArray: string[];
    executionCount: number;
}
export {};
