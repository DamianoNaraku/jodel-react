import type { Json, Pointer, GObject, Dictionary, DocString } from "../joiner";
import { DModelElement, DModel, LModel, DValue, DEnumerator, DClass, LClass, DOperation, DPackage, LTypedElement } from "../joiner";
declare type RET<T = boolean> = T | Promise<T>;
declare class SavePack {
    model: string;
    vertexpos: string;
    view: string;
    constructor(model?: string, vertexpos?: string, view?: string);
}
export declare abstract class IStorage {
    static get(): IStorage;
    prefix: string;
    autosave: boolean;
    constructor(prefix: string, autosave: boolean);
    del(key: string | number): boolean;
    abstract set(key: string | number, val: string | any): RET;
    get<T extends boolean>(key: string | number, parse?: T): T extends false ? null | string : null | any;
    protected serialize(val: any): string;
    protected deserialize(val: string): any;
    protected set0(val: any): string;
    protected get0(val: any): string;
    protected parse(val: any): string;
}
export declare class LocalStorage extends IStorage {
    static get(): LocalStorage;
    private constructor();
    private static KeyList;
    get<T extends boolean>(key: string | number, parse?: T): T extends false ? null | string : null | any;
    set(key?: string | number, val?: string | any): boolean;
    getLastOpened(modelNumber: 1 | 2): SavePack;
    deleteLastOpened(modelNumber: 1 | 2): void;
    setLastOpened(modelNumber: 1 | 2, model?: string, view?: string, vertex?: string): void;
}
export declare class EcoreParser {
    static supportedEcoreVersions: string[];
    static prefix: string;
    static parse(ecorejson: GObject | string | null, isMetamodel: boolean, filename: string | undefined, persist?: boolean): DModelElement[];
    private static fixObjectPointers;
    private static tempfix_untilopennewtabisdone;
    private static LinkAllNamesToIDs;
    private static todoGetPrimitiveTypenope;
    private static updateSuperClasses;
    private static fixNamingConflicts;
    static parseM2Model(json: Json, filename: string | undefined): DModelElement[];
    static parseM2Model_old(json: Json, filename: string | undefined): DModelElement[];
    static parseM1Model(json: Json, meta?: LModel, filename?: string): DModelElement[];
    static getobjectmetaclass(json: Json, metaSuperClass: LClass): LClass;
    static findBestMatch(m2classes: Dictionary<Pointer<DClass>, {
        l: LClass;
    } & Dictionary<DocString<"feature name">, LTypedElement["type"]>>, json: Dictionary<DocString<"feature name">, any>): LClass;
    static parseDObject(json: Json, parent: DModel | DValue, parentType: typeof DModel | typeof DValue, meta: LClass | undefined, generated: DModelElement[]): DModelElement[];
    private static parseDValue;
    static parseDAnnotation(parent: DModelElement, json: Json, generated: DModelElement[], fullnamePrefix: string): DModelElement[];
    static parseRootPackage(parent: DModel, json: Json, generated: DModelElement[]): DModelElement[];
    static parseSubPackage(parent: DPackage, json: Json, generated: DModelElement[], fullnamePrefix: string): DModelElement[];
    static parseDClass(parent: DPackage, json: Json, generated: DModelElement[], fullnamePrefix: string): DModelElement[];
    static parseDEnum(parent: DPackage, json: Json, generated: DModelElement[], fullnamePrefix: string): DModelElement[];
    static parseDEnumLiteral(parent: DEnumerator, json: Json, generated: DModelElement[], fullnamePrefix: string): DModelElement[];
    static parseDAttribute(parent: DClass, json: Json, generated: DModelElement[], fullnamePrefix: string): DModelElement[];
    static parseDReference(parent: DClass, json: Json, generated: DModelElement[], fullnamePrefix: string): DModelElement[];
    static parseDParameter(parent: DOperation, json: Json, generated: DModelElement[], fullnamePrefix: string): DModelElement[];
    static parseDOperation(parent: DClass, json: Json, generated: DModelElement[], fullnamePrefix: string): DModelElement[];
    static XMLinlineMarker: string;
    static classTypePrefix: string;
    private static getSubPackages;
    private static getAnnotations;
    private static getDetails;
    private static getChildren;
    private static read;
    static write(json: Json, field: string, val: string | any[]): string | any[];
    private static getEcoreTypeName;
}
export declare enum AccessModifier {
    public = "public",
    private = "private",
    protected = "protected",
    internal = "internal",
    package = "package",
    protectedinternal = "protected internal",
    protectedprivate = "protected private"
}
export declare class ECoreRoot {
    static ecoreEPackage: string;
}
export declare class ECoreAnnotation {
    static source: string;
    static references: string;
    static details: string;
}
export declare class ECoreNamed {
    static namee: string;
}
export declare class ECoreDetail {
    static key: string;
    static value: string;
}
export declare class ECoreSubPackage {
    static eSubpackages: string;
    static eAnnotations: string;
    static eClassifiers: string;
    static nsURI: string;
    static nsPrefix: string;
    static namee: string;
}
export declare class ECorePackage extends ECoreSubPackage {
    static eAnnotations: string;
    static eSubpackages: string;
    static eClassifiers: string;
    static xmlnsxmi: string;
    static xmlnsxsi: string;
    static xmiversion: string;
    static xmlnsecore: string;
    static nsURI: string;
    static nsPrefix: string;
    static namee: string;
}
export declare class ECoreClass {
    static eAnnotations: string;
    static eStructuralFeatures: string;
    static xsitype: string;
    static namee: string;
    static eOperations: string;
    static instanceTypeName: string;
    static eSuperTypes: string;
    static abstract: string;
    static interface: string;
}
export declare class ECoreEnum {
    static eAnnotations: string;
    static xsitype: string;
    static namee: string;
    static instanceTypeName: string;
    static serializable: string;
    static eLiterals: string;
}
export declare class EcoreLiteral {
    static eAnnotations: string;
    static namee: string;
    static value: string;
    static literal: string;
}
export declare class ECoreReference {
    static eAnnotations: string;
    static xsitype: string;
    static eType: string;
    static containment: string;
    static upperbound: string;
    static lowerbound: string;
    static namee: string;
}
export declare class ECoreAttribute {
    static eAnnotations: string;
    static xsitype: string;
    static eType: string;
    static namee: string;
    static lowerbound: string;
    static upperbound: string;
}
export declare class ECoreOperation {
    static eAnnotations: string;
    static eType: string;
    static eexceptions: string;
    static upperBound: string;
    static lowerBound: string;
    static unique: string;
    static ordered: string;
    static namee: string;
    static eParameters: string;
}
export declare class ECoreParameter {
    static eAnnotations: string;
    static namee: string;
    static ordered: string;
    static unique: string;
    static lowerBound: string;
    static upperBound: string;
    static eType: string;
}
export declare class ECoreObject {
    static xmlns_xmi: string;
    static xmlns_uri: never;
    static xmi_version: string;
}
export declare class XMIModel {
    static type: string;
    static namee: string;
}
export {};
