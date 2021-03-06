import {DPointerTargetable, LPointerTargetable} from "./classes";

// export type Class = { new(...args: any[]): any; };
export declare type Class<CtorArgs extends any[] = any[], InstanceType = {}, StaticType = {}, IsAbstract = false> = (abstract new (...args: any[]) => InstanceType) & StaticType;
export declare type CClass<CtorArgs extends any[] = any[], InstanceType = {}, StaticType = {}, IsAbstract = false> = (new (...args: any[]) => InstanceType) & StaticType;
interface Caller { caller: any; }
interface Bind { bind: any; }
interface Apply { apply: any; }
interface Call { call: any; }
export type Function =  Caller | Bind | Apply | Call;
export type Function2 =  (...a: any) => any;
export type Constructor<InstanceType = any> = (new (...a: any) => InstanceType) & {__proto__?: Constructor<InstanceType> & GObject};
export type AbstractConstructor<InstanceType = any> = (GObject | (new (...a: any) => InstanceType)) & {__proto__?: Constructor<InstanceType> & GObject};
export type Temporary = any;
export type Nullable<T> = T | null
export type UnixTimestamp = number;
interface NoCaller { caller?: never; }
interface NoBind { bind?: never; }
interface NoApply { apply?: never; }
interface NoCall { call?: never; }

type primitiveType = string | number | boolean | symbol | null | undefined;
type NotAFunction = NoCaller | NoBind | NoApply | NoCall;
type NotFunction = GObject & NotAFunction | primitiveType


export type Empty = any;
export type UObject = { [key: string]: unknown; }
export type GObject<DocSubType = ''> = { [key: string]: any; };
export type RawObject = { [key: string]: NotFunction; };
// Json<T> = oggetto con le chiavi di T senza le funzioni (post deserializzazione)
export type Json<T extends GObject = RawObject> = {[key in keyof T]: T[key] extends Function ? never : T[key]; };

// export type Dictionary<K extends keyof any, T> = { [P in K]: T; };
export type Dictionary<K extends keyof GObject = any, V = any> = { [P in K]: V; } & { _subMaps?: V};
// _subMaps type *actually just Dict<str, boolean> but if i set it as bool and access a random element of the map it will be typed as boolean | V*/
export type DocString<T, COMMENT = ''> = string;
export type NotFound = null;
export const NotFoundv = null as NotFound;
export type nstring = null | string;
export type nnumber = null | number;
export type nbool = null | boolean;
export type bool = boolean;
export type TODO<T = any> = any;
export type NonEmptyString = Exclude<string, ''>;

// tipo puramente documentazionale, ?? solo una stringa o array di stringhe
export type Pointer<T extends DPointerTargetable = DPointerTargetable, lowerbound = number, upperbound = number | string, RET = LPointerTargetable> =
    upperbound extends 'N' ? string[] : (
    upperbound extends 0 ? never : (
    lowerbound extends 0 ? (string | undefined | null) : string)); // & {[Symbol.iterator]: () => IterableIterator<string>};

declare global  {
    interface ProxyConstructor {
        new <TS extends object, TT extends object = TS>(target: TS, handler: ProxyHandler<TS>): TT;
        // official flawed definition: new <T extends object>(target: T, handler: ProxyHandler<T>): T;
    }

}


// export type Proxyfied<T extends object> = T | GObject;// | T;

export type Proxyfied<T extends object> = UObject & T;
export const windoww: typeof window & GObject= window;
export type InOutParam<T> = T;

export type IsActually<T> = any; // for some reason typescript complains about circular type references? this is a workaround
