/// <reference types="jquery" />
import { ReactNode } from "react";
import * as _pr_json2xml from '../common/libraries/prj_json2xml.js';
import * as _pr_xml2json from '../common/libraries/prj_xml2json.js';
import type { DocString } from './types';
import type { U as UType } from "../common/U";
export declare const $: JQueryStatic;
export declare const prjson2xml: typeof _pr_json2xml;
export declare const prxml2json: typeof _pr_xml2json;
export type { GetPath } from './proxy';
export type { Subtract, Class, Empty, Json, GObject, bool, Dictionary, Proxyfied, Temporary, RawObject, NotFoundv, NotFound, DocString, nbool, nnumber, nstring, Nullable, TODO, UnixTimestamp, UObject, IsActually, Function, Function2, InOutParam, unArr, orArr, PrimitiveType, CClass, NonEmptyString, Overlap, Info, Constructor, AbstractConstructor, ApiResponse } from "./types";
export type { Pointer, PtrString, getWParams, WUser, WProject, WtoD, WtoL, DtoW, LtoW, LtoD, DtoL, PackArr, Pack, Pack1 } from "./classes";
export type { WAnnotation, WNamedElement, WFactory_useless_, WClass, WAttribute, WClassifier, WDataType, WMap, WModel, WModelElement, WEnumerator, WObject, WPackage, WOperation, WValue, WParameter, WReference, WTypedElement, WEnumLiteral, WStructuralFeature, ValueDetail, SetValueAtPositionInfoType } from "../model/logicWrapper/LModelElement";
export type { WEdge, WEdgePoint, WExtEdge, WGraph, WRefEdge, WGraphElement, WVoidEdge, WGraphVertex, WVertex, WVoidVertex, EdgeSegment, EdgeFillSegment } from "../model/dataStructure/GraphDataElements";
export type { PackagePointers, EdgePointers, AnnotationPointers, AttributePointers, EnumPointers, ClassPointers, LiteralPointers, OperationPointers, ObjectPointers, GraphPointers, ParameterPointers, ReferencePointers, VertexPointers, ModelPointers, } from "../model/logicWrapper/PointerDefinitions";
export { windoww, EdgeBendingMode, EdgeGapMode, EMeasurableEvents } from './types';
export { GraphElementStatee, GraphElementDispatchProps, GraphElementReduxStateProps, GraphElementOwnProps, EdgeStateProps, EdgeOwnProps } from "../graph/graphElement/sharedTypes/sharedTypes";
export { Constructors, JsType, RuntimeAccessibleClass, DPointerTargetable, LPointerTargetable, WPointerTargetable, MyError, RuntimeAccessible, Obsolete, Leaf, Node, Abstract, Instantiable, MixOnlyFuncs, LUser, DUser, DProject, LProject, Pointers, PointedBy, PendingPointedByPaths, CoordinateMode, EdgeHead, EGraphElements, EModelElements, transientProperties, ViewEClassMatch } from "./classes";
export { getPath, TargetableProxyHandler, MyProxyHandler, MapProxyHandler, LogicContext, MapLogicContext } from './proxy';
export { Uarr, DDate, ParseNumberOrBooleanOptions, myFileReader, Keystrokes, ShortAttribETypes, AttribETypes, FileReadTypeEnum, FocusHistoryEntry, SelectorOutput, toShortEType, toLongEType, ShortAttribSuperTypes, } from "../common/U";
export { DV } from '../common/DV';
export { Defaults } from '../common/Defaults';
export { Size, GraphSize, GraphPoint, IPoint, ISize, Point } from "../common/Geom";
export { CSSRuleSorted, CSSParser, TagNames } from "../common/Uhtml";
export declare const Log: any;
export { UX } from "../common/UX";
export declare var U: typeof UType;
export { DLog } from "../model/classes/D";
export { LLog } from "../model/classes/L";
export { EcoreParser, AccessModifier, IStorage, LocalStorage, XMIModel, ECoreRoot, ECoreAnnotation, ECoreNamed, ECoreDetail, ECorePackage, ECoreSubPackage, ECoreClass, ECoreEnum, ECoreAttribute, ECoreReference, EcoreLiteral, ECoreOperation, ECoreParameter, ECoreObject, } from "../api/data";
export { DModelElement, LModelElement, DModel, LModel, DValue, LValue, DNamedElement, LNamedElement, DObject, LObject, DEnumerator, LEnumerator, DEnumLiteral, LEnumLiteral, DAttribute, LAttribute, DReference, LReference, DStructuralFeature, LStructuralFeature, DClassifier, LClassifier, DDataType, LDataType, DClass, LClass, DParameter, LParameter, DOperation, LOperation, DPackage, LPackage, DTypedElement, LTypedElement, DAnnotation, LAnnotation, EJavaObject, DFactory_useless_, LFactory_useless_, DMap, LMap } from "../model/logicWrapper/LModelElement";
export { DExtEdge, DRefEdge, DVoidEdge, LGraphVertex, LRefEdge, LEdgePoint, DVoidVertex, DGraphVertex, DEdgePoint, DVertex, DEdge, LVertex, LGraph, DGraph, LVoidVertex, LVoidEdge, LEdge, LGraphElement, LExtEdge, DGraphElement, packageDefaultSize } from "../model/dataStructure/GraphDataElements";
export type { WViewElement, WViewTransientProperties } from "../view/viewElement/view";
export { DViewTransientProperties, LViewTransientProperties, LViewElement, DViewElement } from "../view/viewElement/view";
export { DViewPoint, LViewPoint } from "../view/viewPoint/viewpoint";
export { Action, CreateElementAction, DeleteElementAction, SetFieldAction, SetRootFieldAction, CompositeAction, ParsedAction, LoadAction, CombineHistoryAction, RedoAction, UndoAction, TRANSACTION, BEGIN, ABORT, END } from "../redux/action/action";
export { DState, LState, ModelStore, ViewPointState, statehistory } from "../redux/store";
export { GraphDragManager } from "../graph/graphElement/GraphDragHandler";
export { Selectors } from "../redux/selectors/selectors";
export { reducer, stateInitializer } from "../redux/reducer/reducer";
export { store } from "../redux/createStore";
export { Debug } from "../debugtools/debug";
export { OCL } from "../ocl/ocl";
declare class JSXT_TYPE {
    fromString(str: string, options?: {
        factory: string;
        spreadFn?: Function;
        unknownTagPattern?: string;
        passUnknownTagsToFactory?: boolean;
        unknownTagsAsString?: boolean;
        arrayChildren?: boolean;
    }): DocString<ReactNode, 'compiled code as string, like React.CreateElement(...)'>;
    fromFile(path: string, options?: {
        factory: string;
        spreadFn?: Function;
        unknownTagPattern?: string;
        passUnknownTagsToFactory?: boolean;
        unknownTagsAsString?: boolean;
        arrayChildren?: boolean;
    }): DocString<ReactNode, 'compiled code as string, like React.CreateElement(...)'>;
    browserifyTransform(...params: any): any;
    visitor: unknown;
}
export declare const JSXT: JSXT_TYPE;
export declare type Event = JQuery.Event;
export declare type EventBase = JQuery.EventBase;
export declare type EventHandlerBase<T1, T2> = JQuery.EventHandlerBase<T1, T2>;
export declare type MouseEventBase = JQuery.MouseEventBase;
export declare type MouseUpEvent = JQuery.MouseUpEvent;
export declare type ChangeEvent = JQuery.ChangeEvent;
export declare type ContextMenuEvent = JQuery.ContextMenuEvent;
export declare type ClickEvent = JQuery.ClickEvent;
export declare type MouseDownEvent = JQuery.MouseDownEvent;
export declare type BlurEvent = JQuery.BlurEvent;
export declare type KeyDownEvent = JQuery.KeyDownEvent;
export declare type KeyPressEvent = JQuery.KeyPressEvent;
export declare type DoubleClickEvent = JQuery.DoubleClickEvent;
export declare type DragEndEvent = JQuery.DragEndEvent;
export declare type DragEnterEvent = JQuery.DragEnterEvent;
export declare type DragEvent = JQuery.DragEvent;
export declare type DragExitEvent = JQuery.DragExitEvent;
export declare type DragLeaveEvent = JQuery.DragLeaveEvent;
export declare type DragOverEvent = JQuery.DragOverEvent;
export declare type DragStartEvent = JQuery.DragStartEvent;
export declare type DropEvent = JQuery.DropEvent;
export declare type FocusEvent = JQuery.FocusEvent;
export declare type FocusInEvent = JQuery.FocusInEvent;
export declare type FocusOutEvent = JQuery.FocusOutEvent;
export declare type FocusEventBase = JQuery.FocusEventBase;
export { GraphElements, Graphs, Vertexes, Edges, Fields } from './components';
export { TextArea, Select, Input, Edge, // Image,
GraphsContainerComponent, Overlap as OverlapComponent, GraphsContainer, GraphElement, Vertex, VoidVertex, EdgePoint, Graph, GraphVertex, Field, DefaultNode, GraphElementComponent, VertexComponent, DefaultNodeComponent, EdgeComponent, DataOutputComponent, LoggerComponent, GenericInput, Polygon, Circle, Cross, Decagon, Asterisk, Ellipse, Enneagon, Hexagon, Nonagon, Octagon, Heptagon, Pentagon, Rectangle, Septagon, Square, Star, SimpleStar, DecoratedStar, Trapezoid, Triangle } from './components';
export { fakeExport } from './ExecuteOnRead';
