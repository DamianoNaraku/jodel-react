import type { Pointer, RuntimeAccessibleClass, ShortAttribETypes } from "../joiner";
import { DGraphElement, DPointerTargetable, DState, DUser, LAttribute, LClass, LEdge, LEdgePoint, LEnumerator, LEnumLiteral, LGraph, LGraphElement, LGraphVertex, LModel, LObject, LOperation, LPackage, LParameter, LReference, LValue, LVertex, LVoidEdge, LVoidVertex } from "../joiner";
import type React from "react";
import { ReactNode } from 'react';
export declare type double = number;
export declare type float = number;
export declare type int = number;
export declare type byte = number;
export declare type uint = number;
export declare type ubyte = number;
export declare type ratio = number;
export declare type percent = number;
export declare type degree = number;
export declare type radian = number;
export declare type Class<CtorArgs extends any[] = any[], InstanceType = {}, StaticType = {}, IsAbstract = false> = (abstract new (...args: any[]) => InstanceType) & StaticType;
export declare type CClass<CtorArgs extends any[] = any[], InstanceType = {}, StaticType = {}, IsAbstract = false> = (new (...args: any[]) => InstanceType) & StaticType;
interface Caller {
    caller: any;
}
interface Bind {
    bind: any;
}
interface Apply {
    apply: any;
}
interface Call {
    call: any;
}
export declare type Function = Caller | Bind | Apply | Call;
export declare type Function2 = (...a: any) => any;
export declare type Constructor<InstanceType = any> = (new (...a: any) => InstanceType) & {
    __proto__?: Constructor<InstanceType> & GObject;
};
export declare type AbstractConstructor<InstanceType = any> = (GObject | (new (...a: any) => InstanceType)) & {
    __proto__?: Constructor<InstanceType> & GObject;
};
export declare type Temporary = any;
export declare type Nullable<T> = T | null;
export declare type UnixTimestamp = number;
interface NoCaller {
    caller?: never;
}
interface NoBind {
    bind?: never;
}
interface NoApply {
    apply?: never;
}
interface NoCall {
    call?: never;
}
export declare type orArr<T> = T | T[];
export declare type unArr<T extends any[] | any> = T extends any[] ? T[0] : T;
export declare type PrimitiveType = string | number | boolean | null | undefined;
declare type NotAFunction = NoCaller | NoBind | NoApply | NoCall;
declare type NotFunction = GObject & NotAFunction | PrimitiveType;
export declare type Info = {
    txt: string | React.ReactElement;
    type?: ShortAttribETypes | string;
    label?: JSX.Element | string;
    readType?: ShortAttribETypes | string | typeof RuntimeAccessibleClass;
    writeType?: ShortAttribETypes | string | typeof RuntimeAccessibleClass;
    obsolete?: boolean;
    hidden?: boolean;
    todo?: boolean;
    isGlobal?: boolean;
    isNode?: boolean;
    isEdge?: boolean;
    isEdgePoint?: boolean;
    enum?: GObject;
    pattern?: string;
    min?: number;
    max?: number;
    positive?: boolean;
    digits?: number;
    step?: number;
};
export declare type Empty = any;
export declare type UObject = {
    [key: string]: unknown;
};
export declare type GObject<DocSubType = ''> = DocSubType extends object ? {
    [key: string]: any;
} & DocSubType : {
    [key: string]: any;
};
export declare type RawObject = {
    [key: string]: NotFunction;
};
export declare type Json<T extends GObject = RawObject> = {
    [key in keyof T]: T[key] extends Function ? never : (T[key] extends symbol ? "symbol" : Exclude<T[key], symbol>);
};
export declare type Dictionary<K extends keyof GObject = any, V = any> = {
    [P in K]: V;
} & {
    _subMaps?: V;
};
export declare type DocString<T, COMMENT = ''> = string;
export declare type NotFound = null;
export declare const NotFoundv: null;
export declare type nstring = null | string;
export declare type nnumber = null | number;
export declare type nbool = null | boolean;
export declare type bool = boolean;
export declare type TODO<T = any> = any;
export declare type NonEmptyString = Exclude<string, ''>;
export declare enum EdgeBendingMode {
    "Line" = "L",
    "Bezier_quadratic" = "Q",
    "Bezier_cubic" = "C",
    "Bezier_cubic_mirrored" = "S",
    "Bezier_quadratic_mirrored" = "T",
    "Elliptical_arc" = "A",
    "Bezier_QT" = "QT",
    "Bezier_CS" = "CS"
}
export declare enum EdgeGapMode {
    "gap" = "gap",
    "autoFill" = "autoFill",
    "lineFill" = "lineFill",
    "arcFill" = "arcFill",
    "center" = "center",
    "average" = "average"
}
export declare enum EMeasurableEvents {
    onDataUpdate = "onDataUpdate",
    onDragStart = "onDragStart",
    onDragEnd = "onDragEnd",
    whileDragging = "whileDragging",
    onResizeStart = "onResizeStart",
    onResizeEnd = "onResizeEnd",
    whileResizing = "whileResizing",
    onRotationStart = "onRotationStart",
    onRotationEnd = "onRotationEnd",
    whileRotating = "whileRotating"
}
export declare type Subtract<T, K> = Omit<T, keyof K>;
export declare type Overlap<T1, T2> = Omit<T1, keyof T2> & T2;
declare global {
    interface ProxyConstructor {
        new <TS extends object, TT extends object = TS>(target: TS, handler: ProxyHandler<TS>): TT;
    }
}
export declare type Proxyfied<T extends object> = UObject & T;
export declare const windoww: typeof window & GObject;
export declare type InOutParam<T> = T;
export declare type IsActually<T> = any;
declare type ObjectWithoutStrings<T> = {
    [P in keyof T as (T[P] extends string ? never : (T[P] extends string[] ? never : P))]: T[P];
};
declare type pureStringsNoPointers<T> = {
    [P in keyof T as (T[P] extends Pointer ? (Pointer extends T[P] ? P : (never)) : never)]: T[P];
};
export declare type ObjectWithoutPointers<T> = Omit<ObjectWithoutStrings<T> & pureStringsNoPointers<T>, 'pointedBy' | '_storePath'>;
export declare type InitialSizeField = number;
export declare type InitialVertexSizeObj = Partial<{
    id?: DocString<"Just something to be used as a react key. doesn't need to be a proper Pointer id">;
    index?: number;
    w: InitialSizeField;
    h: InitialSizeField;
    x: InitialSizeField;
    y: InitialSizeField;
}>;
export declare type InitialVertexSizeFunc = ((parent: LVoidEdge | LGraphElement, thiss: LVoidVertex | LEdgePoint) => InitialVertexSizeObj);
export declare type InitialVertexSize = undefined | InitialVertexSizeObj | InitialVertexSizeFunc;
export declare type Dependency = {
    root: keyof DState;
    obj: Pointer<DPointerTargetable, 0, 1>;
    field: keyof DPointerTargetable | '';
    op: '' | '-=';
};
export declare type Selected = Dictionary<Pointer<DUser>, Pointer<DGraphElement, 0, 1>>;
export declare type FakeStateProps = any;
export declare type ApiResponse = {
    code: number;
    body: Json | string;
};
export declare type DataTypes = LModel | LPackage | LClass | LEnumerator | LAttribute | LReference | LOperation | LParameter | LEnumLiteral | LObject | LValue;
export declare type NodeTypes = LGraph | LGraphVertex | LVoidVertex | LVertex | LGraphElement | LEdge | LEdgePoint;
export interface DefaultProps {
    key?: string | number;
    children?: ReactNode;
}
export {};
