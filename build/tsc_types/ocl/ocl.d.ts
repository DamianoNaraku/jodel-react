import { OclEngine } from "@stekoe/ocl.js";
import { OclResult } from "@stekoe/ocl.js/dist/components/OclResult";
import { Constructor, DGraphElement, DModelElement, DViewElement, GObject, LGraphElement, LModelElement, LViewElement, RuntimeAccessibleClass } from "../joiner";
export declare class Company {
    name: string;
    employee: Persona[];
    manager: Persona | null;
    static all: Company[];
    constructor(name?: string, employee?: Persona[], manager?: Persona | null);
}
export declare class Persona {
    name: string;
    age: number;
    isUnemployed: boolean;
    static all: Persona[];
    constructor(name?: string, age?: number, isUnemployed?: boolean);
}
export declare class OCL extends RuntimeAccessibleClass {
    static evaluate<T extends GObject>(obj0: T, constructor: Constructor<T>, oclexp: string, typeused?: Constructor[], oclEngine?: OclEngine): OclResult;
    static filter<T extends GObject, M extends 'ocl' | 'bool' | 'src', R extends (M extends 'ocl' ? (OclResult | undefined) : (M extends 'src' ? T | undefined : boolean))>(keepIndex: boolean, returnType: M, obj0: T[], oclexp: string, typeused?: Constructor[]): R[];
    private static getOCLScore;
    static test(mp0: DModelElement | LModelElement | undefined, view0: LViewElement | DViewElement | undefined, node0?: LGraphElement | DGraphElement): number;
    private static filter0;
}
