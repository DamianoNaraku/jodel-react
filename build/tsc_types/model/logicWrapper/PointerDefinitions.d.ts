import { DStructuralFeature } from "../../joiner";
import type { Pointer, PrimitiveType, DModelElement, DGraphElement, DModel, DPackage, DClass, DEnumerator, DEnumLiteral, DOperation, DAttribute, DReference, DObject, DValue, DParameter, DAnnotation, DClassifier, DVertex, DEdge, DGraph, DEdgePoint } from "../../joiner";
declare class CommonStuff {
    name: string;
}
export declare class ModelPointers extends CommonStuff {
    id: Pointer<DAnnotation>;
    parent?: this["father"][];
    father?: Pointer<DModelElement>;
    annotations?: Pointer<DAnnotation>[];
    roots: Pointer<DObject>[];
    objects: Pointer<DObject>[];
    packages: Pointer<DPackage>[];
    models: Pointer<DModel>[];
    instanceof: Pointer<DModel>;
}
export declare class AnnotationPointers extends CommonStuff {
    id: Pointer<DAnnotation>;
    parent?: this["father"][];
    father?: Pointer<DModelElement>;
    annotations?: Pointer<DAnnotation>[];
}
export declare class PackagePointers extends CommonStuff {
    id: Pointer<DPackage>;
    parent?: this["father"][];
    father?: Pointer<DPackage> | Pointer<DModel>;
    annotations?: Pointer<DAnnotation>[];
}
export declare class OperationPointers extends CommonStuff {
    id: Pointer<DOperation>;
    parent?: this["father"][];
    father?: Pointer<DClass>;
    annotations?: Pointer<DAnnotation>[];
    type?: Pointer<DClassifier>;
    exceptions: Pointer<DClassifier>;
    parameters: Pointer<DParameter>;
}
export declare class ParameterPointers extends CommonStuff {
    id: Pointer<DParameter>;
    parent?: this["father"][];
    father?: Pointer<DOperation>;
    annotations?: Pointer<DAnnotation>[];
    type?: Pointer<DClassifier>;
}
export declare class ReferencePointers extends CommonStuff {
    id: Pointer<DReference>;
    parent: this["father"][];
    father: Pointer<DClass>;
    annotations: Pointer<DAnnotation>[];
    type: Pointer<DClass>;
    instances: Pointer<DValue>[];
    defaultValue: Pointer<DObject>[];
    opposite?: Pointer<DReference>;
    target: Pointer<DClass>[];
    edges: Pointer<DEdge>[];
}
export declare class AttributePointers extends CommonStuff {
    id: Pointer<DAttribute>;
    parent: this["father"][];
    father: Pointer<DClass>;
    annotations: Pointer<DAnnotation>[];
    type: Pointer<DClass>;
    instances: Pointer<DValue>[];
    defaultValue: PrimitiveType[];
}
export declare class LiteralPointers extends CommonStuff {
    id: Pointer<DEnumLiteral>;
    parent: this["father"][];
    father: Pointer<DEnumerator>;
    annotations: Pointer<DAnnotation>[];
}
export declare class ClassPointers extends CommonStuff {
    id: Pointer<DClass>;
    parent: this["father"][];
    father: Pointer<DPackage>;
    annotations: Pointer<DAnnotation>[];
    defaultValue?: Pointer<DObject>[];
    instances?: Pointer<DObject>[];
    operations?: Pointer<DOperation>[];
    features?: Pointer<DStructuralFeature>[];
    references?: Pointer<DReference>[];
    attributes?: Pointer<DAttribute>[];
    referencedBy?: Pointer<DReference>[];
    extends?: Pointer<DClass>[];
    extendedBy?: Pointer<DClass>[];
    implements?: Pointer<DClass>[];
    implementedBy?: Pointer<DClass>[];
}
export declare class EnumPointers extends CommonStuff {
    id: Pointer<DEnumerator>;
    parent: this["father"][];
    father: Pointer<DPackage>;
    annotations: Pointer<DAnnotation>[];
    literals: Pointer<DEnumLiteral>[];
}
export declare class ObjectPointers extends CommonStuff {
    id: Pointer<DObject>;
    parent?: this["father"][];
    father?: Pointer<DValue> | Pointer<DModel>;
    annotations: Pointer<DAnnotation>[];
    instanceof: Pointer<DClass>;
    features: Pointer<DValue>[];
}
export declare class ValuePointers extends CommonStuff {
    id: Pointer<DValue>;
    parent?: this["father"][];
    father?: Pointer<DObject>;
    annotations?: Pointer<DAnnotation>[];
    instanceof: Pointer<DAttribute> | Pointer<DReference>;
    edges: Pointer<DEdge>[];
    values: Pointer<DObject>[];
}
export declare class GraphPointers extends CommonStuff {
    id: Pointer<DGraph>;
    father: Pointer<DGraphElement>;
    graph: Pointer<DGraph>;
    model: Pointer<DModelElement>;
    subElements: Pointer<DGraphElement>[];
}
export declare class VertexPointers extends CommonStuff {
    id: Pointer<DVertex>;
    father: Pointer<DGraphElement>;
    graph: Pointer<DGraph>;
    model: Pointer<DModelElement>;
    subElements: Pointer<DGraphElement>[];
}
export declare class EdgePointers extends CommonStuff {
    id: Pointer<DEdge>;
    father: Pointer<DGraphElement>;
    graph: Pointer<DGraph>;
    model: Pointer<DModelElement>;
    subElements: Pointer<DGraphElement>[];
    midnodes: Pointer<DEdgePoint>[];
    start: Pointer<DGraphElement>;
    end: Pointer<DGraphElement>;
}
export {};
