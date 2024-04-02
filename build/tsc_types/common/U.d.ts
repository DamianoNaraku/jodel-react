/// <reference types="jquery" />
import type { AbstractConstructor, Constructor, Dictionary, GObject, Pointer } from "../joiner";
import { DClassifier, DModelElement, Json, LClassifier, LModelElement, LogicContext, windoww } from "../joiner";
export declare class Color {
    r: number;
    g: number;
    b: number;
    constructor(r: number, g: number, b: number);
    static fromHex(hex: string): Color;
    static fromHLS({ h, l, s }: {
        h: number;
        l: number;
        s: number;
    }): Color;
    getHex(): string;
    mixWith(c: Color): void;
    getHLS(): {
        h: number;
        l: number;
        s: number;
    };
    duplicate(): Color;
}
export declare class U {
    static wrapper<T>(obj: any): T;
    static json(dElement: GObject): Json;
    static fatherChain(me: LModelElement): Pointer<DModelElement, 0, 'N', LModelElement>;
    static isShallowEqualWithProxies(obj1: GObject, obj2: GObject, skipKeys?: Dictionary<string, any>, out?: {
        reason?: string;
    }, depth?: number, maxDepth?: number, returnIfMaxDepth?: boolean): boolean;
    static deepEqual(x: GObject, y: GObject): boolean;
    static sleep(s: number): Promise<void>;
    static getRandomString(length: number): string;
    static alert(title: string, text: string): void;
    static popup(element: any): void;
    static filteredPointedBy(data: LModelElement, label: string): LModelElement[];
    static getFatherFieldToDelete(data: LModelElement): keyof DModelElement | null;
    static initializeValue(typeclassifier: undefined | DClassifier | LClassifier | Pointer<DClassifier, 1, 1, LClassifier>): string;
    static orderChildrenByTimestamp(context: LogicContext): LModelElement[];
    static followPath(base: GObject, path: string): {
        chain: GObject[];
        lastObject: GObject;
        keys: string[];
        lastkey: string;
        lastval: any;
        failedRemainingPath: string[];
    };
    static multiReplaceAllKV(a: string, kv?: string[][]): string;
    static multiReplaceAll(a: string, searchText?: string[], replacement?: string[]): string;
    static replaceAll(str: string, searchText: string, replacement: string | undefined, debug?: boolean, warn?: boolean): string;
    static toFileName(a?: string): string;
    static isStrict: boolean;
    static objectMergeInPlace<A extends object, B extends object>(output: A, ...objarr: B[]): void;
    static log(obj: unknown, label?: string): void;
    static removeEmptyObjectKeys(obj: GObject): void;
    static objectMergeInPlace_conditional<A extends GObject, B extends GObject>(output: A, condition: (...a: any) => any, ...objarr: B[]): A & B;
    static buildFunctionDocumentation(f: Function): {
        parameters: {
            name: string;
            defaultVal: string | undefined;
            typedesc: string | null;
        }[];
        returns: string | undefined;
        f: Function;
        fname: string | undefined;
        isLambda: boolean;
        signature: string;
    };
    static parseFunctionWithContextAndScope<ParamNames extends string[], T extends Function = Function, TT extends GObject | undefined = GObject>(codeStr0: string | Function, context0: GObject | undefined, scope0: TT, codestrParamNames?: ParamNames, protectShallowValues?: boolean, doIdentifierValidation?: boolean): (TT extends undefined ? (...params: any) => any : (scopee: TT, ...paramss: {
        [K in keyof ParamNames]: any;
    }) => any);
    static evalInContextAndScopeNew<T = any>(codeStr: string | ((...a: any) => any), context0: GObject, injectScopeToo: boolean, protectShallowValues?: boolean, doIdentifierValidation?: boolean): T;
    static validIdentfierRegexp: RegExp;
    static evalInContextAndScope<T = any>(codeStr: string | ((...a: any) => any), scope0: GObject | undefined, context0?: GObject, protectShallowValues?: boolean, doIdentifierValidation?: boolean): T;
    static execInContextAndScope<T extends (...args: any) => any>(func: T, parameters: Parameters<T>, scope?: GObject, context?: GObject): ReturnType<T>;
    private static execInScope_DO_NOT_USE;
    private static evalInContext;
    static highOrderFunctionExampleTyped<T extends (...args: any[]) => ReturnType<T>>(func: T): (...funcArgs: Parameters<T>) => ReturnType<T>;
    static asClass<T extends Function>(obj: any, classe: T, elseReturn?: T | null): null | T;
    static asString<T>(propKey: unknown, elseReturn?: T | null): string | null | T;
    static isString(propKey: unknown): boolean;
    static loadScript(path: string, useEval?: boolean): void;
    static ancestorArray<T extends Element>(domelem: T, stopNode?: Node, includeSelf?: boolean): Array<T>;
    static toHtml<T extends Element>(html: string, container?: Element, containerTag?: string): T;
    static levenshtein(a: string, b: string): number;
    static getClosestPropertyName(names: string[], name: string): string;
    static getClosestPropertyNames(names: string[], name: string): string[];
    static autoCorrectProxy<T extends GObject>(target: T, recursive: boolean, logger: Console): ProxyHandler<T>;
    static arrayRemoveAll<T>(arr: Array<T>, elem: T, debug?: boolean): void;
    static arrayUnique<T>(arr: T[]): Array<T>;
    static fileReadContent(file: File, callback: (content: string) => void): void;
    static fileRead(onChange: (e: Event, files: FileList | null, contents?: string[]) => void, extensions: string[] | FileReadTypeEnum[], readContent: boolean): void;
    static clear(htmlNode: Element): void;
    static clearAllTimeouts(): void;
    static getStackTrace(sliceCalls?: number): string[];
    static getCaller(stacksToSkip?: number): string;
    private static gotcalledby;
    static isFirstTimeCalledByThisLine(stacksToSkip?: number): boolean;
    static lineKey(): string;
    static preventBackSlashHistoryNavigation(event: JQuery.KeyDownEvent): boolean;
    static SetMerge<T>(modifyFirst?: boolean, ...iterables: Iterable<T>[]): Set<T>;
    static ArrayMergeU(arr1: any[], ...arr2: any[]): void;
    static ArrayMerge(arr1: any[], ...arr2: any[]): void;
    static ArrayMerge0(unique: boolean, arrtarget: any[], ...arrays: any[]): void;
    static ArrayAdd<T>(arr: Array<T>, elem: T, unique?: boolean, throwIfContained?: boolean): boolean;
    private static maxID;
    static idPrefix: string;
    static getID: Generator<number>;
    static getType(param: any): string;
    static stringCompare(s1: string, s2: string): -1 | 0 | 1;
    static endsWith(str: string, suffix: string | string[]): boolean;
    static arrayMergeInPlace<T>(arr1: T[], ...otherArrs: T[][]): T[];
    static getEndingNumber(s: string, ignoreNonNumbers?: boolean, allowDecimal?: boolean): number;
    static increaseEndingNumber(s: string, allowLastNonNumberChars?: boolean, allowDecimal?: boolean, increaseWhile?: ((x: string) => boolean)): string;
    static shallowEqual(objA: GObject, objB: GObject): boolean;
    static isNumber(o: any): o is number;
    static getAllPrototypes(constructor: Constructor, chainoutoutrecursive?: GObject[], currentRecursion?: number, maxRecursion?: number, cache?: boolean): GObject[];
    static classIsExtending(subconstructor: Constructor | AbstractConstructor, superconstructor: Constructor | AbstractConstructor): boolean;
    static isObject(v: GObject | any, returnIfNull?: boolean, returnIfUndefined?: boolean, retIfArray?: boolean): boolean;
    static objectFromArrayValues(arr: (string | number)[]): Dictionary<string | number, boolean>;
    static toBoolString(bool: boolean, ifNotBoolean?: boolean): string;
    static fromBoolString<T extends any>(str: string | boolean): boolean;
    static fromBoolString<T extends any>(str: string | boolean, defaultVal?: T): boolean | T;
    static fromBoolString<T extends any>(str: string | boolean, defaultVal?: T, allowNull?: boolean): boolean | null | T;
    static arrayDifference<T>(starting: T[], final: T[]): {
        added: T[];
        removed: T[];
        starting: T[];
        final: T[];
    };
    static objectDelta<T extends object>(old: T, neww: T, deep?: boolean): Partial<T>;
    static objdiff<T extends GObject>(old: T, neww: T): {
        removed: Partial<T>;
        added: Partial<T>;
        changed: Partial<T>;
        unchanged: Partial<T>;
    };
    static flattenObjectToRoot(obj: GObject, prefix?: string, pathseparator?: string): GObject;
    static ObjectToAssignementStrings<R extends {
        str: string;
        fullstr: string;
        path: string[];
        fullpath: string[];
        val: string;
        fullvalue: string;
        pathlength?: number;
    }>(obj: GObject, maxkeylength?: number, maxsubpaths?: number, maxvallength?: number, toolongreplacer?: string, out?: {
        best: R;
    } & R[], quotestrings?: boolean): {
        best: string;
    } & string[];
    static download(filename?: string, text?: string, debug?: boolean): void;
    static formatXml(xml: string): string;
    static circularStringify(obj: GObject, replacer?: null | ((key: string, value: any) => any), space?: string | number, maxDepth_unsupported?: number): string;
    static getFirstNumber(s: string, allowDecimalDot?: boolean, allowDecimalComma?: boolean, valueifmismatch?: any): number;
    static isEmptyObject(obj: GObject | undefined): boolean;
    private static pairArrayElementsRepeatFunc;
    private static pairArrayElementsReducerFunc;
    static pairArrayElements<T>(arr: T[], withRepetitions?: boolean): T[][];
    static decomment_all(str: string): string;
    static decomment_line(str: string, trimLines?: boolean): string;
    static decomment_block(str: string): string;
    static uppercaseFirstLetter<T extends (string | GObject<"jsx">)>(str: T): T;
    static wrapUserFunction(str: string): string;
    static stringMiddleCut<T extends boolean | undefined, RET extends string | string[] = T extends true ? string[] : string>(str: string, maxLength: number, ellipsisChar?: string, asArray?: T): RET;
}
export declare class DDate {
    static cname: string;
    static addDay(date: Date, offset: number, inplace: boolean): Date;
    static addMonth(date: Date, offset: number, inplace: boolean): Date;
    static addYear(date: Date, offset: number, inplace: boolean): Date;
}
export declare class myFileReader {
    private static input;
    private static fileTypes;
    private static onchange;
    private static setinfos;
    private static reset;
    static show(onChange: (e: Event, files: FileList | null, contents?: string[]) => void, extensions: string[] | FileReadTypeEnum[] | undefined, readContent: boolean): void;
}
export declare class Uarr {
    static arrayIntersection<T>(arr1: T[], arr2: T[]): T[];
    static arraySubtract(arr1: any[], arr2: any[], inPlace: boolean): any[];
    static equals<T extends any>(a1: T[], a2: T[], deep: boolean): boolean;
}
export declare class FocusHistoryEntry {
    static cname: string;
    time: Date;
    evt: JQuery.FocusInEvent;
    element: Element;
    constructor(e: JQuery.FocusInEvent, element?: Element, time?: Date);
}
export declare enum ShortDefaultEClasses {
    EObject = "EObject",
    EAnnotation = "EAnnotation",
    EClass = "EClass",
    EPackage = "EPackage",
    ENamedElement = "ENamedElement"
}
export declare enum ShortAttribETypes {
    EVoid = "EVoid",
    EChar = "EChar",
    EString = "EString",
    EDate = "EDate",
    EBoolean = "EBoolean",
    EByte = "EByte",
    EShort = "EShort",
    EInt = "EInt",
    ELong = "ELong",
    EFloat = "EFloat",
    EDouble = "EDouble"
}
export declare const ShortAttribSuperTypes: Dictionary<ShortAttribETypes, ShortAttribETypes[]>;
export declare function toShortEType(a: AttribETypes): ShortAttribETypes;
export declare function toLongEType(a: ShortAttribETypes): AttribETypes;
export declare function toShortEClass(a: DefaultEClasses): ShortDefaultEClasses;
export declare function toLongEClass(a: ShortDefaultEClasses): DefaultEClasses;
export declare class SelectorOutput {
    jqselector: string;
    attrselector: string;
    attrRegex: RegExp;
    exception: any;
    resultSetAttr: Attr[];
    resultSetElem: JQuery<Element>;
}
export declare enum Keystrokes {
    clickLeft = 0,
    clickWheel = 1,
    clickRight = 2,
    clickBackMouseButton = 3,
    clickForwardMouseButton = 4,
    escape = "Escape",
    capsLock = "CapsLock",
    shift = "Shift",
    tab = "Tab",
    alt = "Alt",
    control = "Control",
    end = "End",
    home = "Home",
    pageUp = "PageUp",
    pageDown = "PageDown",
    enter = "Enter",
    numpadEnter = "NumpadEnter",
    audioVolumeMute = "AudioVolumeMute",
    audioVolumeUp = "AudioVolumeUp",
    audioVolumeDown = "AudioVolumeDown",
    mediaTrackPrevious = "MediaTrackPrevious",
    delete = "Delete",
    backspace = "Backspace",
    space = " ",
    altGraph = "AltGraph",
    arrowLeft = "ArrowLeft",
    arrowRight = "ArrowRight",
    arrowUp = "ArrowUp",
    arrowDown = "ArrowDown",
    insert = "Insert",
    f1 = "F1",
    meta = "Meta",
    unidentified = "Unidentified",
    __NotReacting__ = "fn, print, maybe others"
}
export declare enum DefaultEClasses {
    EObject = "ecore:EClass platform:/plugin/org.eclipse.emf.ecore/model/Ecore.ecore#//EObject",
    EAnnotation = "ecore:EClass platform:/plugin/org.eclipse.emf.ecore/model/Ecore.ecore#//EAnnotation",
    EClass = "ecore:EClass platform:/plugin/org.eclipse.emf.ecore/model/Ecore.ecore#//EClass",
    EPackage = "ecore:EClass platform:/plugin/org.eclipse.emf.ecore/model/Ecore.ecore#//EPackage",
    ENamedElement = "ecore:EClass platform:/plugin/org.eclipse.emf.ecore/model/Ecore.ecore#//ENamedElement"
}
export declare enum AttribETypes {
    EVoid = "ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EVoid",
    EChar = "ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EChar",
    EString = "ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EString",
    EDate = "ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EDate",
    EFloat = "ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EFloat",
    EDouble = "ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EDouble",
    EBoolean = "ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EBoolean",
    EByte = "ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EByte",
    EShort = "ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EShort",
    EInt = "ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EInt",
    ELong = "ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//ELong"
}
export declare class ParseNumberOrBooleanOptions {
    defaultValue?: any;
    allowNull?: boolean;
    nullValue?: any;
    allowUndefined?: boolean;
    undefinedValue?: any;
    allowedNan?: boolean;
    nanValue?: any;
    allowBooleans?: boolean;
    trueValue?: any;
    falseValue?: any;
    constructor(defaultValue?: any, allowNull?: boolean, nullValue?: any, allowUndefined?: boolean, undefinedValue?: any, allowedNan?: boolean, nanValue?: any, allowBooleans?: boolean, trueValue?: any, falseValue?: any);
}
export declare class Log {
    constructor();
    static lastError: any[];
    private static loggerMapping;
    static registerLogger(logger: LoggerInterface, triggerAt: (typeof windoww.U.pe) & {
        name: string;
        cname: string;
    }): void;
    static disableConsole(): void;
    static enableConsole(): void;
    private static log;
    static e(b: boolean, ...restArgs: any[]): string;
    static eDev(b: boolean, ...restArgs: any[]): string;
    static ex(b: boolean, ...restArgs: any[]): null | never | any;
    static exDev(b: boolean, ...restArgs: any[]): null | never | any;
    static i(b: boolean, ...restArgs: any[]): string;
    static l(b: boolean, ...restArgs: any[]): string;
    static w(b: boolean, ...restArgs: any[]): string;
    static eDevv<T extends any = any>(firstParam?: NotBool<T>, ...restAgs: any): string;
    static ee(...restAgs: any): string;
    static exDevv<T extends any = any>(firstParam?: NotBool<T>, ...restAgs: any): never | any;
    static exx(...restAgs: any): never | any;
    static ii(...restAgs: any): string;
    static ll(...restAgs: any): string;
    static ww(...restAgs: any): string;
}
declare type NotBool<T> = Exclude<T, boolean>;
interface LoggerInterface {
    log: (category: string, key: string, data: any[], fullconcat?: string) => any;
}
export declare class FileReadTypeEnum {
    static image: FileReadTypeEnum;
    static audio: FileReadTypeEnum;
    static video: FileReadTypeEnum;
    static AndManyOthersButThereAreTooMuch: string;
    static OrJustPutFileExtension: string;
}
export {};
