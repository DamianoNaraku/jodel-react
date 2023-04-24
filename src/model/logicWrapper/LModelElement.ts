import {
    BEGIN,
    Constructor,
    Constructors,
    CreateElementAction,
    DEdge, DeleteElementAction,
    Dictionary,
    DPointerTargetable,
    DtoL,
    END,
    getWParams,
    GObject,
    IStore,
    Leaf,
    LEdge,
    LGraphElement,
    Log,
    LogicContext,
    LPointerTargetable,
    Node,
    Pack,
    Pack1,
    PackArr,
    PointedBy,
    Pointer,
    Pointers,
    RuntimeAccessible,
    Abstract,
    Instantiable,
    RuntimeAccessibleClass,
    Selectors,
    SetFieldAction,
    SetRootFieldAction,
    ShortAttribETypes,
    ShortAttribSuperTypes,
    store,
    TargetableProxyHandler,
    U,
    unArr,
    WPointerTargetable
} from "../../joiner";
import {Json, PrimitiveType} from "../../joiner/types";

import {
    AccessModifier,
    ECoreAnnotation,
    ECoreAttribute,
    ECoreClass,
    ECoreEnum,
    EcoreLiteral,
    ECoreOperation,
    ECorePackage,
    EcoreParser,
    ECoreReference,
    ECoreRoot
} from "../../api/data";


@Node
@RuntimeAccessible
export class DModelElement extends DPointerTargetable{
    // static _super = DPointerTargetable;
    // static logic: typeof LModelElement;
    // static structure: typeof DModelElement;
    // static singleton: LModelElement;
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];

    id!: Pointer<DModelElement, 1, 1, LModelElement>;
    parent: Pointer<DModelElement, 0, 'N', LModelElement> = [];
    father!: Pointer<DModelElement, 1, 1, LModelElement>;
    annotations: Pointer<DAnnotation, 0, 'N', LAnnotation> = [];

    public static new(): DModelElement {
        Log.exx("DModelElement is abstract, cannot instantiate");
        return null as any;
        //return new Constructors(new DModelElement('dwc')).DPointerTargetable().DModelElement().end();
    }
}

@Leaf
@RuntimeAccessible
export class DAnnotationDetail extends DPointerTargetable{
    // todo
}

/*
type Pack1<D extends DPointerTargetable, L extends LPointerTargetable = DtoL<D>, P extends Pointer<D, 0, 1, L> = Pointer<D, 0, 1, L>, R = {D:D, L:L, P:P} > = P|D|L
type PackArr<D extends DPointerTargetable, L extends LPointerTargetable = DtoL<D>, P extends Pointer<D, 0, 1, L> = Pointer<D, 0, 1, L> , ARR = Pack1<D>> = (ARR)[];
type Pack<D extends DPointerTargetable, L extends LPointerTargetable = DtoL<D>, P extends Pointer<D, 0, 1, L> = Pointer<D, 0, 1, L> , ARR = Pack1<D>> = ARR | (ARR)[];*/


@Abstract
@RuntimeAccessible
export class LModelElement<Context extends LogicContext<DModelElement> = any, D extends DModelElement = DModelElement> extends LPointerTargetable {
    // extends Mixin(DModelElement0, LPointerTargetable)
    // static logic: typeof LModelElement;
    // static structure: typeof DModelElement;
    // static singleton: LModelElement;
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    /*static ResolvePointer = resolvePointerFunction;
    private static ResolvePointers? = resolvePointersFunction;
    private resolvePointer<T extends DPointerTargetable = DPointerTargetable, LB extends number = 0, UB extends number = 0, RET extends LPointerTargetable = LPointerTargetable>(ptr: Pointer<T, LB, UB, RET>): RET | null {
        return LModelElement.ResolvePointer(ptr); }
    private resolvePointers<T extends DPointerTargetable = DPointerTargetable, LB extends number = 0, RET extends LPointerTargetable = LPointerTargetable>(ptr: Pointer<T, LB, 'N', RET>)
        : (RET | null)[] { return resolvePointersFunction(ptr); }
    */
    public __raw!: DModelElement;
    id!: Pointer<DModelElement, 1, 1, LModelElement>;
    parent!: LModelElement[];
    father!: LModelElement; // annotations can be childrens of everything. except them fathers are: Model, Package, Classifier(class+enum), Operation
    annotations!: LAnnotation[];
    childrens!: (LPackage | LClassifier | LTypedElement | LAnnotation | LObject | LValue)[];
    nodes!: LGraphElement[];
    node!: LGraphElement | null;

    // utilities to go up in the tree (singular names)
    model!: LModel; // utility, follow father chain until get a Model parent or null
    package!: LPackage | null;
    class!: LClass | null;
    enum!: LEnumerator | null;
    operation!: LOperation | null;
    subNodes!: LGraphElement[] | null;




    property!: keyof DModelElement;
    containers!: LNamedElement[]; // list of fathers until the model is reached.

    public generateEcoreJson(loopDetectionloopDetectionObj: Dictionary<Pointer, DModelElement> = {}): Json { throw new Error("cannot be called directly, should trigger getter. this is only for correct signature"); }
    private get_generateEcoreJson(context: Context): (loopdetectionobj: Dictionary<Pointer, DModelElement>) => Json { return (loopdetectionobj) => this.generateEcoreJson_impl(context, loopdetectionobj); }
    protected generateEcoreJson_impl(context: Context, loopDetectionObj?: Dictionary<Pointer, DModelElement>): Json{ return Log.exDevv("generateEcoreJson() should be overridden", context); }

    public duplicate(deep: boolean = true): this { return this.cannotCall( this.constructor.name + "duplicate() class is abstract"); }

    public addAnnotation(source?: DAnnotation["source"], details?: DAnnotation["details"]): DAnnotation { return this.cannotCall("addAnnotation"); }
    protected get_addAnnotation(context: Context): this["addAnnotation"] {
        return (source?: DAnnotation["source"], details?: DAnnotation["details"]) => DAnnotation.new(source, details, context.data.id, true); }

    protected set_containers(): boolean { return this.cannotSet('containers'); }
    protected get_containers(context: Context): LModelElement["containers"]{
        let thiss: LModelElement = context.proxyObject;
        const ret: LModelElement[] = [thiss];
        while (true) {
            thiss = thiss.father;
            if (!thiss) break;
            ret.push(thiss);
        }
        return ret as LNamedElement[];
    }


    protected get_namespace(context: Context): string { throw new Error("?? get namespace ?? todo"); return ""; }

    protected get_subNodes(context: LogicContext<LClass>, includingthis: boolean = false): LGraphElement[] {
        const lclass: LClass = context.proxyObject as any;
        let $class = $('[data-dataid="' + context.data.id + '"]');
        let $subnodes = $class.find('[data-nodeid]');
        function mapfunc(this: HTMLElement) { return this.dataset.nodeid; }
        let nodehtmlarr: HTMLElement[] = $subnodes.toArray();
        if (includingthis) nodehtmlarr.push($class[0]);
        let nodeidarr: string[] = nodehtmlarr.map( (html: HTMLElement) => html.dataset.nodeid ) as string[];
        let state = store.getState();
        let dnodes = nodeidarr.map( id => state.idlookup[id]).filter( (d) => !!d);
        return dnodes.map( d => LPointerTargetable.wrap(d)) as any;
    }


    // name -> redux (es. DClass -> classs)
    protected get_property(context: Context): this["property"]{
        return (context.data.className.substring(1) + "s").toLowerCase() as any;
    }
    protected targetRemoved(context: Context, field: keyof DPointerTargetable): void {
        context.proxyObject.delete();
    }

    public fatherList(): LModelElement[]{ return this.cannotCall("fatherList()"); }
    protected get_fatherList(context: Context): LModelElement[]{
        let current = this.get_father(context);
        let ret: LModelElement[] = [current];
        while (true) {
            let father = current.father;
            if (!father || father === current) break;
            current = father;
            ret.push(current);
        }
        return ret;
    }

    public superDelete(): void {}
    protected get_superDelete(context: Context): () => void {
        const data = context.proxyObject;
        const father = data.father.__raw;
        const fatherFieldName = U.getFatherFieldToDelete(data);
        const reduxFieldName = U.getReduxFieldToDelete(data);
        const ret = () => {
            if(fatherFieldName) {
                const fatherField: Pointer<DModelElement, 0, 'N', LModelElement> = father[fatherFieldName] as Pointer<DModelElement, 0, 'N', LModelElement>;
                SetFieldAction.new(father, fatherFieldName, fatherField.indexOf(data.id), '-=', true);
            }
            if(reduxFieldName) {
                const state = Selectors.getState();
                const reduxField: Pointer<DModelElement, 0, 'N', LModelElement> = state[reduxFieldName];
                SetRootFieldAction.new(reduxFieldName, reduxField.indexOf(data.id), '-=', true);
            }
            if(data.childrens) { for(let child of data.childrens) { child.delete(); } }
            DeleteElementAction.new(data.id);
        };
        return ret;
    }


    protected get_delete(context: Context): () => void {
        const ret = () => { context.proxyObject.superDelete(); }
        return ret;
    }


    // @ts-ignore
    private get_until_parent<D extends Constructor, L extends DtoL<InstanceType<D>>>(l: LModelElement, d: DModelElement, father: D): L | null {
        while (true) {
            // console.log('get_until_parent', {l, d, father}, {dname: d.className, fname: father.name});
            if (d.className === father.name) return l as L;
            l = l.father;
            let oldd = d;
            d = l.__raw;
            if (oldd === d) return null; // reached end of father chain (a model) without finding the desired parent.
        }
    }

    protected get_nodes(context: Context): LGraphElement[] {
        const nodes: LGraphElement[] = [];
        const nodeElements = $('[data-dataid="' + context.data.id + '"]');
        for (let nodeElement of nodeElements) {
            const nodeId = nodeElement.id;
            if(nodeId) {
                const lNode: LGraphElement | undefined = LPointerTargetable.wrap(nodeId);
                if (lNode) nodes.push(lNode);
            }
        }
        return nodes;
    }

    protected get_node(context: Context): LGraphElement|null {
        const nodes = context.proxyObject.nodes;
        const node = (nodes.length > 0) ? nodes[0] : null;
        return node;
    }

    /*
    protected get_nodes(context: Context): this["nodes"] {
        return context.data.nodes.map((pointer) => {
            return LPointerTargetable.from(pointer)
        });
    }
    protected set_nodes(val: PackArr<this["nodes"]>, context: Context): boolean {
        const list = val.map((lItem) => { return Pointers.from(lItem) });
        SetFieldAction.new(context.data, 'nodes', list);
        return true;
    }
    */

    protected get_model(context: Context): LModel { return this.get_until_parent(context.proxyObject, context.data, DModel) as LModel; }
    protected get_package(context: Context): LPackage { return this.get_until_parent(context.proxyObject, context.data, DPackage) as LPackage; }
    protected get_class(context: Context): LClass | null { return this.get_until_parent(context.proxyObject, context.data, DClass); } // todo: might be better for pergormance to erase this universal method and add implementations to every single L-class counting the correct amount of "father" navigations for each ( attrib to package? use attrib.father.father)
    protected get_operation(context: Context): LOperation | null { return this.get_until_parent(context.proxyObject, context.data, DOperation); }
    protected get_enum(context: Context): LEnumerator | null { return this.get_until_parent(context.proxyObject, context.data, DEnumerator); }

    protected get_father(context: Context): LModelElement { return LPointerTargetable.from(context.data.father); }
    protected get_childrens_idlist(context: Context): Pointer<DAnnotation | DPackage | DClassifier | DEnumerator | DEnumLiteral | DParameter | DStructuralFeature | DOperation | DObject | DValue, 1, 'N'>  { // LPackage | LClassifier | LTypedElement | LAnnotation | LEnumLiteral | LParameter | LStructuralFeature | LOperation
        return context.data.annotations ? [...context.data.annotations] : [];
    }
    protected get_childrens(context: Context): this["childrens"] {
        // return this.get_childrens_idlist(context).map(e => LPointerTargetable.from(e));
        return LPointerTargetable.from(this.get_childrens_idlist(context));
    }

    protected set_childrens(a: never, context: Context): boolean { return Log.exx('childrens is a derived read-only collection', this); }


    add_parent(val: Pack<this["parent"]>, logicContext: Context): boolean { // todo: when will be used?
        const ptr = Pointers.from(val);
        return SetFieldAction.new(logicContext.data, 'parent', ptr, '+=', true); // todo: need to update childrens of the old and new parents
    }

    protected remove_parent(logicContext: Context): boolean { // todo: perchè senza bersaglio? perchè sempre elimina tutti?
        return SetFieldAction.new(logicContext.data, 'parent', [], '', true);
    }

    protected get_parent(context: Context): this["parent"] {
        return LPointerTargetable.from(context.data.id);
    }

    protected set_parent(val: Pack<LAnnotation>, context: Context): boolean { // val: Pack<DModelElement>
        const ptrs = Pointers.from(val);
        SetFieldAction.new(context.data, 'father', ptrs?.[0] || ptrs, '', true);
        return SetFieldAction.new(context.data, 'parent', ptrs, '', true);
    }

    add_annotation(val: Pack<this["annotations"]>, context: Context): boolean {
        const ptrs = Pointers.from(val);
        return SetFieldAction.new(context.data, 'annotations', ptrs, '+=', true);
    }

    remove_annotation(val: Pack<this["annotations"]>,  context: Context): boolean { // todo: when this will be ever used? this should be triggered by LObject but only get_ / set_ and delete of whole elements should be triggerable.
        //todo: remove as any
        const ptrs: Pointer<DAnnotation, 1, 'N', LAnnotation> = Pointers.from(val) as any;
        let indexes = ptrs.map( ptr => context.data.annotations.indexOf(ptr)).filter(p => p>=0);
        return SetFieldAction.new(context.data, 'annotations', indexes, '-=', true);
    }
    protected get_annotations(context: Context): this["annotations"] { return LPointerTargetable.fromPointer( context.data.annotations ); }

    protected set_annotations(val: Pack<LAnnotation>, context: Context): boolean {
        //  if (!Array.isArray(val)) val = [val];
        //         val = val.map( v => (v instanceof LAnnotation ? v.id : ( Pointers.filterValid(v) ? v : null ))) as Pointer<DAnnotation>[];
        const ptrs = Pointers.from(val);
        SetFieldAction.new(context.data, 'annotations', ptrs, '', true);
        return true;
    }

    protected get_addChild(context: Context): (type:string, ...params: any[]) => void { // just for add new, not for add pre-existing.
        console.log("addchild", context, this);
        return (type, ...args:any) => {
            let ret: (...params: any[]) => void = () => {};
            switch ((type || '').toLowerCase()){
                default: Log.ee('cannot find children type requested to add:', {type: (type || '').toLowerCase(), context}); break;
                case "attribute": ret = (this as any).get_addAttribute(context as any); break;
                case "class": ret = (this as any).get_addClass(context as any); break;
                case "package": ret = (this as any).get_addPackage(context as any); break;
                case "reference": ret = (this as any).get_addReference(context as any); break;
                case "enumerator": ret = (this as any).get_addEnumerator(context as any); break;
                case "literal": ret = (this as any).get_addLiteral(context as any); break;
                case "operation": ret = (this as any).get_addOperation(context as any); break;
                case "parameter": ret = (this as any).get_addParameter(context as any); break;
                //case "exception": ret = ((exception: Pack1<LClassifier>) => { let rett = this.get_addException(context as any); rett(exception); }) as any; break;
                case "exception": ret = (this as any).get_addException(context as any); break;
            }
            return ret(...args);
        }
    }
    /*
        protected get_addPackage(context: Context): (() => void) {
            let ret = () => {};
            switch (context.data?.className) {
                default: break;
                case "DModel": ret = () => LModelElement.addPackage(context.data as DModel); break;
                case "DPackage": ret = () => LModelElement.addSubPackage(context.data as DPackage); break;
            }
            ret();
            return ret;
        }

        private static addPackage(dModel: DModel): void {
            const lModel: LModel = LModelElement.from(dModel);
            let name = 'package_' + 0;
            let childrenNames: (string)[] = lModel.packages.map( p => p.name);
            name = U.increaseEndingNumber(name, false, false, (newName) => childrenNames.indexOf(newName) >= 0)
            const dPackage = DPackage.new(name);
            CreateElementAction.new(dPackage);
            let wModel = WPointerTargetable.fromD(dModel);
            wModel.packages = [...dModel.packages, dPackage];
        }

        private static addSubPackage_obsolete(dPackage: never): void {
            const lPackage: LPackage = LPackage.from(dPackage);
            let name = 'subpackage_' + 0;
            let childrenNames: (string)[] = lPackage.childrens.map( p => (p as LPackage).name);
            name = U.increaseEndingNumber(name, false, false, (newName) => childrenNames.indexOf(newName) >= 0)
            const dSubPackage = DPackage.new(name);
            CreateElementAction.new(dSubPackage);
            let wPackage = WPointerTargetable.fromD(dPackage);
            wPackage.subpackages = [...dPackage.subpackages, dSubPackage];
        }*/

    protected get_addException(context: Context): () => void {
        let ret = () => {};
        const dOperation: DOperation | null = (context.data?.className === "DOperation") ? context.data as DOperation : null;
        if (dOperation) {
            const dClass = DPointerTargetable.from(dOperation.father);
            ret = () => {
                SetFieldAction.new(dOperation, "exceptions", dClass.id, '+=', true);
            }
        }
        ret();
        return ret;
    }

    // activated by user in JSX
    // todo: this.wrongAccessMessage("addClass");
    protected cannotCall(name: string, ...params: string[]): any {
        Log.exDevv(name + ' should never be called directly, but should trigger get_' + name + '(' + params.join(', ') +'), this is only a signature for type checking.'); }
    public addClass(): void { this.cannotCall('addClass'); }
    public addAttribute(): void { this.cannotCall('addAttribute'); }
    public addReference(): void { this.cannotCall('addReference'); }
    public addEnumerator(): void { this.cannotCall('addEnumerator'); }
    public addParameter(): void { this.cannotCall('addParameter'); }
    // chiedere al prof: cosa può lanciato come eccezione: se tutte le classi o se solo quelle che estendono Exception
    public addException(exception?: DClassifier): () => void { throw this.wrongAccessMessage("AddException"); }
    public addChild(type: string): void { this.cannotCall("addChild, it's obsolete call specific adders", type); }

}

/*function isValidPointer<T extends DPointerTargetable = DModelElement, LB extends number = 0, UB extends number = 1, RET extends LPointerTargetable = LModelElement>
(p: Pointer<T, LB, UB, RET>, constraintType?: typeof DPointerTargetable): boolean {
    const pointerval: RET | null = LModelElement.ResolvePointer(p);
    if (!pointerval) return false;
    if (!constraintType) return true;
    return (pointerval instanceof constraintType); }*/

/* todo:
nel proxy aggiungi regola di default, se prendi qualcosa che inizia con "set_X" esplicitamente (dovrebbe farlo solo il dev)
richiama _set_X(context, ...params)     <---- nuova funzione set di default, anche this.x = x richiama _set_x

il dev specifica set_x come public di sola firma senza implementazione (throw exception) e senza context
il dev specifica _set_x come implementazione private

per la get esiste solo _get_x, non "get_x"

 todo2: aggiungi readonly a tutti i campi L per non sbagliarsi e fare in modo che il dev usi sempre i "set_" che sono correttamente tipizzati
*
* */

/*todo:
* for every feature X: typed L, in CLASS_L0 with a side effects when they are edited (like need to update other data for consistency)
*
* dev will use this
* protected set_X(val: D | L | Pointer<D> ) { throw new Error("set_X should never be executed, the proxy should redirect to get_set_X."); }
* protected get_set_X( val: D | L | Pointer<D>, otherparams, ContextD>) { throw new Error("set_X should never be executed, the proxy should redirect to get_set_X."); }
*
*
* */
// @RuntimeAccessible export class _WModelElement extends LModelElement { }
// export type WModelElement = DModelElement | LModelElement | _WModelElement;
DPointerTargetable.subclasses.push(DModelElement);
DPointerTargetable.subclasses.push(LModelElement);





@Leaf
@RuntimeAccessible
export class DAnnotation extends DModelElement { // extends Mixin(DAnnotation0, DModelElement)
    // static singleton: LAnnotation;
    // static logic: typeof LAnnotation;
    // static structure: typeof DAnnotation;
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    // inherit redefine
    id!: Pointer<DAnnotation, 1, 1, LAnnotation>;
    parent: Pointer<DModelElement, 0, 'N', LModelElement> = [];
    father!: Pointer<DModelElement, 1, 1, LModelElement>;
    annotations: Pointer<DAnnotation, 0, 'N', LAnnotation> = [];
    // personal
    source!: string;
    details!: DAnnotationDetail[];//Dictionary<string, string>;

    public static new(source?: DAnnotation["source"], details?: DAnnotation["details"], father?: Pointer, persist: boolean = true): DAnnotation {
        // if (!name) name = this.defaultname("annotation ", father);
        return new Constructors(new DAnnotation('dwc'), father, persist, undefined).DPointerTargetable().DModelElement().DAnnotation(source, details).end();
    }
}

@Node
@RuntimeAccessible
export class LAnnotation<Context extends LogicContext<DAnnotation> = any, D extends DAnnotation = DAnnotation> extends LModelElement {
    // Mixin(DAnnotation0, LModelElement)
    // @ts-ignore
    __namee!: "LAnnotation" = "LAnnotation";
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    public __raw!: DAnnotation;
    id!: Pointer<DAnnotation, 1, 1, LAnnotation>;
    // static singleton: LAnnotation;
    // static logic: typeof LAnnotation;
    // static structure: typeof DAnnotation;

    // inherit redefine
    parent!: LModelElement[];
    father!: LModelElement;
    annotations!: LAnnotation[];
    // personal
    source!: string;
    details!: LAnnotationDetail[];// Dictionary<string, string> = {};

    protected generateEcoreJson_impl(context: Context, loopDetectionObj: Dictionary<Pointer, DModelElement> = {}): Json {
        loopDetectionObj[context.data.id] = context.data;
        const json: Json = {};
        EcoreParser.write(json, ECoreAnnotation.source, context.data.source);
        // EcoreParser.write(json, ECoreAnnotation.references, context.proxyObject.referencesStr);
        EcoreParser.write(json, ECoreAnnotation.details, context.proxyObject.details.map( d => d.generateEcoreJson(loopDetectionObj)));
        return json; }

    public duplicate(deep: boolean = true): this { return this.cannotCall( this.constructor.name + "duplicate()"); }
    protected get_duplicate(context: Context): ((deep?: boolean) => this) {
        return (deep: boolean = false) => {
            BEGIN()
            let de = context.proxyObject.father.addAnnotation(context.data.source, (deep ? context.proxyObject.details.map( ldet => ldet.duplicate().__raw ) : context.data.details));
            let le: this = LPointerTargetable.fromD(de);
            let we: WAnnotation = le as any;
            we.annotations = deep ? context.proxyObject.annotations.map(lchild => lchild.duplicate(deep).id) : context.data.annotations;
            END()
            return le; }
    }

    protected get_source(context: Context): this["source"] { return context.data.source; }
    protected set_source(val: this["source"], context: Context): boolean {
        SetFieldAction.new(context.data, 'source', val, '', false);
        return true;
    }
    protected get_details(context: Context): this["details"] { return TargetableProxyHandler.wrapAll(context.data.details); }
    protected set_details(val: this["details"], context: Context): boolean {
        SetFieldAction.new(context.data, 'details', val);
        return true;
    }
}

DModelElement.subclasses.push(DAnnotation);
LModelElement.subclasses.push(LAnnotation);

@Leaf
@RuntimeAccessible
export class LAnnotationDetail<Context extends LogicContext<DAnnotationDetail> = any> extends LModelElement{ // todo
    father!: LAnnotation;
    protected generateEcoreJson_impl(context: Context, loopDetectionObj: Dictionary<Pointer, DModelElement> = {}): Json {
        // loopDetectionObj[context.data.id] = context.data;
        const json: Json = {};
        // if (context.data.name !== null) EcoreParser.write(json, ECoreDetail.key, context.data.name);
        // if (context.data.value !== null) EcoreParser.write(json, ECoreDetail.value, context.data.value);
        return json; }
    public duplicate(deep: boolean = true): this { return this.cannotCall( this.constructor.name + "duplicate()"); }
    protected get_duplicate(context: Context): ((deep?: boolean) => this) {
        Log.exDevv("LAnnotationDetail.getDuplicate(): todo");
        return () => this;
        // return (deep: boolean = false) => (context.proxyObject as LAnnotationDetail).father.addAnnotationDetail( {...context.data._subMaps})
    }
}
DModelElement.subclasses.push(DAnnotationDetail);
LModelElement.subclasses.push(LAnnotationDetail);

@Node
@RuntimeAccessible
export class DNamedElement extends DPointerTargetable { // Mixin(DNamedElement0, DAnnotation)
    // static _super = DAnnotation;
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    // static singleton: LNamedElement;
    // static logic: typeof LNamedElement;
    // static structure: typeof DNamedElement;

    // inherit redefine
    id!: Pointer<DNamedElement, 1, 1, LNamedElement>;
    parent: Pointer<DModelElement, 0, 'N', LModelElement> = [];
    father!: Pointer<DModelElement, 1, 1, LModelElement>;
    annotations: Pointer<DAnnotation, 0, 'N', LAnnotation> = [];
    // personal
    name!: string;

    public static new(name?: DNamedElement["name"]): DNamedElement {
        Log.exx("DNamedElement is abstract, cannot instantiate");
        return null as any;
        // return new Constructors(new DNamedElement('dwc')).DPointerTargetable().DModelElement().DNamedElement(name).end();
    }

}

@Abstract
@RuntimeAccessible
export class LNamedElement<Context extends LogicContext<DNamedElement> = any> extends LModelElement { // Mixin(DNamedElement0, DAnnotation)
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    // public __raw!: DNamedElement;
    id!: Pointer<DNamedElement, 1, 1, LNamedElement>;
    // static singleton: LNamedElement;
    // static logic: typeof LNamedElement;
    // static structure: typeof DNamedElement;

    // inherit redefine
    parent!: LModelElement[];
    father!: LModelElement;
    annotations!: LAnnotation[];
    // personal
    name!: string;
    namespace!: string;
    fullname!:string;

    protected set_containers(): boolean { return this.cannotSet('containers'); }
    protected get_containers(context: Context): LNamedElement["containers"]{
        let thiss: LNamedElement = context.proxyObject;
        const ret: LNamedElement[] = [thiss];
        while (true) {
            thiss = thiss.father as LNamedElement;
            if (!thiss) break;
            ret.push(thiss);
        }
        return ret;
    }

    // protected get_namespace(context: Context): string { throw new Error("?? get namespace ?? todo"); return ""; }

    protected get_fullname(context: Context): this["fullname"] {
        const containers = this.get_containers(context);
        let fullname: string = containers.reverse().slice(1, containers.length).map(c => c.name).join('.');
        return fullname; }


    protected get_name(context: Context): this["name"] { return context.data.name; }
    protected set_name(val: this["name"],  context: Context): boolean {
        let name = val;
        const father = context.proxyObject.father;
        if (father) {
            const check = father.childrens.filter((child) => {
                return (DNamedElement.fromPointer(child.id) as DNamedElement).name === name
            });
            if(check.length > 0){
                U.alert('error', 'Cannot rename the selected element since this name is already taken.');
                return true
            }
        }
        SetFieldAction.new(context.data, 'name', name, '', false);
        return true;

        /*
        // this autofix removes spaces with _
        if (val.match(/\s/)) val = this._autofix_name(val, context);
        // todo: validate if operation can be completed or need autocorrection, then either return false (invalid parameter cannot complete) or send newVal at redux
        const fixedVal: string = val;
        SetFieldAction.new(context.data, 'name', fixedVal, '', false);
        return true;
        */
    }
    protected _autofix_name(val: string, context: Context): string {
        // NB: NON fare autofix di univocità nome tra i childrens o qualsiasi cosa dipendente dal contesto, questo potrebbe essere valido in alcuni modelli e invalido in altri e modificare un oggetto condiviso.
        return val.replaceAll(/\s/g, '_');
    }
    protected get_autofix_name(val: string, context: Context): (val: string) => string { return (val: string) => this._autofix_name(val, context); }
    public autofix_name(val: string): string { return this.wrongAccessMessage("autofix_name"); }
}
// @RuntimeAccessible export class _WNamedElement extends _WModelElement { }
// export type WNamedElement = DNamedElement | LNamedElement | _WNamedElement;
DModelElement.subclasses.push(DNamedElement);
LModelElement.subclasses.push(LNamedElement);














@RuntimeAccessible
export class DTypedElement extends DPointerTargetable { // Mixin(DTypedElement0, DNamedElement)
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    // static singleton: LTypedElement;
    // static logic: typeof LTypedElement;
    // static structure: typeof DTypedElement;

    // inherit redefine
    id!: Pointer<DTypedElement, 1, 1, LTypedElement>;
    annotations: Pointer<DAnnotation, 0, 'N', LAnnotation> = [];
    parent: Pointer<DModelElement, 0, 'N', LModelElement> = [];
    father!: Pointer<DModelElement, 1, 1, LModelElement>;
    name!: string;
    instances!: Pointer<DValue, 0, 'N', LValue>;
    // personal
    type!: Pointer<DClassifier, 1, 1, LClassifier>;
    ordered: boolean = true;
    unique: boolean = true;
    lowerBound: number = 0;
    upperBound: number = 1;
    many!: boolean; // ?
    required!: boolean; // ?


    public static new(name?: DNamedElement["name"], type?: DTypedElement["type"], father?: Pointer, persist: boolean = true): DTypedElement {
        Log.exx("DTypedElement is abstract, cannot instantiate");
        return null as any;
        //return new Constructors(new DTypedElement('dwc'), father, persist, undefined).DPointerTargetable().DModelElement().DNamedElement(name).DTypedElement(type).end();
    }
}

@Abstract
@RuntimeAccessible
export class LTypedElement<Context extends LogicContext<DTypedElement> = any> extends LNamedElement { // extends Mixin(DTypedElement0, LNamedElement)
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    public __raw!: DTypedElement;
    id!: Pointer<DTypedElement, 1, 1, LTypedElement>;
    // static singleton: LTypedElement;
    // static logic: typeof LTypedElement;
    // static structure: typeof DTypedElement;

    // inherit redefine
    parent!: LModelElement[];
    father!: LModelElement;
    annotations!: LAnnotation[];
    name!: string;
    namespace!: string;
    instances!: LValue[];
    // personal
    type!: LClassifier;

    primitiveType?: LClass;
    classType?: LClass;
    enumType?: LEnumerator;

    ordered!: boolean;
    unique!: boolean;
    lowerBound!: number;
    upperBound!: number;
    many!: boolean;
    required!: boolean;


    protected get_classType(context: Context): this["classType"] { let type = this.get_type(context); return type.isClass ? type as LClass : undefined; }
    protected get_enumType(context: Context): this["enumType"] { let type = this.get_type(context); return type.isEnum ? type as LEnumerator : undefined; }
    protected get_primitiveType(context: Context): this["primitiveType"] { let type = this.get_type(context); return type.isPrimitive ? type as LClass : undefined; }
    protected get_type(context: Context): this["type"] { return LPointerTargetable.from(context.data.type); }
    protected set_type(val: Pack1<this["type"]>, context: Context): boolean {
        const data = context.data;
        let instances: LValue[] = context.proxyObject.instances;
        SetFieldAction.new(context.data, 'type', Pointers.from(val), "", true);
        return true;
    }

    protected get_ordered(context: Context): this["ordered"] { return context.data.ordered; }
    protected set_ordered(val: this["ordered"], logicContext: Context): boolean {
        return SetFieldAction.new(logicContext.data, 'ordered', val);
    }

    protected get_unique(context: Context): this["unique"] { return context.data.unique; }
    protected set_unique(val: this["unique"], logicContext: Context): boolean {
        return SetFieldAction.new(logicContext.data, 'unique', val);
    }

    protected get_lowerBound(context: Context): this["lowerBound"] { return context.data.lowerBound; }
    protected set_lowerBound(val: this["lowerBound"], context: Context): boolean {
        SetFieldAction.new(context.data, 'lowerBound', val);
        return true;
    }

    protected get_upperBound(context: Context): this["upperBound"] { return context.data.upperBound; }
    protected set_upperBound(val: this["upperBound"], context: Context): boolean {
        SetFieldAction.new(context.data, 'upperBound', val);
        return true;
    }

    protected get_many(context: Context): this["many"] { return context.data.many; }
    protected set_many(val: this["many"], context: Context): boolean {
        SetFieldAction.new(context.data, 'many', val);
        return true;
    }

    protected get_required(context: Context): this["required"] { return context.data.required; }
    protected set_required(val: this["required"], context: Context): boolean {
        SetFieldAction.new(context.data, 'required', val);
        return true;
    }

    public typeToEcoreString(): string { return this.cannotCall("typeToEcoreString"); }
    protected get_typeToEcoreString(context: Context): () => string {
        // if (context.data.classType) return EcoreParser.classTypePrefix + context.proxyObject.classType.name;
        // if (context.data.enumType) return EcoreParser.classTypePrefix + context.proxyObject.enumType.name;
        // if (context.data.primitiveType) return context.proxyObject.primitiveType.long;
        return ()=> context.proxyObject.type.typeEcoreString; }

    public typeToShortString(): string { return this.cannotCall("typeToShortString"); }
    protected get_typeToShortString(context: Context): () => string {
        // if (context.data.classType) return '' + context.data.classType.name;
        // if (context.data.enumType) return '' + context.data.enumType.name;
        // if (context.data.primitiveType) return '' + context.data.primitiveType.getName();
        return () => context.proxyObject.type.typeString; }

    canOverride(context: Context, other: LTypedElement): boolean {
        // i primitivi identici sono compatibili
        if (context.data.type === other.type.id) return true;
        let t1 = context.proxyObject.type;
        let t2 = other.type;
        // se entrambi primitivi
        if (context.proxyObject.primitiveType && other.primitiveType) {
            ShortAttribSuperTypes[t1.name as ShortAttribETypes].includes(other.name as ShortAttribETypes);
        }
        if (context.proxyObject.enumType) return t1 === t2; // only if they are same enumerator
        // now assumed to be class type
        if (other.classType === other.classType) return true;
        return (context.proxyObject.classType as LClass).isExtending(other.classType as LClass); }

}

// @RuntimeAccessible export class _WTypedElement extends _WNamedElement { }
// export type WTypedElement = DTypedElement | LTypedElement | _WTypedElement;
DNamedElement.subclasses.push(DTypedElement);
LNamedElement.subclasses.push(LTypedElement);





@RuntimeAccessible
export /*abstract*/ class DClassifier extends DPointerTargetable { // extends DNamedElement
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    // static singleton: LClassifier;
    // static logic: typeof LClassifier;
    // static structure: typeof DClassifier;

    // inherit redefine
    id!: Pointer<DClassifier, 1, 1, LClassifier>;
    parent: Pointer<DPackage, 0, 'N', LPackage> = [];
    father!: Pointer<DPackage, 1, 1, LPackage>;
    annotations: Pointer<DAnnotation, 0, 'N', LAnnotation> = [];
    name!: string;
    // personal
    instanceClassName!: string;
    // instanceClass: EJavaClass // ?
    defaultValue!: Pointer<DObject, 1, 1, LObject>[] | string[];
    // isInstance(object: EJavaObject): boolean; ?
    // getClassifierID(): number;

    public static new(name?: DNamedElement["name"], father?: Pointer, persist: boolean = true): DClassifier {
        Log.exx("DClassifier is abstract, cannot instantiate");
        return null as any;
        // return new Constructors(new DClassifier('dwc'), father, persist, undefined).DPointerTargetable().DModelElement().DNamedElement(name).DClassifier().end();
    }
}

@Abstract
@RuntimeAccessible
export class LClassifier<Context extends LogicContext<DClassifier> = any> extends LNamedElement { // extends DNamedElement
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    public __raw!: DClassifier;
    id!: Pointer<DClassifier, 1, 1, LClassifier>;
    // static singleton: LClassifier;
    // static logic: typeof LClassifier;
    // static structure: typeof DClassifier;

    // inherit redefine
    parent!: LPackage[];
    father!: LPackage;
    annotations!: LAnnotation[];
    name!: string;
    namespace!: string;
    // personal
    instanceClassName!: string;
    // instanceClass: EJavaClass // ?
    defaultValue!: LObject[] | string[];
    isPrimitive!: boolean;
    isClass!: boolean;
    isEnum!: boolean;
    // isInstance(object: EJavaObject): boolean; ?
    // getClassifierID(): number;

    protected get_instanceClassName(context: Context): this["instanceClassName"] { return context.data.instanceClassName; }
    protected set_instanceClassName(val: this["instanceClassName"], context: Context): boolean {
        SetFieldAction.new(context.data, 'instanceClassName', val, "", false);
        return true;
    }

    protected set_isPrimitive(val: this["isPrimitive"], context: Context): boolean { return this.cannotSet("isPrimitive"); }
    protected set_isClass(val: this["isClass"], context: Context): boolean { return this.cannotSet("isClass"); }
    protected set_isEnum(val: this["isEnum"], context: Context): boolean { return this.cannotSet("isEnum"); }
    protected get_isPrimitive(context: Context): this["isPrimitive"] { return !!((context.data as DClass).isPrimitive as unknown); }
    protected get_isClass(context: Context): this["isClass"] { return (context.data as DClass).isPrimitive ? false : context.data.className === DClass.name; }
    protected get_isEnum(context: Context): this["isEnum"] { return context.data.className === DEnumerator.name; }
    protected set_defaultValue(val: this["defaultValue"] | DClassifier["defaultValue"], context: Context): boolean {
        if (typeof val !== "object" && !Pointers.isPointer(val)) {
            // primitive default value for enums
            SetFieldAction.new(context.data, 'defaultValue', val, "", false);
        }
        else {
            SetFieldAction.new(context.data, 'defaultValue', Pointers.from(val as Pointer[]) || [], "", true);
        }
        return true;
    }

    typeEcoreString!: string;
    typeString!: string;
    private get_typeEcoreString(context: Context) {
        return EcoreParser.classTypePrefix + context.data.name;
    }
    private get_typeString(context: Context) {
        return context.data.name;
    }
}
// @RuntimeAccessible export class _WClassifier extends _WNamedElement { }
// export type WClassifier = DClassifier | LClassifier | _WClassifier;
DNamedElement.subclasses.push(DClassifier);
LNamedElement.subclasses.push(LClassifier);






@RuntimeAccessible
export class DPackage extends DPointerTargetable { // extends DNamedElement
    // static _super = DNamedElement;
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    // static singleton: LPackage;
    // static logic: typeof LPackage;
    // static structure: typeof DPackage;

    // inherit redefine
    id!: Pointer<DPackage, 1, 1, LPackage>;
    parent: Pointer<DPackage | DModel, 0, 'N', LPackage | LModel> = [];
    father!: Pointer<DPackage | DModel, 1, 1, LPackage | LModel>;
    annotations: Pointer<DAnnotation, 0, 'N', LAnnotation> = [];
    name!: string;
    // personal
    classifiers: Pointer<DClassifier, 0, 'N', LClassifier> = [];
    subpackages: Pointer<DPackage, 0, 'N', LPackage> = [];
    uri!: string;
    prefix!: string;

    public static new(name?: DNamedElement["name"], uri?: DPackage["uri"], prefix?: DPackage["prefix"], father?: Pointer, persist: boolean = true, fatherType?: Constructor): DPackage {
        if (!name) name = this.defaultname("pkg_", father);
        return new Constructors(new DPackage('dwc'), father, persist, fatherType).DPointerTargetable().DModelElement()
            .DNamedElement(name).DPackage(uri, prefix).end();
    }
}


@Leaf
@RuntimeAccessible
export class LPackage<Context extends LogicContext<DPackage> = any, C extends Context = Context, D extends DPackage = DPackage> extends LNamedElement { // extends DNamedElement
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    public __raw!: DPackage;
    id!: Pointer<DPackage, 1, 1, LPackage>;
    // static singleton: LPackage;
    // static logic: typeof LPackage;
    // static structure: typeof DPackage;
    // inherit redefine
    parent!: (LPackage| LModel)[];  // ype 'LPackage' is missing the following properties from type 'LModelElement': get_set_parent, set_parent
    father!: LPackage | LModel;
    annotations!: LAnnotation[];
    name!: string;
    namespace!: string;
    // personal
    classifiers!: LClassifier[];
    subpackages!: LPackage[];
    uri!: string;
    prefix: string = '';
    // derived
    classes!: LClass[];
    enums!: LEnumerator[];
    enumerators!: LEnumerator[];

    // utilities to go down in the tree (plural names)
    allSubPackages!: LPackage[];
    allSubEnums!: LEnumerator[];
    allSubClasses!: LClass[];
    operations!: LOperation[];
    parameters!: LParameter[];
    exceptions!: LClassifier[];
    attributes!: LAttribute[];
    references!: LReference[];
    literals!: LEnumLiteral[];

    protected generateEcoreJson_impltemplate(context: Context, loopDetectionObj: Dictionary<Pointer, DModelElement> = {}): Json {
        loopDetectionObj[context.data.id] = context.data;
        const json: GObject = {};
        return json; }

    protected generateEcoreJson_impl(context: Context, loopDetectionObj: Dictionary<Pointer, DModelElement> = {}): Json {
        loopDetectionObj[context.data.id] = context.data;
        const model: GObject = {};
        const d = context.data;
        let classarr = context.proxyObject.classes.map( c => c.generateEcoreJson(loopDetectionObj));
        let enumarr = context.proxyObject.enums.map(e => e.generateEcoreJson(loopDetectionObj));
        const classifiers: Json[] = Array.prototype.concat.call(classarr, enumarr);
        model[ECorePackage.xmiversion] = '2.0';
        model[ECorePackage.xmlnsxmi] = 'http://www.omg.org/XMI';
        model[ECorePackage.xmlnsxsi] = 'http://www.w3.org/2001/XMLSchema-instance';
        model[ECorePackage.xmlnsecore] = 'http://www.eclipse.org/emf/2002/Ecore';
        model[ECorePackage.namee] = d.name;
        model[ECorePackage.nsURI] = d.uri;
        model[ECorePackage.nsPrefix] = d.prefix;//getModelRoot().namespace();
        model[ECorePackage.eClassifiers] = classifiers;
        return model; }

    public duplicate(deep: boolean = true): this { return this.cannotCall( this.constructor.name + "duplicate()"); }
    protected get_duplicate(context: Context): ((deep?: boolean) => this) {
        return (deep: boolean = false) => {
            BEGIN()
            let de: D = context.proxyObject.father.addPackage(context.data.name, context.data.uri, context.data.prefix) as D;
            let le: this = LPointerTargetable.fromD(de);
            let we: WPackage = le as any;
            we.subpackages = deep ? context.proxyObject.subpackages.map( lchild => lchild.duplicate(deep).id) : context.data.subpackages;
            we.classifiers = deep ? context.proxyObject.classifiers.map( lchild => lchild.duplicate(deep).id) : context.data.classifiers;
            we.annotations = deep ? context.proxyObject.annotations.map( lchild => lchild.duplicate(deep).id) : context.data.annotations;
            END()
            return le;
        }
    }

    public addPackage(name?: D["name"], uri?: D["uri"], prefix?: D["prefix"]): DPackage { return this.cannotCall("addPackage"); }
    protected get_addPackage(context: Context): this["addPackage"] {
        return (name?: D["name"], uri?: D["uri"], prefix?: D["prefix"]) => DPackage.new(name, uri, prefix, context.data.id, true, DPackage); }

    public addClass(name?: DClass["name"], isInterface?: DClass["interface"], isAbstract?: DClass["abstract"], isPrimitive?: DClass["isPrimitive"],
                    isPartial?: DClass["partial"], partialDefaultName?: DClass["partialdefaultname"]): DClass {
        return this.cannotCall("addClass"); }
    protected get_addClass(context: Context): this["addClass"] {
        return (name?: DClass["name"], isInterface?: DClass["interface"], isAbstract?: DClass["abstract"], isPrimitive?: DClass["isPrimitive"],
                isPartial?: DClass["partial"], partialDefaultName?: DClass["partialdefaultname"]
        ) => DClass.new(name, isInterface, isAbstract, isPrimitive, isPartial, partialDefaultName, context.data.id, true); }

    public addEnum(...p:Parameters<this["addEnumerator"]>): DEnumerator { return this.addEnumerator(...p); }
    protected get_addEnum(context: Context): this["addEnumerator"] { return this.get_addEnumerator(context); }
    public addEnumerator(name?: DEnumerator["name"]): DEnumerator { return this.cannotCall("addEnumerator"); }
    protected get_addEnumerator(context: Context): this["addEnumerator"] {
        return (name?: DEnumerator["name"]) => DEnumerator.new(name, context.data.id, true); }

    protected get_classes(context: Context): LClass[] {
        let classifiers = DPointerTargetable.fromPointer(context.data.classifiers as Pointer<DClassifier, 1, 1, LClassifier>[]);
        let enumerators = classifiers.filter(dc => dc?.className === DClass.name ) as DClass[];
        return LPointerTargetable.from(enumerators.map(e=> e.id)); }
    protected get_enums(context: Context): LEnumerator[] { return this.get_enumerators(context); }
    protected get_enumerators(context: Context): LEnumerator[] {
        let classifiers = DPointerTargetable.fromPointer(context.data.classifiers as Pointer<DClassifier, 1, 1, LClassifier>[]);
        let enumerators = classifiers.filter(dc => dc?.className === DEnumerator.name ) as DEnumerator[];
        return LPointerTargetable.from(enumerators.map(e=> e.id)); }

    private get_allSubClasses(context: Context): LClass[] {
        const s: IStore = store.getState();
        return this.get_allSubPackages(context, s).flatMap(p => p.classes || []); }
    private get_allSubEnums(context: Context): LEnumerator[] { return this.get_allSubEnumerators(context); }
    private get_allSubEnumerators(context: Context): LEnumerator[] {
        const s: IStore = store.getState();
        return this.get_allSubPackages(context, s).flatMap(p => (p.enums || []));
    }

    private get_allSubPackages(context: Context, state?: IStore): LPackage[] {
        // return context.data.packages.map(p => LPointerTargetable.from(p));
        state = state || store.getState();
        let tocheck: Pointer<DPackage>[] = context.data.subpackages || [];
        let checked: Dictionary<Pointer, true> = {};
        checked[context.data.id] = true;
        while (tocheck.length) {
            let newtocheck: Pointer<DPackage>[] = [];
            for (let ptr of tocheck) {
                if (checked[ptr]) throw new Error("loop in packages containing themselves");
                checked[ptr] = true;
                let dpackage: DPackage = DPointerTargetable.from(ptr, state);
                U.arrayMergeInPlace(newtocheck, dpackage?.subpackages);
            }
            tocheck = newtocheck;
        }
        return LPointerTargetable.from(Object.keys(checked), state);
    }

    protected get_childrens_idlist(context: Context): Pointer<DAnnotation | DPackage | DClassifier, 1, 'N'> {
        return [...super.get_childrens_idlist(context) as Pointer<DAnnotation | DPackage | DClassifier, 1, 'N'>, ...context.data.subpackages, ...context.data.classifiers]; }

    protected get_classifiers(context: Context): this["classifiers"] {
        return context.data.classifiers.map((pointer) => {
            return LPointerTargetable.from(pointer)
        });
    }
    /**
     * damiano todo: riscrivere tutti i set_subelements (settare parent e father che sono derivati e mai setatti direttamente)
     * e tutti i add_element (per pointedby problem qunado aggiornati fuori dallo stato)
     * */
    protected set_classifiers(val: PackArr<this["classifiers"]>, context: Context): boolean {
        const list = val.map((lItem) => { return Pointers.from(lItem) });
        const oldList = context.data.classifiers;
        const diff = U.arrayDifference(oldList, list);
        //BEGIN();
        SetFieldAction.new(context.data, 'classifiers', list, "", true);
        for (let id of diff.added) {
            SetFieldAction.new(id, 'father', context.data.id, '', true);
            SetFieldAction.new(id, 'parent', context.data.id, '+=', true);
        }
        for (let id of diff.removed as Pointer<DModelElement>[]) {
            SetFieldAction.new(id, 'father', undefined, '', true);
            const parent = DPointerTargetable.from(id).parent;
            U.arrayRemoveAll(parent, context.data.id);
            SetFieldAction.new(id, 'parent', parent, '', true);
        }
        //END();
        return true;
    }

    protected get_subpackages(context: Context): this["subpackages"] {
        return context.data.subpackages.map((pointer) => {
            return LPointerTargetable.from(pointer)
        });
    }
    protected set_subpackages(val: PackArr<this["subpackages"]>, context: Context): boolean {
        const list = val.map((lItem) => { return Pointers.from(lItem) });
        const oldList = context.data.subpackages;
        const diff = U.arrayDifference(oldList, list);
        //BEGIN();
        SetFieldAction.new(context.data, 'subpackages', list, "", true);
        for (let id of diff.added) {
            SetFieldAction.new(id, 'father', context.data.id, '', true);
            SetFieldAction.new(id, 'parent', context.data.id, '+=', true);
        }
        for (let id of diff.removed as Pointer<DModelElement>[]) {
            SetFieldAction.new(id, 'father', undefined, '', true);
            const parent = DPointerTargetable.from(id).parent;
            U.arrayRemoveAll(parent, context.data.id);
            SetFieldAction.new(id, 'parent', parent, '', true);
        }
        //END();
        return true;
    }

    protected get_uri(context: Context): this["uri"] { return context.data.uri; }
    protected set_uri(val: this["uri"], context: Context): boolean {
        SetFieldAction.new(context.data, 'uri', val, "", false);
        return true;
    }
    protected get_prefix(context: Context): this["uri"] { return context.data.prefix; }
    protected set_prefix(val: this["prefix"], context: Context): boolean {
        SetFieldAction.new(context.data, 'prefix', val, "", false);
        return true;
    }

    protected get_delete(context: Context): () => void {
        const l = context.proxyObject;
        const ret = () => {
            let canBeDeleted = true;
            for(let me of l.classes) {
                if(!canBeDeleted) break;
                canBeDeleted = me.instances.length === 0;
            }
            if(canBeDeleted) {
                // super.delete(context);
                l.superDelete();
            }
            else { U.alert('error', 'Cannot delete the selected package since there are instances.'); }
        }
        return ret;
    }

}
// @RuntimeAccessible export class _WPackage extends _WNamedElement { }
// export type WPackage = DPackage | LPackage | _WPackage;
DNamedElement.subclasses.push(DPackage);
LNamedElement.subclasses.push(LPackage);


@Leaf
@RuntimeAccessible
export class DOperation extends DPointerTargetable { // extends DTypedElement
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    // static singleton: LOperation;
    // static logic: typeof LOperation;
    // static structure: typeof DOperation;

    // inherit redefine
    instances!: never[];
    id!: Pointer<DOperation, 1, 1, LObject>;
    annotations: Pointer<DAnnotation, 0, 'N', LAnnotation> = [];
    parent: Pointer<DClass, 0, 'N', LClass> = [];
    father!: Pointer<DClass, 1, 1, LClass>;
    name!: string;
    type!: Pointer<DClassifier, 1, 1, LClassifier>;
    ordered: boolean = true;
    unique: boolean = true;
    lowerBound: number = 0;
    upperBound: number = 1;
    many!: boolean;
    required!: boolean;
    // personal
    exceptions: Pointer<DClassifier, 0, 'N', LClassifier> = [];
    parameters: Pointer<DParameter, 0, 'N', LParameter> = [];
    visibility: AccessModifier = AccessModifier.private;

    public static new(name?: DNamedElement["name"], type?: DTypedElement["type"], exceptions: DOperation["exceptions"] = [], father?: Pointer, persist: boolean = true): DOperation {
        if (!name) name = this.defaultname("fx_", father);
        return new Constructors(new DOperation('dwc'), father, persist, undefined).DPointerTargetable().DModelElement()
            .DNamedElement(name).DTypedElement(type).DOperation(exceptions).end();
    }
}

@Node
@RuntimeAccessible
export class LOperation<Context extends LogicContext<DOperation> = any, C extends Context = Context, D extends DOperation = DOperation>  extends LTypedElement { // extends DTypedElement
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    public __raw!: DOperation;
    id!: Pointer<DOperation, 1, 1, LOperation>;
    // static singleton: LOperation;
    // static logic: typeof LOperation;
    // static structure: typeof DOperation;

    // inherit redefine
    instances!: never[];
    annotations!: LAnnotation[];
    parent!: LClass[];
    father!: LClass;
    name!: string;
    namespace!: string;
    type!: LClassifier;
    ordered: boolean = true;
    unique: boolean = true;
    lowerBound: number = 0;
    upperBound: number = 1;
    many!: boolean;
    required!: boolean;
    // personal
    exceptions!: LClassifier[];
    parameters!: LParameter[];
    visibility!: AccessModifier;


    protected generateEcoreJson_impl(context: Context, loopDetectionObj: Dictionary<Pointer, DModelElement> = {}): Json {
        loopDetectionObj[context.data.id] = context.data;
        const json: Json = {};
        json[ECoreOperation.eParameters] = context.proxyObject.parameters.map( par => par.generateEcoreJson(loopDetectionObj));
        EcoreParser.write(json, ECoreOperation.namee, context.data.name);
        EcoreParser.write(json, ECoreOperation.eType, context.proxyObject.type.typeEcoreString);
        EcoreParser.write(json, ECoreOperation.lowerBound, '' + context.data.lowerBound);
        EcoreParser.write(json, ECoreOperation.upperBound, '' + context.data.upperBound);
        EcoreParser.write(json, ECoreOperation.eexceptions, context.proxyObject.exceptions.map( (l: LClassifier) => l.typeEcoreString).join(' ')); // todo: not really sure it's this format
        EcoreParser.write(json, ECoreOperation.ordered, '' + context.data.ordered);
        EcoreParser.write(json, ECoreOperation.unique, '' + context.data.unique);
        return json; }

    public duplicate(deep: boolean = true): this { return this.cannotCall( this.constructor.name + "duplicate()"); }
    protected get_duplicate(context: Context): ((deep?: boolean) => this) {
        return (deep: boolean = false) => {
            BEGIN()
            let de: D = context.proxyObject.father.addOperation(context.data.name, context.data.type) as D;
            de.many = context.data.many;
            de.lowerBound = context.data.lowerBound;
            de.upperBound = context.data.upperBound;
            de.ordered = context.data.ordered;
            de.required = context.data.required;
            de.unique = context.data.unique;
            de.visibility = context.data.visibility;
            de.exceptions = context.data.exceptions;
            let le: this = LPointerTargetable.fromD(de);
            let we: WOperation = le as any;
            we.annotations = deep ? context.proxyObject.annotations.map(lchild => lchild.duplicate(deep).id) : context.data.annotations;
            we.parameters = deep ? context.proxyObject.parameters.map(lchild => lchild.duplicate(deep).id) : context.data.parameters;
            we.exceptions = context.data.exceptions;
            END()
            return le; }
    }

    public addParameter(name?: DParameter["name"], type?: DParameter["type"]): DParameter { return this.cannotCall("addParameter"); }
    protected get_addParameter(context: Context): this["addParameter"] {
        return (name?: DParameter["name"], type?: DParameter["type"]) => DParameter.new(name, type, context.data.id, true); }

    protected get_childrens_idlist(context: Context): Pointer<DAnnotation | DClassifier | DParameter, 1, 'N'> {
        return [...super.get_childrens_idlist(context) as Pointer<DAnnotation | DParameter | DClassifier, 1, 'N'>, ...context.data.exceptions, ...context.data.parameters]; }

    protected get_exceptions(context: Context): this["exceptions"] {
        return context.data.exceptions.map((pointer) => {
            return LPointerTargetable.from(pointer)
        });
    }
    protected set_exceptions(val: PackArr<this["exceptions"]>, context: Context): boolean {
        const list = val.map((lItem) => { return Pointers.from(lItem) });
        SetFieldAction.new(context.data, 'exceptions', list, "", true);
        return true;
    }

    protected get_parameters(context: Context): this["parameters"] {
        return context.data.parameters.map((pointer) => {
            return LPointerTargetable.from(pointer)
        });
    }
    protected set_parameters(val: PackArr<this["parameters"]>, context: Context): boolean {
        const list = val.map((lItem) => { return Pointers.from(lItem) });
        const oldList = context.data.parameters;
        const diff = U.arrayDifference(oldList, list);
        //BEGIN();
        SetFieldAction.new(context.data, 'parameters', list, "", true);
        for (let id of diff.added) {
            SetFieldAction.new(id, 'father', context.data.id, '', true);
            SetFieldAction.new(id, 'parent', context.data.id, '+=', true);
        }
        for (let id of diff.removed as Pointer<DModelElement>[]) {
            SetFieldAction.new(id, 'father', undefined, '', true);
            const parent = DPointerTargetable.from(id).parent;
            U.arrayRemoveAll(parent, context.data.id);
            SetFieldAction.new(id, 'parent', parent, '', true);
        }
        //END();
        return true;
    }

    protected get_type(context: Context): this["type"] {
        return context.proxyObject.parameters[0].type;
    }

    _mark(b: boolean, superchildren: LOperation, override: string) {

    }

    _canOverride(superchildren: LOperation) {
        return undefined;
    }

    _canPolymorph(superchildren: LOperation) {
        return undefined;
    }
}
DTypedElement.subclasses.push(DOperation);
LTypedElement.subclasses.push(LOperation);




@Leaf
@RuntimeAccessible
export class DParameter extends DPointerTargetable { // extends DTypedElement
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    // static singleton: LParameter;
    // static logic: typeof LParameter;
    // static structure: typeof DParameter;

    // inherit redefine
    instances!: never[];
    id!: Pointer<DParameter, 1, 1, LParameter>;
    annotations: Pointer<DAnnotation, 0, 'N', LAnnotation> = [];
    parent: Pointer<DOperation, 0, 'N', LOperation> = [];
    father!: Pointer<DOperation, 1, 1, LOperation>;
    name!: string;
    type!: Pointer<DClassifier, 1, 1, LClassifier>;
    ordered: boolean = true;
    unique: boolean = true;
    lowerBound: number = 0;
    upperBound: number = 1;
    many!: boolean;
    required!: boolean;
    // personal

    public static new(name?: DNamedElement["name"], type?: DTypedElement["type"], father?: Pointer, persist: boolean = true): DParameter {
        if (!type) type = LPointerTargetable.from(Selectors.getFirstPrimitiveTypes()).id; // default type as string
        if (!name) name = this.defaultname("arg", father);
        return new Constructors(new DParameter('dwc'), father, persist, undefined).DPointerTargetable().DModelElement()
            .DNamedElement(name).DTypedElement(type).DParameter().end();
    }
}

@Leaf
@RuntimeAccessible
export class LParameter<Context extends LogicContext<DParameter> = any, C extends Context = Context, D extends DParameter = DParameter>  extends LTypedElement { // extends DTypedElement
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    public __raw!: DParameter;
    id!: Pointer<DParameter, 1, 1, LParameter>;
    // static singleton: LParameter;
    // static logic: typeof LParameter;
    // static structure: typeof DParameter;

    // inherit redefine
    instances!: never[];
    annotations!: LAnnotation[];
    parent!: LOperation[];
    father!: LOperation;
    name!: string;
    namespace!: string;
    type!: LClassifier;
    ordered: boolean = true;
    unique: boolean = true;
    lowerBound: number = 0;
    upperBound: number = 1;
    many!: boolean;
    required!: boolean;
    // personal

    protected generateEcoreJson_impl(context: Context, loopDetectionObj: Dictionary<Pointer, DModelElement> = {}): Json {
        loopDetectionObj[context.data.id] = context.data;
        const json: Json = {};
        const l = context.proxyObject;
        const d = context.data;
        EcoreParser.write(json, ECoreOperation.lowerBound, '' + d.lowerBound);
        EcoreParser.write(json, ECoreOperation.upperBound, '' + d.upperBound);
        EcoreParser.write(json, ECoreOperation.ordered, '' + d.ordered);
        EcoreParser.write(json, ECoreOperation.unique, '' + d.unique);
        EcoreParser.write(json, ECoreOperation.eType, '' + l.type.typeEcoreString);
        return json; }

    public duplicate(deep: boolean = true): this { return this.cannotCall( this.constructor.name + "duplicate()"); }
    protected get_duplicate(context: Context): ((deep?: boolean) => this) {
        return (deep: boolean = false) => {
            BEGIN()
            let de: D = context.proxyObject.father.addParameter(context.data.name, context.data.type) as D;
            de.many = context.data.many;
            de.lowerBound = context.data.lowerBound;
            de.upperBound = context.data.upperBound;
            de.ordered = context.data.ordered;
            de.required = context.data.required;
            de.unique = context.data.unique;
            let le: this = LPointerTargetable.fromD(de);
            let we: WParameter = le as any;
            we.annotations = deep ? context.proxyObject.annotations.map(lchild => lchild.duplicate(deep).id) : context.data.annotations;
            END()
            return le; }
    }

    /*
        protected get_delete(context: LogicContext<DParameter>): () => void {
            let ret = () => {};
            const dParameter: DParameter = context.data;
            const dOperation: DOperation = Selectors.getDElement<DOperation>(dParameter.father);
            if (dOperation.parameters.indexOf(dParameter.id) !== 0) {
                const dClassifier: DClassifier | undefined = Selectors.getDElement<DClass>(dParameter.type as string); //first parameter is return type so his type is undefined
                ret = () => {
                    SetFieldAction.new(dOperation,"parameters", U.removeFromList(dOperation.parameters, dParameter.id), '', true);
                    if (dClassifier) {
                        // SetFieldAction.new(dClassifier, "pointedBy", U.removeFromList(dClassifier.pointedBy, dParameter.id));
                    }
                    // SetRootFieldAction.new("parameters", U.removeFromList(Selectors.getAllParameters(), dParameter.id), '', true);
                    new DeleteElementAction(dParameter);
                }
            } else {
                // when deleting return type (null = void)
                ret = () => {
                    SetFieldAction.new(dParameter, "type", null as any); // while reworking .delete(): null = void, questo setta void e deve essere tenuto come azione diversa dal default delete
                };
            }
            ret();
            return ret;
        }
        */
}
DTypedElement.subclasses.push(DParameter);
LTypedElement.subclasses.push(LParameter);


@RuntimeAccessible
export class DClass extends DPointerTargetable { // extends DClassifier
    // static _super = DClassifier;
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    // static singleton: LClass;
    // static logic: typeof LClass;
    // static structure: typeof DClass;

    // inherit redefine
    // instanceClass: EJavaClass // ?
    // isInstance(object: EJavaObject): boolean; ?
    // getClassifierID(): number;
    id!: Pointer<DClass, 1, 1, LClass>;
    instanceClassName!: string;
    parent: Pointer<DPackage, 0, 'N', LPackage> = [];
    father!: Pointer<DPackage, 1, 1, LPackage>;
    annotations: Pointer<DAnnotation, 0, 'N', LAnnotation> = [];
    name!: string;
    defaultValue!: Pointer<DObject, 1, 1, LObject>[];
    // personal
    // isSuperTypeOf(someClass: DClassifier): boolean { return todoret; }
    // getEstructuralFeatureByID(featureID: number): DStructuralFeature { return todoret; }
    // getEstructuralFeature(featureName: string): DStructuralFeature { return todoret; }
    abstract: boolean = false;
    interface: boolean = false;
    instances: Pointer<DObject, 0, 'N', LObject> = [];
    operations: Pointer<DOperation, 0, 'N', LOperation> = [];
    features: Pointer<DStructuralFeature, 0, 'N', LStructuralFeature> = [];
    references: Pointer<DReference, 0, 'N', LReference> = [];
    attributes: Pointer<DAttribute, 0, 'N', LAttribute> = [];
    referencedBy: Pointer<DReference, 0, 'N', LReference> = [];
    extends: Pointer<DClass, 0, 'N', LClass> = [];
    extendedBy: Pointer<DClass, 0, 'N', LClass> = [];

    // mia aggiunta:
    isPrimitive!: boolean;
    implements: Pointer<DClass, 0, 'N', LClass> = [];
    implementedBy: Pointer<DClass, 0, 'N', LClass> = [];
    partial!: boolean;
    partialdefaultname!: string;

    // for m1:
    hideExcessFeatures: boolean = true; // damiano: se attivo questo e creo una DClass di sistema senza nessuna feature e di nome Object, ho creato lo schema di un oggetto schema-less a cui tutti sono conformi

    public static new(name?: DNamedElement["name"], isInterface: DClass["interface"] = false, isAbstract: DClass["abstract"] = false, isPrimitive: DClass["isPrimitive"] = false, partial?: DClass["partial"],
                      partialDefaultName?: DClass["partialdefaultname"], father?: Pointer, persist: boolean = true): DClass {
        if (!name) name = this.defaultname("concept ", father);
        return new Constructors(new DClass('dwc'), father, persist, undefined).DPointerTargetable().DModelElement()
            .DNamedElement(name).DClassifier().DClass(isInterface, isAbstract, isPrimitive, partial, partialDefaultName).end();
    }

}

@Instantiable // (LObject)
@Node
@RuntimeAccessible
export class LClass<D extends DClass = DClass, Context extends LogicContext<DClass> = any, C extends Context = Context>  extends LClassifier{ // extends DClassifier
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    public __raw!: DClass;
    id!: Pointer<DClass, 1, 1, LClass>;
    // static singleton: LClass;
    // static logic: typeof LClass;
    // static structure: typeof DClass;

    // inherit redefine
    // instanceClass: EJavaClass // ?
    // isInstance(object: EJavaObject): boolean; ?
    // getClassifierID(): number;
    instanceClassName!: string;
    parent!: LPackage[];
    father!: LPackage;
    annotations!: LAnnotation[];
    name!: string;
    namespace!: string;
    defaultValue!: LObject[];
    // personal
    // isSuperTypeOf(someClass: DClassifier): boolean { return todoret; }
    // getEstructuralFeatureByID(featureID: number): DStructuralFeature { return todoret; }
    // getEstructuralFeature(featureName: string): DStructuralFeature { return todoret; }
    abstract!: boolean;
    interface!: boolean;
    instances!: LObject[];
    operations!: LOperation[];
    features!: LStructuralFeature[];
    references!: LReference[];
    attributes!: LAttribute[];
    referencedBy!: LReference[];
    extends!: LClass[];
    extendedBy!: LClass[];
    nodes!: LGraphElement[]; // ipotesi, non so se tenerlo

    // mia aggiunta:
    partial!: boolean;
    partialdefaultname!: string;
    isPrimitive!: boolean;
    isClass!: boolean; // false if it's primitive type
    isEnum!: false;
    implements: Pointer<DClass, 0, 'N', LClass> = [];
    implementedBy: Pointer<DClass, 0, 'N', LClass> = [];

    // utilities to go down in the tree (plural names)
    exceptions!: LClassifier[] | null;
    parameters!: LParameter[] | null;


    protected generateEcoreJson_impl(context: Context, loopDetectionObj: Dictionary<Pointer, DModelElement> = {}): Json {
        loopDetectionObj[context.data.id] = context.data;
        const json: GObject = {};
        const featurearr: Json[] = [];
        const operationsarr: Json[] = [];
        let supertypesstr = [];
        const d = context.data;
        const l = context.proxyObject;
        for (let att of l.attributes) { featurearr.push(att.generateEcoreJson(loopDetectionObj)); }
        for (let ref of l.references) { featurearr.push(ref.generateEcoreJson(loopDetectionObj)); }
        for (let op of l.operations) { operationsarr.push(op.generateEcoreJson(loopDetectionObj)); }

        json[ECoreClass.xsitype] = 'ecore:EClass';
        json[ECoreClass.namee] = d.name;
        json[ECoreClass.interface] = U.toBoolString(d.interface, false);
        json[ECoreClass.abstract] = U.toBoolString(d.abstract, false);
        if (d.instanceClassName) json[ECoreClass.instanceTypeName] = d.instanceClassName;
        json[ECoreClass.eSuperTypes] = l.extends.map( superclass => superclass.typeEcoreString).join(" ");
        if (featurearr) json[ECoreClass.eStructuralFeatures] = featurearr;
        if (operationsarr) json[ECoreClass.eOperations] = operationsarr;
        return json; }


    public duplicate(deep: boolean = true): this { return this.cannotCall( this.constructor.name + "duplicate()"); }
    protected get_duplicate(context: Context): ((deep?: boolean) => this) {
        return (deep: boolean = false) => {
            BEGIN()
            let de: D = context.proxyObject.father.addClass(context.data.name, context.data.interface, context.data.abstract, context.data.isPrimitive) as D;
            de.hideExcessFeatures = context.data.hideExcessFeatures;
            let le: this = LPointerTargetable.fromD(de);
            let we: WClass = le as any;
            we.defaultValue = context.data.defaultValue;
            we.extends = context.data.extends;
            we.attributes = deep ? context.proxyObject.attributes.map(lchild => lchild.duplicate(deep).id) : context.data.attributes;
            we.references = deep ? context.proxyObject.references.map(lchild => lchild.duplicate(deep).id) : context.data.references;
            we.operations = deep ? context.proxyObject.operations.map(lchild => lchild.duplicate(deep).id) : context.data.operations;
            END()
            return le; }
    }

    protected get_childrens_idlist(context: Context): Pointer<DAnnotation | DStructuralFeature | DOperation, 1, 'N'> {
        return [...super.get_childrens_idlist(context) as Pointer<DAnnotation | DStructuralFeature, 1, 'N'>, ...context.data.attributes, ...context.data.references, ...context.data.operations]; }

    protected set_partial(val: D["partial"], context: Context): boolean { return SetFieldAction.new(context.data.id, "partial", val); }
    protected get_partial(context: Context): D["partial"] { return context.data.partial; }
    protected set_partialdefaultname(val: D["partialdefaultname"], context: Context): boolean { return SetFieldAction.new(context.data.id, "partialdefaultname", val, undefined, false); }
    protected get_partialdefaultname(context: Context): D["partialdefaultname"] { return context.data.partialdefaultname; }

    public addAttribute(name?: DAttribute["name"], type?: DAttribute["type"]): DAttribute { return this.cannotCall("addAttribute"); }
    protected get_addAttribute(context: Context): this["addAttribute"] {
        return (name?: DAttribute["name"], type?: DAttribute["type"]) => DAttribute.new(name, type, context.data.id, true); }

    public addReference(name?: DReference["name"], type?: DReference["type"]): DReference { return this.cannotCall("addReference"); }
    protected get_addReference(context: Context): this["addReference"] {
        return (name?: DReference["name"], type?: DReference["type"]) => DReference.new(name, type, context.data.id, true); }

    public addOperation(name?: DOperation["name"], type?: DOperation["type"]): DOperation { return this.cannotCall("addOperation"); }
    protected get_addOperation(context: Context): this["addOperation"] {
        return (name?: DOperation["name"], type?: DOperation["type"]) => DOperation.new(name, type, [], context.data.id, true); }


    protected get_abstract(context: Context): this["abstract"] { return context.data.abstract; }
    protected set_abstract(val: this["abstract"], context: Context): boolean {
        const data = context.data;
        if(val && data.instances.length > 0) {
            U.alert('error', 'Cannot change the abstraction level since there are instances.');
        } else {
            SetFieldAction.new(data, 'abstract', val);
        }
        return true;
    }

    protected set_isPrimitive(val: this["isPrimitive"], context: Context): boolean { SetFieldAction.new(context. data, 'isPrimitive', val); return true; }
    // get is in classifier with all other "type"s getter and setter

    protected get_interface(context: Context): this["interface"] { return context.data.interface; }
    protected set_interface(val: this["interface"], context: Context): boolean {
        SetFieldAction.new(context.data, 'interface', val);
        return true;
    }

    protected get_instances(context: Context): this["instances"] {
        return context.data.instances.map((pointer) => {
            return LPointerTargetable.from(pointer)
        });
    }
    protected set_instances(val: PackArr<this["instances"]>, context: Context): boolean {
        const list = val.map((lItem) => { return Pointers.from(lItem) });
        SetFieldAction.new(context.data, 'instances', list, "", true);
        return true;
    }

    protected get_operations(context: Context): this["operations"] {
        return context.data.operations.map((pointer) => {
            return LPointerTargetable.from(pointer)
        });
    }
    protected set_operations(val: PackArr<this["operations"]>, context: Context): boolean {
        const list = val.map((lItem) => { return Pointers.from(lItem) });
        const oldList = context.data.operations;
        const diff = U.arrayDifference(oldList, list);
        //BEGIN();
        SetFieldAction.new(context.data, 'operations', list, "", true);
        for (let id of diff.added) {
            SetFieldAction.new(id, 'father', context.data.id, '', true);
            SetFieldAction.new(id, 'parent', context.data.id, '+=', true);
        }
        for (let id of diff.removed as Pointer<DModelElement>[]) {
            SetFieldAction.new(id, 'father', undefined, '', true);
            const parent = DPointerTargetable.from(id).parent;
            U.arrayRemoveAll(parent, context.data.id);
            SetFieldAction.new(id, 'parent', parent, '', true);
        }
        //END();
        return true;
    }

    protected get_features(context: Context): this["features"] {
        return context.data.features.map((pointer) => { return LPointerTargetable.from(pointer) });
    }
    protected set_features(val: PackArr<this["features"]>, context: Context): boolean {
        const list = val.map((lItem) => { return Pointers.from(lItem) });
        const oldList = context.data.features;
        const diff = U.arrayDifference(oldList, list);
        //BEGIN();
        SetFieldAction.new(context.data, 'features', list, "", true);
        for (let id of diff.added) {
            SetFieldAction.new(id, 'father', context.data.id, '', true);
            SetFieldAction.new(id, 'parent', context.data.id, '+=', true);
        }
        for (let id of diff.removed as Pointer<DModelElement>[]) {
            SetFieldAction.new(id, 'father', undefined, '', true);
            const parent = DPointerTargetable.from(id).parent;
            U.arrayRemoveAll(parent, context.data.id);
            SetFieldAction.new(id, 'parent', parent, '', true);
        }
        //END();
        return true;
    }

    protected get_references(context: Context): this["references"] {
        return context.data.references.map((pointer) => {
            return LPointerTargetable.from(pointer)
        });
    }
    protected set_references(val: PackArr<this["references"]>, context: Context): boolean {
        const list = val.map((lItem) => { return Pointers.from(lItem) });
        const oldList = context.data.references;
        const diff = U.arrayDifference(oldList, list);
        //BEGIN();
        SetFieldAction.new(context.data, 'references', list, "", true);
        for (let id of diff.added) {
            SetFieldAction.new(id, 'father', context.data.id, '', true);
            SetFieldAction.new(id, 'parent', context.data.id, '+=', true);
        }
        for (let id of diff.removed as Pointer<DModelElement>[]) {
            SetFieldAction.new(id, 'father', undefined, '', true);
            const parent = DPointerTargetable.from(id).parent;
            U.arrayRemoveAll(parent, context.data.id);
            SetFieldAction.new(id, 'parent', parent, '', true);
        }
        //END();
        return true;
    }

    protected get_attributes(context: Context): this["attributes"] {
        return context.data.attributes.map((pointer) => {
            return LPointerTargetable.from(pointer)
        });
    }
    protected set_attributes(val: PackArr<this["attributes"]>, context: Context): boolean {
        const list = val.map((lItem) => { return Pointers.from(lItem) });
        const oldList = context.data.attributes;
        const diff = U.arrayDifference(oldList, list);
        //BEGIN();
        SetFieldAction.new(context.data, 'attributes', list, "", true);
        for (let id of diff.added) {
            SetFieldAction.new(id, 'father', context.data.id, '', true);
            SetFieldAction.new(id, 'parent', context.data.id, '+=', true);
        }
        for (let id of diff.removed as Pointer<DModelElement>[]) {
            SetFieldAction.new(id, 'father', undefined, '', true);
            const parent = DPointerTargetable.from(id).parent;
            U.arrayRemoveAll(parent, context.data.id);
            SetFieldAction.new(id, 'parent', parent, '', true);
        }
        //END();
        return true;
    }

    protected get_referencedBy(context: Context): this["referencedBy"] {
        return context.data.referencedBy.map((pointer) => {
            return LPointerTargetable.from(pointer)
        });
    }
    protected set_referencedBy(val: PackArr<this["referencedBy"]>, context: Context): boolean {
        const list = val.map((lItem) => { return Pointers.from(lItem) });
        SetFieldAction.new(context.data, 'referencedBy', list, "", true);
        return true;
    }

    protected get_extends(context: Context): this["extends"] {
        return context.data.extends.map((pointer) => {
            return LPointerTargetable.from(pointer)
        });
    }
    protected set_extends(val: PackArr<this["extends"]>, context: Context): boolean {
        const list = val.map((lItem) => { return Pointers.from(lItem) });
        SetFieldAction.new(context.data, 'extends', list, "", true);
        return true;
    }
    protected add_extends(val: PackArr<this["extends"]>, context: Context): void {
        let ptrs: Pointer<DClass> = Pointers.from(val) as any;
        SetFieldAction.new(context.data, 'extends', [...context.data.extends, ...ptrs], '', true);
    }

    protected remove_extends(val: PackArr<this["extends"]> | number | number[], context: Context): void {
        if (!Array.isArray(val)) val = [val];
        if (!val.length) return;
        let finalVal: D["extends"];
        if (typeof val[0] === "number") { finalVal = context.data.extends.filter((elem,index,arr)=> { return (val as any[]).includes(index); }); }
        else {
            finalVal = [...context.data.extends];
            let ptrs: Pointer<DClass> = Pointers.from(val as PackArr<this["extends"]>) as any;
            for (let v of ptrs) { U.arrayRemoveAll(finalVal, v); }
        }
        SetFieldAction.new(context.data, 'extends', finalVal, '', true);
    }

    protected get_extendedBy(context: Context): this["extendedBy"] {
        return context.data.extendedBy.map((pointer) => {
            return LPointerTargetable.from(pointer)
        });
    }
    protected set_extendedBy(val: PackArr<this["extendedBy"]>, context: Context): boolean {
        const list = val.map((lItem) => { return Pointers.from(lItem) });
        SetFieldAction.new(context.data, 'extendedBy', list, "", true);
        return true;
    }

    protected get_implements(context: Context): this["implements"] { return context.data.implements; }
    protected set_implements(val: this["implements"], context: Context): boolean {
        SetFieldAction.new(context.data, 'implements', val, "", true);
        return true;
    }

    protected get_implementedBy(context: Context): this["implementedBy"] { return context.data.implementedBy; }
    protected set_implementedBy(val: this["implementedBy"], context: Context): boolean {
        SetFieldAction.new(context.data, 'implementedBy', val, "", true);
        return true;
    }

    public superclasses!: LClass[];
    public allSubClasses!: LClass[];

    public canExtend(superclass: LClass, output: {reason: string, allTargetSuperClasses: LClass[]} = {reason: '', allTargetSuperClasses: []}): boolean {
        this.cannotCall("canExtend"); return false;
    }

    private get_canExtend(context: Context): (superclass: LClass, output: {reason: string, allTargetSuperClasses: LClass[]}) => boolean {
        return (superclass: LClass, output: {reason: string, allTargetSuperClasses: LClass[]} =
            {reason: '', allTargetSuperClasses: []}) => this._canExtend(context, superclass, output);
    }

    public isExtending(superclass: LClass, output: {reason: string, allTargetSuperClasses: LClass[]} = {reason: '', allTargetSuperClasses: []}): boolean {
        this.cannotCall("isExtending"); return false;
    }

    private get_isExtending(context: Context): this["isExtending"] {
         return null as any; // todo
    }

    private get_superclasses(context: Context, plusThis: boolean = false): LClass[] {
        let i: number;
        const thiss: LClass = context.proxyObject;
        const visited: Dictionary<Pointer, LClass> = {};
        let queue: LClass[] = thiss.extends;
        if (plusThis) queue = [thiss, ...queue];
        const ret: LClass[] = [];
        for (i = 0; i < queue.length; i++) {
            let elem: LClass = queue[i];
            if (visited[elem.id]) continue;
            visited[elem.id] = elem;
            ret.push(elem);
            queue.push(...elem.extends);
        }
        return ret;
    }

    private get_allSubClasses(context: Context, plusThis: boolean = false): LClass[] {
        const thiss: LClass = context.proxyObject;
        const set: Set<LClass> = plusThis ? new Set<LClass>([thiss]) : new Set();
        for (let i = 0; i < thiss.extendedBy.length; i++) {
            // todo: would this access get_extendedBy 2*N times?? verify and optimize
            U.SetMerge(true, set, thiss.extendedBy[i].allSubClasses); }
        return [...set]; }


    private _canExtend(context: Context, superclass: LClass, output: {reason: string, allTargetSuperClasses: LClass[]} = {reason: '', allTargetSuperClasses: []}): boolean {
        if (!superclass) { output.reason = 'Invalid extend target: ' + superclass; return false; }
        const thiss: LClass = context.proxyObject;
        if (superclass.id === thiss.id) { output.reason = 'Classes cannot extend themselves.'; return false; }
        // todo: se diversi proxy dello stesso oggetto sono considerati diversi questo fallisce, in tal caso fai thiss.extends.map( l => l.id).indexof(superclass.id)
        if (thiss.extends.map(sc=>sc.id).indexOf(superclass.id) >= 0) { output.reason = 'Target class is already directly extended.'; return false; }
        output.allTargetSuperClasses = superclass.superclasses;
        if (thiss.superclasses.map(sc=> sc.id).indexOf(superclass.id) >= 0) { output.reason = 'Target class is already indirectly extended.'; return false; }
        if (output.allTargetSuperClasses.map(sc=>sc.id).indexOf(thiss.id) >= 0) { output.reason = 'Cannot set this extend, it would cause a inheritance loop.'; return false; }
        if (thiss.interface && !superclass.interface) { output.reason = 'An interface cannot extend a class.'; return false; }
        // ora verifico se causa delle violazioni di override (attibuti omonimi string e boolean non possono overridarsi)
        let i: number;
        let j: number;
        let childrens: LOperation[] =  thiss.operations; //[...thiss.getBasicOperations()];
        let superchildrens: LOperation[] = superclass.operations; //[...superclass.getBasicOperations()];
        for (i = 0; i < childrens.length; i++) {
            let op: LOperation = childrens[i];
            for (j = 0; j < superchildrens.length; j++){
                let superchildren: LOperation = superchildrens[j];
                if (op.name !== superchildren.name) continue;
                if (op._canOverride(superchildren) || op._canPolymorph(superchildren)) continue;
                output.reason = 'Marked homonymous operations cannot override nor polymorph each others.';
                setTimeout( () => {
                    op._mark(true, superchildren, 'override'); //  mark op && superchildren
                    setTimeout( () => { op._mark(false, superchildren, 'override'); }, 3000); // unmark
                }, 1);
                return false;
            }
        }
        return true; }

    private _isExtending(context: Context, superclass: LClass, orEqual: boolean = true): boolean {
        if (!superclass) return false;
        return this.get_superclasses(context, orEqual).includes(superclass); }

    private add_Extends(context: Context, superclass: LClass, force: boolean = false): boolean {
        let out: {reason: string, allTargetSuperClasses: LClass[]} = {reason: '', allTargetSuperClasses: []};
        const thiss: LClass = context.proxyObject;
        if (!force && !this._canExtend(context, superclass, out)) {  return false; }
        SetFieldAction.new(thiss.__raw, 'extends', [superclass.id], '+=', true);
        SetFieldAction.new(superclass.__raw, 'extendedBy', [thiss.id], '+=', true);
        // const extendChildrens: LClass[] =  [thiss, ...thiss.superclasses];
        // console.log('calculateViolationsExtend childrens:'  + extendChildrens, this);
        // for (let extChild of extendChildrens) { extChild._checkViolations(false); } // after instances have their meta-class changed, they might need to change shape or values.
        return true; }

    unsetExtends(context: Context, superclass: LClass): void {
        if (!superclass) return;
        console.log('UnsetExtend:', context);
        // todo: when Object is loaded in m3, set him there for easy access.
        //  if (superclass.id === LClass.genericObjectid) { Log.w(true, 'Cannot un-extend "Object"'); return; }
        const thiss: LClass = context.proxyObject;
        let index: number = thiss.extends.indexOf(superclass);
        if (index < 0) return;

        let newextends = thiss.extends.map(l => l.id);
        let newextendedBy = superclass.extendedBy.map(l => l.id);
        U.arrayRemoveAll(newextends, superclass.id)
        U.arrayRemoveAll(newextendedBy, thiss.id)
        SetFieldAction.new(thiss, 'extends', (newextends), '', true); // -=
        SetFieldAction.new(superclass, 'extendedBy', (newextendedBy), '', true); // -=
        // todo: update instances for (i = 0; i < thiss.instances.length; i++) { thiss.instances[i].unsetExtends(superclass); }
        // todo: remove extend edge? here?

        // todo: check violations
        // const extendedby: LClass[] = [thiss, ...thiss.allSubClasses];
        // for (i = 0; i < extendedby.length; i++) { extendedby[i].checkViolations(true); }
    }

    public instance(): DObject { return this.cannotCall('instance'); }
    /*private get_instance_old(context: Context): () => DObject {
        return () => {
            const dClass: DClass = context.data;
            const lClass: LClass = LClass.from(dClass);
            const dObject = DObject.new(lClass.name.toLowerCase());
            CreateElementAction.new(dObject);
            BEGIN()
            SetFieldAction.new(dObject, 'instanceof', dClass.id, '', true);
            SetFieldAction.new(dClass, 'instances', dObject.id, '+=', true);

            // damiano: weird transaction placement. double-check it
            let father: LClass|undefined = lClass;
            while(father) {
                for(let dFeature of [...father.attributes, ...father.references]) {
                    const dValue = DValue.new(dFeature.name); dValue.value = [U.initializeValue(dFeature.type)];
                    CreateElementAction.new(dValue);

                    SetFieldAction.new(dValue, 'father', dObject.id, '', true);
                    SetFieldAction.new(dValue, 'instanceof', dFeature.id, '', true);
                    SetFieldAction.new(dFeature, 'instances', dValue.id, '+=', true);
                    SetFieldAction.new(dObject, 'features', dValue.id, '+=', true);

                }
                father = (father.extends.length > 0) ? father.extends[0] : undefined;
            }
            END()
            return dObject;
        };
    }*/

    protected get_delete(context: Context): () => void {
        const data = context.proxyObject;
        const ret = () => {
            const canBeDeleted = data.instances.length === 0;
            if(canBeDeleted) {
                const pointedBy = U.filteredPointedBy(data, 'type');
                for(let me of pointedBy) {
                    if(me) {
                        SetFieldAction.new(me.__raw as DReference, 'type', me.father.id, '', true);
                    }
                }
                for(let me of data.extends) {
                    SetFieldAction.new(me.__raw, 'extendedBy', me.__raw.extendedBy.indexOf(data.id), '-=', true);
                }
                for(let me of data.extendedBy) {
                    SetFieldAction.new(me.__raw, 'extends', me.__raw.extends.indexOf(data.id), '-=', true);
                }
                data.superDelete();
            } else { U.alert('error', 'Cannot delete the selected class since there are instances.'); }
        }
        return ret;
    }

}
DClassifier.subclasses.push(DClass);
LClassifier.subclasses.push(LClass);


@RuntimeAccessible
export class DDataType extends DPointerTargetable { // extends DClassifier
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    // static singleton: LDataType;
    // static logic: typeof LDataType;
    // static structure: typeof DDataType;

    // inherit redefine
    // instanceClass: EJavaClass // ?
    // isInstance(object: EJavaObject): boolean; ?
    // getClassifierID(): number;
    id!: Pointer<DDataType, 1, 1, LDataType>;
    instanceClassName!: string;
    parent: Pointer<DPackage, 0, 'N', LPackage> = [];
    father!: Pointer<DPackage, 1, 1, LPackage>;
    annotations: Pointer<DAnnotation, 0, 'N', LAnnotation> = [];
    name!: string;
    defaultValue!: Pointer<DObject, 1, 1, LObject>[] | string[];
    // personal
    serializable: boolean = true;
    // usedBy: Pointer<DAttribute, 0, 'N', LAttribute> = [];


    public static new(name?: DNamedElement["name"], father?: Pointer, persist: boolean = true): DDataType {
        Log.exx("DDataType is abstract, cannot instantiate");
        return null as any;
        // if (!name) name = this.defaultname("datatype_", father);
        // return new Constructors(new DDataType('dwc'), father, persist, undefined).DPointerTargetable().DModelElement().DNamedElement(name).DClassifier().DDataType().end();
    }
}

@Abstract
@RuntimeAccessible
export class LDataType<Context extends LogicContext<DDataType> = any, C extends Context = Context> extends LClassifier { // extends DClassifier
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    public __raw!: DDataType;
    id!: Pointer<DDataType, 1, 1, LDataType>;
    // static singleton: LDataType;
    // static logic: typeof LDataType;
    // static structure: typeof DDataType;

    // inherit redefine
    // instanceClass: EJavaClass // ?
    // isInstance(object: EJavaObject): boolean; ?
    // getClassifierID(): number;
    instanceClassName!: string;
    parent!: LPackage[];
    father!: LPackage;
    annotations!: LAnnotation[];
    name!: string;
    namespace!: string;
    defaultValue!: LObject[] | string[];
    isPrimitive!: false;
    isClass!: false;
    isEnum!: true;
    // personal
    serializable!: boolean;


    protected get_serializable(context: Context): this["serializable"] { return context.data.serializable; }
    protected set_serializable(val: this["serializable"], context: Context): boolean {
        SetFieldAction.new(context.data, 'serializable', val);
        return true;
    }

}

DClassifier.subclasses.push(DDataType);
LClassifier.subclasses.push(LDataType);





@RuntimeAccessible
export class DStructuralFeature extends DPointerTargetable { // DTypedElement
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    // static singleton: LStructuralFeature;
    // static logic: typeof LStructuralFeature;
    // static structure: typeof DStructuralFeature;

    // inherit redefine
    id!: Pointer<DStructuralFeature, 1, 1, LStructuralFeature>;
    annotations: Pointer<DAnnotation, 0, 'N', LAnnotation> = [];
    parent: Pointer<DClass, 0, 'N', LClass> = [];
    father!: Pointer<DClass, 1, 1, LClass>;
    name!: string;
    type!: Pointer<DClassifier, 1, 1, LClassifier>;
    ordered: boolean = true;
    unique: boolean = true;
    lowerBound: number = 0;
    upperBound: number = 1;
    many!: boolean;
    required!: boolean;
    // personal
    instances: Pointer<DValue, 0, 'N', LValue> = [];
    changeable: boolean = true;
    volatile: boolean = true;
    transient: boolean = false;
    unsettable: boolean = false;
    derived: boolean = false;
    defaultValue!: (Pointer<DObject, 1, 1, LObject> | PrimitiveType)[];

    public static new(name?: DNamedElement["name"], type?: DTypedElement["type"], father?: Pointer, persist: boolean = true): DStructuralFeature {
        Log.exx("DStructuralFeature is abstract, cannot instantiate");
        return null as any;
        // if (!name) name = this.defaultname("feature ", father);
        // return new Constructors(new DStructuralFeature('dwc'), father, persist, undefined).DPointerTargetable().DModelElement().DNamedElement(name).DTypedElement(type).DStructuralFeature().end();
    }
    // getFeatureID(): number;
    // getContainerClass(): EJavaClass
}

@Abstract
@RuntimeAccessible
export class LStructuralFeature<Context extends LogicContext<DStructuralFeature> = any, C extends Context = Context>  extends LTypedElement { // DTypedElement
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    public __raw!: DStructuralFeature;
    id!: Pointer<DStructuralFeature, 1, 1, LStructuralFeature>;
    // static singleton: LStructuralFeature;
    // static logic: typeof LStructuralFeature;
    // static structure: typeof DStructuralFeature;

    // inherit redefine
    annotations!: LAnnotation[];
    parent!: LClass[];
    father!: LClass;
    name!: string;
    namespace!: string;
    type!: LClassifier;
    ordered: boolean = true;
    unique: boolean = true;
    lowerBound: number = 0;
    upperBound: number = 1;
    many!: boolean;
    required!: boolean;
    // personal
    instances!: LValue[];
    changeable!: boolean;
    volatile!: boolean;
    transient!: boolean;
    unsettable!: boolean;
    derived!: boolean;
    // defaultValueLiteral!: string;
    defaultValue!: (LObject[] | PrimitiveType[]);
    // getFeatureID(): number;
    // getContainerClass(): EJavaClass

    protected get_instances(context: Context): this["instances"] {
        return context.data.instances.map((pointer) => {
            return LPointerTargetable.from(pointer)
        });
    }
    protected set_instances(val: PackArr<this["instances"]>, context: Context): boolean {
        const list = val.map((lItem) => { return Pointers.from(lItem) });
        SetFieldAction.new(context.data, 'instances', list, "", true);
        return true;
    }

    protected get_changeable(context: Context): this["changeable"] { return context.data.changeable; }
    protected set_changeable(val: this["changeable"], context: Context): boolean {
        SetFieldAction.new(context.data, 'changeable', val);
        return true;
    }

    protected get_volatile(context: Context): this["volatile"] { return context.data.volatile; }
    protected set_volatile(val: this["volatile"], context: Context): boolean {
        SetFieldAction.new(context.data, 'volatile', val);
        return true;
    }

    protected get_transient(context: Context): this["transient"] { return context.data.transient; }
    protected set_transient(val: this["transient"], context: Context): boolean {
        SetFieldAction.new(context.data, 'transient', val);
        return true;
    }

    protected get_unsettable(context: Context): this["unsettable"] { return context.data.unsettable; }
    protected set_unsettable(val: this["unsettable"], context: Context): boolean {
        SetFieldAction.new(context.data, 'unsettable', val);
        return true;
    }

    protected get_derived(context: Context): this["derived"] { return context.data.derived; }
    protected set_derived(val: this["derived"], context: Context): boolean {
        SetFieldAction.new(context.data, 'derived', val);
        return true;
    }

    protected get_delete(context: Context): () => void {
        const data = context.proxyObject;
        const ret = () => {
            for(let instance of data.instances) { instance.delete(); }
            data.superDelete();
        }
        return ret;
    }
    /*
        protected get_defaultValueLiteral(context: Context): this["defaultValueLiteral"] { return context.data.defaultValueLiteral; }
        protected set_defaultValueLiteral(val: this["defaultValueLiteral"], context: Context): boolean {
            SetFieldAction.new(context.data, 'defaultValueLiteral', val, "", false);
            return true;
        }*/
}
DTypedElement.subclasses.push(DStructuralFeature);
LTypedElement.subclasses.push(LStructuralFeature);


@RuntimeAccessible
export class DReference extends DPointerTargetable { // DStructuralFeature
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    // static singleton: LReference;
    // static logic: typeof LReference;
    // static structure: typeof DReference;


    // inherit redefine
    id!: Pointer<DReference, 1, 1, LReference>;
    annotations: Pointer<DAnnotation, 0, 'N', LAnnotation> = [];
    name!: string;
    type!: Pointer<DClassifier, 1, 1, LClassifier>;
    ordered: boolean = true;
    unique: boolean = true;
    lowerBound: number = 0;
    upperBound: number = 1;
    many!: boolean;
    required!: boolean;
    changeable: boolean = true;
    volatile: boolean = true;
    transient: boolean = false;
    unsettable: boolean = false;
    derived: boolean = false;
    defaultValueLiteral!: string;
    parent: Pointer<DClass, 0, 'N', LClass> = [];
    father!: Pointer<DClass, 1, 1, LClass>;
    instances: Pointer<DValue, 0, 'N', LValue> = [];
    defaultValue!: Pointer<DObject, 1, 1, LObject>[];

    // personal
    containment: boolean = false;
    container: boolean = false; // ?
    resolveProxies: boolean = true; // ?
    opposite!: Pointer<DReference, 0, 1, LReference>;
    target: Pointer<DClass, 0, 'N', LClass> = [];
    edges: Pointer<DEdge, 0, 'N', LEdge> = [];

    public static new(name?: DReference["name"], type?: DReference["type"], father?: DReference["father"], persist: boolean = true): DReference {
        if (!type) type = father // default type is self-reference
        if (!name) name = this.defaultname("ref_", father);
        return new Constructors(new DReference('dwc'), father, persist, undefined).DPointerTargetable().DModelElement()
            .DNamedElement(name).DTypedElement(type).DStructuralFeature().DReference().end();
    }

}

@Instantiable // LValue
@Leaf
@RuntimeAccessible
export class LReference<Context extends LogicContext<DReference> = any, C extends Context = Context, D extends DReference = DReference>  extends LStructuralFeature {
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    public __raw!: DReference;
    id!: Pointer<DReference, 1, 1, LReference>;
    // static singleton: LReference;
    // static logic: typeof LReference;
    // static structure: typeof DReference;

    // inherit redefine
    annotations!: LAnnotation[];
    name!: string;
    namespace!: string;
    type!: LClass;
    ordered!: boolean;
    unique!: boolean;
    lowerBound!: number;
    upperBound!: number;
    many!: boolean;
    required!: boolean;
    changeable!: boolean;
    volatile!: boolean;
    transient!: boolean;
    unsettable!: boolean;
    derived!: boolean;
    defaultValueLiteral!: string;
    parent!: LClass[];
    father!: LClass;
    instances!: LValue[];
    defaultValue!: LObject[];

    // personal
    containment!: boolean;
    container!: boolean; //??
    resolveProxies!: boolean;
    opposite?: LReference;
    target!: LClass[];
    edges!: LEdge[];



    protected generateEcoreJson_impl(context: Context, loopDetectionObj: Dictionary<Pointer, DModelElement> = {}): Json {
        loopDetectionObj[context.data.id] = context.data;
        const model: GObject = {};
        const d = context.data;
        const l = context.proxyObject;
        model[ECoreReference.xsitype] = 'ecore:EReference';
        model[ECoreReference.eType] = l.type.typeEcoreString;
        model[ECoreReference.namee] = d.name;
        if (d.lowerBound != null && !isNaN(+d.lowerBound)) { model[ECoreReference.lowerbound] = +d.lowerBound; }
        if (d.upperBound != null && !isNaN(+d.upperBound)) { model[ECoreReference.upperbound] = +d.upperBound; }
        if (d.containment != null) { model[ECoreReference.containment] = d.containment; }
        return model; }

    public duplicate(deep: boolean = true): this { return this.cannotCall( this.constructor.name + "duplicate()"); }
    protected get_duplicate(context: Context): ((deep?: boolean) => this) {
        return (deep: boolean = false) => {
            BEGIN()
            let de: D = context.proxyObject.father.addReference(context.data.name, context.data.type) as D;
            de.many = context.data.many;
            de.lowerBound = context.data.lowerBound;
            de.upperBound = context.data.upperBound;
            de.ordered = context.data.ordered;
            de.required = context.data.required;
            de.unique = context.data.unique;
            de.changeable = context.data.changeable;
            de.container = context.data.container;
            de.containment = context.data.containment;
            de.defaultValueLiteral = context.data.defaultValueLiteral;
            de.derived = context.data.derived;
            de.transient = context.data.transient;
            de.unsettable = context.data.unsettable;
            de.volatile = context.data.unsettable;
            let le: this = LPointerTargetable.fromD(de);
            let we: WReference = le as any;
            we.opposite = context.data.opposite || undefined;
            we.defaultValue = context.data.defaultValue;
            we.type = context.data.type;
            we.annotations = deep ? context.proxyObject.annotations.map(lchild => lchild.duplicate(deep).id) : context.data.annotations;
            we.target = deep ? context.proxyObject.target.map(lchild => lchild.duplicate(deep).id) : context.data.target;
            END()
            return le; }
    }

    public addClass(name?: DClass["name"], isInterface?: DClass["interface"], isAbstract?: DClass["abstract"], isPrimitive?: DClass["isPrimitive"],
                    isPartial?: DClass["partial"], partialDefaultName?: DClass["partialdefaultname"]): DClass {
        return this.cannotCall("LReference.addClass"); }
    protected get_addClass(context: Context): this["addClass"] {
        return (name?: DClass["name"], isInterface?: DClass["interface"], isAbstract?: DClass["abstract"], isPrimitive?: DClass["isPrimitive"],
                isPartial?: DClass["partial"], partialDefaultName?: DClass["partialdefaultname"]) => {
            BEGIN()
            let dclass = DClass.new(name, isInterface, isAbstract, isPrimitive, isPartial, partialDefaultName, context.proxyObject.package!.id, true);
            // SetFieldAction.new(context.data.id, "type", dclass.id);
            this.set_type(dclass.id as any, context);
            END();
            return dclass;
        } }


    protected get_containment(context: Context): this["containment"] { return context.data.containment; }
    protected set_containment(val: this["containment"], context: Context): boolean {
        SetFieldAction.new(context.data, 'containment', val);
        return true;
    }

    protected get_container(context: Context): this["container"] { return context.data.container; }
    protected set_container(val: this["container"], context: Context): boolean {
        SetFieldAction.new(context.data, 'container', val);
        return true;
    }

    protected get_resolveProxies(context: Context): this["resolveProxies"] { return context.data.resolveProxies; }
    protected set_resolveProxies(val: this["resolveProxies"], context: Context): boolean {
        SetFieldAction.new(context.data, 'resolveProxies', val);
        return true;
    }

    protected get_opposite(context: Context): this["opposite"] { return LPointerTargetable.from(context.data.opposite); }
    protected set_opposite(val: Pack<LReference | undefined>, context: Context): boolean {
        SetFieldAction.new(context.data, 'opposite', Pointers.from(val) as any as LAnnotation["id"], "", true);
        return true;
    }

    /// todo: why this exist?  why not type?
    protected get_target(context: Context): this["target"] { return context.data.target.map(pointer => LPointerTargetable.from(pointer)); }
    protected set_target(val: PackArr<this["target"]>, context: Context): boolean {
        const list = val.map((lItem) => { return Pointers.from(lItem) });
        SetFieldAction.new(context.data, 'target', list, "", true);
        return true;
    }

    protected get_defaultValue(context: Context): this["defaultValue"] { return LPointerTargetable.fromPointer(context.data.defaultValue); }
    protected set_defaultValue(val: PackArr<this["defaultValue"]>, context: Context): boolean {
        // @ts-ignore
        if (!val) (val) = []; else if (!Array.isArray(val)) val = [val];
        let ptrs = Pointers.from(val);
        SetFieldAction.new(context.data, 'defaultValue', ptrs, '', false);
        return true; }

    protected get_edges(context: Context): this["edges"] {
        return context.data.edges.map((pointer) => {
            return LPointerTargetable.from(pointer)
        });
    }
    protected set_edges(val: PackArr<this["edges"]>, context: Context): boolean {
        const list = val.map((lItem) => { return Pointers.from(lItem) });
        SetFieldAction.new(context.data, 'edges', list, "", true);
        return true;
    }
}
DStructuralFeature.subclasses.push(DReference);
LStructuralFeature.subclasses.push(LReference);


function has_opposite(oppositename: string, ...comments: string[]): any {
    // return (c:Constructor, key:string, ):any =>{}
}
function obsolete_attribute(...comments: string[]) {
    return undefined as any; // function(c:Constructor, key:string,): any {}
}

@RuntimeAccessible
export class DAttribute extends DPointerTargetable { // DStructuralFeature
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    // static singleton: LAttribute;
    // static logic: typeof LAttribute;
    // static structure: typeof DAttribute;

    // inherit redefine
    id!: Pointer<DAttribute, 1, 1, LAttribute>;
    // @has_opposite("father")
    annotations: Pointer<DAnnotation, 0, 'N', LAnnotation> = [];
    name!: string;
    type!: Pointer<DClassifier, 1, 1, LClassifier>;
    ordered: boolean = true;
    unique: boolean = true;
    lowerBound: number = 0;
    upperBound: number = 1;
    many!: boolean;
    required!: boolean;
    changeable: boolean = true;
    volatile: boolean = true;
    transient: boolean = false;
    unsettable: boolean = false;
    derived: boolean = false;
    defaultValueLiteral!: string;
    //@obsolete_attribute()
    parent: Pointer<DClass, 0, 'N', LClass> = [];

    //@has_opposite("attributes")
    father!: Pointer<DClass, 1, 1, LClass>;

    //@has_opposite("instanceof")
    instances: Pointer<DValue, 0, 'N', LValue> = [];
    defaultValue!: PrimitiveType[];

    // personal
    isID: boolean = false; // ? exist in ecore as "iD" ?

    public static new(name?: DAttribute["name"], type?: DAttribute["type"], father?: DAttribute["father"], persist: boolean = true): DAttribute {
        if (!name) name = this.defaultname("attr_", father);
        if (!type) type = LPointerTargetable.from(Selectors.getFirstPrimitiveTypes()).id; // default type as string
        return new Constructors(new DAttribute('dwc'), father, persist, undefined).DPointerTargetable().DModelElement()
            .DNamedElement(name).DTypedElement(type).DStructuralFeature().DAttribute().end();
    }
}

@Leaf
@Instantiable // (LValue)
@RuntimeAccessible
export class LAttribute <Context extends LogicContext<DAttribute> = any, C extends Context = Context, D extends DAttribute = DAttribute> extends LStructuralFeature { // DStructuralFeature
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    public __raw!: DAttribute;
    id!: Pointer<DAttribute, 1, 1, LAttribute>;
    // static singleton: LAttribute;
    // static logic: typeof LAttribute;
    // static structure: typeof DAttribute;

    // inherit redefine
    annotations!: LAnnotation[];
    name!: string;
    namespace!: string;
    type!: LClassifier;
    ordered!: boolean;
    unique!: boolean;
    lowerBound!: number;
    upperBound!: number;
    many!: boolean;
    required!: boolean;
    changeable!: boolean;
    volatile!: boolean;
    transient!: boolean;
    unsettable!: boolean;
    derived!: boolean;
    // defaultValueLiteral!: string;
    defaultValue!: PrimitiveType[];
    parent!: LClass[];
    father!: LClass;
    instances!: LValue[];

    // personal
    isID: boolean = false; // ? exist in ecore as "iD" ?

    protected generateEcoreJson_impl(context: Context, loopDetectionObj: Dictionary<Pointer, DModelElement> = {}): Json {
        loopDetectionObj[context.data.id] = context.data;
        const model = {};
        const d = context.data;
        const l = context.proxyObject;
        EcoreParser.write(model, ECoreAttribute.xsitype, 'ecore:EAttribute');
        EcoreParser.write(model, ECoreAttribute.eType, l.type.typeEcoreString);
        EcoreParser.write(model, ECoreAttribute.namee, d.name);
        EcoreParser.write(model, ECoreAttribute.lowerbound, '' + d.lowerBound);
        EcoreParser.write(model, ECoreAttribute.upperbound, '' + d.upperBound);
        return model; }


    public duplicate(deep: boolean = true): this { return this.cannotCall( this.constructor.name + "duplicate()"); }
    protected get_duplicate(context: Context): ((deep?: boolean) => this) {
        return (deep: boolean = false) => {
            BEGIN()
            let de: D = context.proxyObject.father.addAttribute(context.data.name, context.data.type) as D;
            de.many = context.data.many;
            de.lowerBound = context.data.lowerBound;
            de.upperBound = context.data.upperBound;
            de.ordered = context.data.ordered;
            de.required = context.data.required;
            de.unique = context.data.unique;
            de.changeable = context.data.changeable;
            de.defaultValue = context.data.defaultValue;
            de.defaultValueLiteral = context.data.defaultValueLiteral;
            de.derived = context.data.derived;
            de.transient = context.data.transient;
            de.unsettable = context.data.unsettable;
            de.volatile = context.data.volatile;
            de.isID = context.data.isID
            let le: this = LPointerTargetable.fromD(de);
            let we: WAttribute = le as any;
            we.type = context.data.type;
            we.annotations = deep ? context.proxyObject.annotations.map(lchild => lchild.duplicate(deep).id) : context.data.annotations;
            END()
            return le; }
    }

    public addEnum(...p:Parameters<this["addEnumerator"]>): DEnumerator { return this.addEnumerator(...p); }
    protected get_addEnum(context: Context): this["addEnumerator"] { return this.get_addEnumerator(context); }
    public addEnumerator(name?: DEnumerator["name"], father?: DEnumerator["father"]): DEnumerator { return this.cannotCall("Attribute.addEnumerator"); }
    protected get_addEnumerator(context: Context): this["addEnumerator"] {
        return (name?: DEnumerator["name"], father?: DEnumerator["father"]) => DEnumerator.new(name, context.proxyObject.package?.id, true); }

    protected get_ID(context: Context): this["isID"] { return context.data.isID; }
    protected set_ID(val: this["isID"], context: Context): boolean {
        SetFieldAction.new(context.data, 'isID', val);
        return true;
    }
    protected get_defaultValue(context: Context): this["defaultValue"] { return context.data.defaultValue; }
    protected set_defaultValue(val: unArr<this["defaultValue"]>, context: Context): boolean {
        // @ts-ignore
        if (!val) (val) = []; else if (!Array.isArray(val)) val = [val];
        SetFieldAction.new(context.data, 'defaultValue', val, '', false);
        return true; }

}
DStructuralFeature.subclasses.push(DAttribute);
LStructuralFeature.subclasses.push(LAttribute);

@Leaf
@RuntimeAccessible
export class DEnumLiteral extends DPointerTargetable { // DNamedElement
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    // static singleton: LAttribute;
    // static logic: typeof LAttribute;
    // static structure: typeof DAttribute;

    // inherit redefine
    id!: Pointer<DEnumLiteral, 1, 1, LEnumLiteral>;
    parent: Pointer<DEnumerator, 0, 'N', LEnumerator> = [];
    father!: Pointer<DEnumerator, 1, 1, LEnumerator>;
    annotations: Pointer<DAnnotation, 0, 'N', LAnnotation> = [];
    name!: string;
    // personal
    value: number = 0;
    ordinal: number=1;
    literal!: string;

    public static new(name?: DNamedElement["name"], value: DEnumLiteral["value"] = 0, father?: Pointer, persist: boolean = true): DEnumLiteral {
        if (!name) name = this.defaultname("literal ", father);
        return new Constructors(new DEnumLiteral('dwc'), father, persist, undefined).DPointerTargetable().DModelElement()
            .DNamedElement(name).DEnumLiteral(value).end();
    }
}

@Leaf
@RuntimeAccessible
export class LEnumLiteral<Context extends LogicContext<DEnumLiteral> = any, C extends Context = Context, D extends DEnumLiteral = DEnumLiteral>  extends LNamedElement { // DNamedElement
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    public __raw!: DEnumLiteral;
    id!: Pointer<DEnumLiteral, 1, 1, LEnumLiteral>;
    // static singleton: LAttribute;
    // static logic: typeof LAttribute;
    // static structure: typeof DAttribute;

    // inherit redefine
    parent!: LEnumerator[];
    father!: LEnumerator;
    annotations!: LAnnotation[];
    name!: string;
    namespace!: string;
    // personal
    value!: number;
    ordinal!: number;
    literal!: string;

    protected generateEcoreJson_impl(context: Context, loopDetectionObj: Dictionary<Pointer, DModelElement> = {}): Json {
        loopDetectionObj[context.data.id] = context.data;
        const json: Json = {};
        const d = context.data;
        json[EcoreLiteral.value] = d.ordinal;
        json[EcoreLiteral.literal] = d.literal;
        json[EcoreLiteral.namee] = d.name;
        return json; }

    public duplicate(deep: boolean = true): this { return this.cannotCall( this.constructor.name + "duplicate()"); }
    protected get_duplicate(context: Context): ((deep?: boolean) => this) {
        return (deep: boolean = false) => {
            BEGIN()
            let de: D = context.proxyObject.father.addLiteral(context.data.name, context.data.value) as D;
            de.literal = context.data.literal;
            de.ordinal = context.data.ordinal;
            let le: this = LPointerTargetable.fromD(de);
            let we: WEnumLiteral = le as any;
            we.annotations = deep ? context.proxyObject.annotations.map(lchild => lchild.duplicate(deep).id) : context.data.annotations;
            END()
            return le; }
    }


    protected get_value(context: Context): this["value"] { return context.data.value; }
    protected set_value(val: this["value"], context: Context): boolean {
        SetFieldAction.new(context.data, 'value', val);
        return true;
    }

}
DNamedElement.subclasses.push(DEnumLiteral);
LNamedElement.subclasses.push(LEnumLiteral);

@Leaf
@RuntimeAccessible
export class DEnumerator extends DPointerTargetable { // DDataType
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    // static singleton: LEnumerator;
    // static logic: typeof LEnumerator;
    // static structure: typeof DEnumerator;

    // inherit redefine
    // instanceClass: EJavaClass // ?
    // isInstance(object: EJavaObject): boolean; ?
    // getClassifierID(): number;
    id!: Pointer<DEnumerator, 1, 1, LEnumerator>;
    instanceClassName!: string;
    parent: Pointer<DPackage, 0, 'N', LPackage> = [];
    father!: Pointer<DPackage, 1, 1, LPackage>;
    annotations: Pointer<DAnnotation, 0, 'N', LAnnotation> = [];
    name!: string;
    defaultValue!: string[];
    serializable: boolean = true;
    // usedBy: Pointer<DAttribute, 0, 'N', LAttribute> = []; obsolete?
    // personal
    literals: Pointer<DEnumLiteral, 0, 'N', LEnumLiteral> = [];

    public static new(name?: DNamedElement["name"], father?: DEnumerator["father"], persist: boolean = true): DEnumerator {
        if (!name) name = this.defaultname("enum ", father);
        return new Constructors(new DEnumerator('dwc'), father, persist, undefined).DPointerTargetable().DModelElement()
            .DNamedElement(name).DEnumerator().end();
    }
}

@Node
@RuntimeAccessible
export class LEnumerator<Context extends LogicContext<DEnumerator> = any, C extends Context = Context, D extends DEnumerator = DEnumerator> extends LDataType { // DDataType
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    public __raw!: DEnumerator;
    id!: Pointer<DEnumerator, 1, 1, LEnumerator>;
    // static singleton: LEnumerator;
    // static logic: typeof LEnumerator;
    // static structure: typeof DEnumerator;

    // inherit redefine
    // instanceClass: EJavaClass // ?
    // isInstance(object: EJavaObject): boolean; ?
    // getClassifierID(): number;
    instanceClassName!: string;
    parent!: LPackage [];
    father!: LPackage;
    annotations!: LAnnotation[];
    name!: string;
    namespace!: string;
    defaultValue!:string[];
    serializable!: boolean;
    // usedBy!: LAttribute[];
    isPrimitive!: false;
    isClass!: false;
    isEnum!: true;
    // personal
    literals!: LEnumLiteral[];

    protected generateEcoreJson_impl(context: Context, loopDetectionObj: Dictionary<Pointer, DModelElement> = {}): Json {
        loopDetectionObj[context.data.id] = context.data;
        const json: Json = {};
        let d = context.data;
        if (d.instanceClassName) json[ECoreEnum.instanceTypeName] = d.instanceClassName;
        json[ECoreEnum.xsitype] = 'ecore:EEnum';
        json[ECoreEnum.namee] = d.name;
        json[ECoreEnum.serializable] = d.serializable ? "true" : "false";
        json[ECoreEnum.eLiterals] = context.proxyObject.literals.map(l => l.generateEcoreJson(loopDetectionObj));
        return json; }

    public duplicate(deep: boolean = true): this { return this.cannotCall( this.constructor.name + "duplicate()"); }
    protected get_duplicate(context: Context): ((deep?: boolean) => this) {
        return (deep: boolean = false) => {
            BEGIN()
            let de: D = context.proxyObject.father.addEnumerator(context.data.name) as D;
            de.defaultValue = context.data.defaultValue;
            de.serializable = context.data.serializable;
            let le: this = LPointerTargetable.fromD(de);
            let we: WEnumerator = le as any;
            we.annotations = deep ? context.proxyObject.annotations.map(lchild => lchild.duplicate(deep).id) : context.data.annotations;
            we.literals = deep ? context.proxyObject.literals.map(lchild => lchild.duplicate(deep).id) : context.data.literals;
            END()
            return le; }
    }


    protected get_childrens_idlist(context: Context): Pointer<DAnnotation | DEnumLiteral, 1, 'N'> {
        return [...super.get_childrens_idlist(context) as Pointer<DAnnotation | DEnumLiteral, 1, 'N'>, ...context.data.literals]; }

    public addLiteral(name?: DEnumLiteral["name"], value?: DEnumLiteral["value"]): DEnumLiteral { return this.cannotCall("addLiteral"); }
    protected get_addLiteral(context: Context): this["addLiteral"] {
        return (name?: DEnumLiteral["name"], value?: DEnumLiteral["value"]) => DEnumLiteral.new(name, value, context.data.id, true); }

    protected get_literals(context: Context): this["literals"] {
        return context.data.literals.map((pointer) => {
            return LPointerTargetable.from(pointer)
        });
    }
    protected set_literals(val: PackArr<this["literals"]>, context: Context): boolean {
        const list = val.map((lItem) => { return Pointers.from(lItem) });
        const oldList = context.data.literals;
        const diff = U.arrayDifference(oldList, list);
        BEGIN();
        SetFieldAction.new(context.data, 'literals', list, "", true);
        for (let id of diff.added) {
            SetFieldAction.new(id, 'father', context.data.id, '', true);
            SetFieldAction.new(id, 'parent', context.data.id, '+=', true);
        }
        for (let id of diff.removed as Pointer<DModelElement>[]) {
            SetFieldAction.new(id, 'father', undefined, '', true);
            const parent = DPointerTargetable.from(id).parent;
            U.arrayRemoveAll(parent, context.data.id);
            SetFieldAction.new(id, 'parent', parent, '', true);
        }
        END();
        return true;
    }
    protected get_delete(context: Context): () => void {
        const data = context.proxyObject;
        const ret = () => {
            const pointedBy = U.filteredPointedBy(data, 'type');
            for(let me of pointedBy) {
                if (me) {
                    const dString = Selectors.getFirstPrimitiveTypes();
                    SetFieldAction.new(me.__raw as DAttribute, 'type', dString.id, '', true);
                }
            }
            data.superDelete();
        }
        return ret;
    }
}
DDataType.subclasses.push(DEnumerator);
LDataType.subclasses.push(LEnumerator);


@RuntimeAccessible
export class DModelM1 extends DNamedElement{
    name!: string;
    roots!: Pointer<DObject, 1, 'N', LObject> // no package ma LObjects[] (solo quelli isRoot)
    childrens!: DModelM1["roots"];
}

@RuntimeAccessible
export class LModelM1 extends LNamedElement{
    name!: string;
    roots!: LObject[];
    childrens!: LModelM1["roots"];

}
DModelM1.subclasses.push(DNamedElement);
LModelM1.subclasses.push(LNamedElement);
type DPrimitiveType = DClass;
type LPrimitiveType = LClass;


// problema: o costringo l'utente a fare sempre .value per ricevere il valore invece dei metadati
// oppure ritorno il valore da subito ma dal valore non posso accedere ai metadati (upperbound...) a meno che non trovi un altor sistema.

// possibile fix: LValue.toString() che ritorna il .value





@RuntimeAccessible
export class DModel extends DNamedElement { // DNamedElement
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    // static singleton: LModel;
    // static logic: typeof LModel;
    // static structure: typeof DModel;

    // inherit redefine
    id!: Pointer<DModel, 1, 1, LModel>;
    parent: Pointer<DModelElement, 0, 'N', LModelElement> = [];
    father!: Pointer<DModelElement, 1, 1, LModelElement>;
    annotations: Pointer<DAnnotation, 0, 'N', LAnnotation> = [];
    name!: string;
    // personal
    packages: Pointer<DPackage, 0, 'N', LPackage> = [];
    isMetamodel: boolean = true;
    objects: Pointer<DObject, 0, 'N', LObject> = [];
    models: Pointer<DModel, 0, 'N', LModel> = [];
    instanceof!: Pointer<DModel, 0, 1, LModel>;

    public static new(name?: DNamedElement["name"], instanceoff?: DModel["instanceof"], isMetamodel?: DModel["isMetamodel"], persist: boolean = true): DModel {
        let dmodels: DModel[] = Selectors.getAll(DModel, undefined, undefined, true, false);
        console.log("post get all");
        let dmodelnames: string[] = dmodels.map((d: DModel) => d.name);
        if (!name) name = this.defaultname("model_", ((name: string) => dmodelnames.includes(name)));
        return new Constructors(new DModel('dwc'), undefined, persist, undefined).DPointerTargetable().DModelElement()
            .DNamedElement(name).DModel(instanceoff, isMetamodel).end();
    }
}

@RuntimeAccessible
export class LModel<Context extends LogicContext<DModel> = any, C extends Context = Context, D extends DModel = DModel> extends LNamedElement {
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    public __raw!: DModel;
    id!: Pointer<DModel, 1, 1, LModel>;
    // static singleton: LModel;
    // static logic: typeof LModel;
    // static structure: typeof DModel;

    // inherit redefine
    parent!: LModel[];
    father!: LModel;
    annotations!: LAnnotation[];
    name!: string;
    namespace!: string;
    // personal
    isMetamodel!: boolean;

    // Metamodel
    packages!: LPackage[];
    models!: LModel[];

    // Model
    instanceof?: LModel;
    objects!: LObject[];
    roots!: LObject[];

    // utilities to go down in the tree (plural names)
    enums!: LEnumerator[] | null;
    classes!: LClass[] | null;
    operations!: LOperation[] | null;
    parameters!: LParameter[] | null;
    exceptions!: LClassifier[] | null;
    attributes!: LAttribute[] | null;
    references!: LReference[] | null;
    literals!: LEnumLiteral[] | null;
    allSubAnnotations!: LAnnotation[] | null;
    allSubPackages!: LPackage[] | null;

    protected generateEcoreJson_impl(context: Context, loopDetectionObj: Dictionary<Pointer, DModelElement> = {}): Json {
        loopDetectionObj[context.data.id] = context.data;
        const json: GObject = {};

        // if it's M2 metamodel
        if (context.data.isMetamodel) {
            const packageArr: Json[] = [];
            for (let pkg of context.proxyObject.packages) { packageArr.push(pkg.generateEcoreJson(loopDetectionObj)); }
            // return (context.proxyObject.packages[0])?.generateEcoreJson(loopDetectionObj);
            json[ECoreRoot.ecoreEPackage] = packageArr;
            return json;
        }

        // if it's M1 model
        // let serializeasroot = context.proxyObject.isRoot && loopDetectionObj.length; // if rootobj is nested because you started the serialization from another node, i prevent it generating root content
        for (let obj of context.proxyObject.roots) { json[obj.ecoreRootName] = obj.generateEcoreJson(loopDetectionObj); }

        return json; }

    public addPackage(name?: DPackage["name"], uri?: DPackage["uri"], prefix?: DPackage["prefix"]): DPackage { return this.cannotCall("addPackage"); }
    public get_addPackage(context: Context): ((name?: DPackage["name"], uri?: DPackage["uri"], prefix?: DPackage["prefix"]) => DPackage) {
        return (name?: DPackage["name"], uri?: DPackage["uri"], prefix?: DPackage["prefix"]) => DPackage.new(name, uri, prefix, context.data.id, true, DModel); }

    public addObject(instanceoff?:DObject["instanceof"], name?: DObject["name"]): DObject { return this.cannotCall("addObject"); }
    protected get_addObject(context: Context): this["addObject"] {
        return (instanceoff?:DObject["instanceof"], name?: DObject["name"]) =>
            DObject.new(instanceoff, context.data.id, DModel, undefined, true); }

    protected get_models(context: Context): LModel[] {
        return LModel.fromPointer(context.data.models);
    }
    protected set_models(val: PackArr<this['models']>, context: Context): boolean {
        const list = val.map((lItem) => { return Pointers.from(lItem) });
        const oldList = context.data.models;
        const diff = U.arrayDifference(oldList, list);
        BEGIN();
        SetFieldAction.new(context.data, 'models', list, '', true);
        for (let id of diff.added) {
            SetFieldAction.new(id, 'father', context.data.id, '', true);
            SetFieldAction.new(id, 'parent', context.data.id, '+=', true);
        }
        for (let id of diff.removed as Pointer<DModelElement>[]) {
            SetFieldAction.new(id, 'father', undefined, '', true);
            const parent = DPointerTargetable.from(id).parent;
            U.arrayRemoveAll(parent, context.data.id);
            SetFieldAction.new(id, 'parent', parent, '', true);
        }
        END();
        return true;
    }

    public duplicate(deep: boolean = true): this { throw new Error("Model.duplicate(): use export/import ecore instead."); }

    protected set_instanceof(val: Pack1<this["instanceof"]>, context: Context): boolean {
        let ptr = Pointers.from(val);
        SetFieldAction.new(context.data.id, "instanceof", ptr, undefined, true);
        // update father's collections (pointedby's here are set automatically)
        // todo: ptr && SetFieldAction.new(ptr, "instances", context.data.id, '+=', true);
        return true; }
    protected get_instanceof(context: Context): this["instanceof"] { return context.data.instanceof ? LPointerTargetable.fromPointer(context.data.instanceof) : undefined; }

    protected set_name(val: this['name'], context: Context): boolean {
        const models: LModel[] = LModel.fromPointer(store.getState()['models']);
        if(models.filter((model) => { return model.name === val }).length > 0) {
            U.alert('error', 'Cannot rename the selected element since this name is already taken.');
        } else {
            SetFieldAction.new(context.data, 'name', val, '', false);
        }
        return true;
    }
    protected get_childrens_idlist(context: Context): Pointer<DAnnotation | (DPackage|DObject), 1, 'N'> {
        let children: Pointer<(DPackage|DObject), 0, 'N', (LPackage|LObject)>;
        if(context.data.isMetamodel) children = context.data.packages;
        else children = context.data.objects;
        return [...super.get_childrens_idlist(context) as Pointer<DAnnotation | (DPackage|DObject), 1, 'N'>,
            ...children];
    }

    protected get_isMetamodel(context: Context): this['isMetamodel'] {
        return context.data.isMetamodel;
    }
    protected set_isMetamodel(val: this['isMetamodel'], context: Context): boolean {
        SetFieldAction.new(context.data, 'isMetamodel', val, '', false);
        return true;
    }

    protected get_objects(context: Context): this['objects'] {
        return context.data.objects.map((pointer) => {
            return LPointerTargetable.from(pointer)
        });
    }

    protected get_packages(context: Context): this["packages"] {
        return context.data.packages.map((pointer) => {
            return LPointerTargetable.from(pointer)
        });
    }

    protected set_packages(val: PackArr<this["packages"]>, context: Context): boolean {
        const list = val.map((lItem) => { return Pointers.from(lItem) });
        const oldList = context.data.packages;
        const diff = U.arrayDifference(oldList, list);
        BEGIN();
        SetFieldAction.new(context.data, 'packages', list, "", true);
        for (let id of diff.added) {
            SetFieldAction.new(id, 'father', context.data.id, '', true);
            SetFieldAction.new(id, 'parent', context.data.id, '+=', true);
        }
        for (let id of diff.removed as Pointer<DModelElement>[]) {
            SetFieldAction.new(id, 'father', undefined, '', true);
            const parent = DPointerTargetable.from(id).parent;
            U.arrayRemoveAll(parent, context.data.id);
            SetFieldAction.new(id, 'parent', parent, '', true);
        }
        END();
        return true;
    }

    protected get_roots(context: Context): this["roots"] {
        return this.get_objects(context).filter( o => o.isRoot);
    }
    protected get_classes(context: Context): this["classes"] {
        const s: IStore = store.getState();
        return this.get_allSubPackages(context, s).flatMap(p => p.classes || []);
    }

    protected get_enums(context: Context): this["enums"] {
        return this.get_enumerators(context);
    }

    protected get_enumerators(context: Context): this["enums"] {
        const s: IStore = store.getState();
        return this.get_allSubPackages(context, s).flatMap(p => (p.enums || []));
    }

    protected get_allSubPackages(context: Context, state?: IStore): LPackage[] {
        state = state || store.getState();
        let tocheck: Pointer<DPackage>[] = context.data.packages || [];
        let checked: Dictionary<Pointer, true> = {};
        while (tocheck.length) {
            let newtocheck: Pointer<DPackage>[] = [];
            for (let ptr of tocheck) {
                if (checked[ptr]) throw new Error("loop in packages containing themselves");
                checked[ptr] = true;
                let dpackage: DPackage = DPointerTargetable.from(ptr, state);
                U.arrayMergeInPlace(newtocheck, dpackage?.subpackages);
            }
            tocheck = newtocheck;
        }
        return LPointerTargetable.from(Object.keys(checked), state);
    }

    protected get_delete(context: Context): () => void {
        const ret = () => { U.alert('error', 'In this version of the tool models cannot be deleted.'); }
        return ret;
    }
}
DNamedElement.subclasses.push(DModel);
LNamedElement.subclasses.push(LModel);


@RuntimeAccessible
export abstract class DFactory_useless_ extends DPointerTargetable { // DModelElement
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    // static singleton: LFactory_useless_;
    // static logic: typeof LFactory_useless_;
    // static structure: typeof DFactory_useless_;

    // inherit redefine
    id!: Pointer<DFactory_useless_, 1, 1, LFactory_useless_>;
    parent: Pointer<DModelElement, 0, 'N', LModelElement> = [];
    father!: Pointer<DModelElement, 1, 1, LModelElement>;
    annotations: Pointer<DAnnotation, 0, 'N', LAnnotation> = [];
    // personal
    ePackage: Pointer<DPackage, 1, 1, LPackage> = '';
    abstract create(DClass: DClass): DObject;
    abstract createFromString(eDataType: DDataType, literalValue: string): EJavaObject;
    abstract convertFromString(eDataType: DDataType, instanceValue: EJavaObject): string;
    // ********************** my additions inherited ********************* //
    // ********************** my additions personal ********************** //
}
@RuntimeAccessible
export abstract class LFactory_useless_<Context extends LogicContext<DFactory_useless_> = any, C extends Context = Context>  extends LModelElement {
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    public __raw!: DFactory_useless_;
    id!: Pointer<DFactory_useless_, 1, 1, LFactory_useless_>;
    // static singleton: LFactory_useless_;
    // static logic: typeof LFactory_useless_;
    // static structure: typeof DFactory_useless_;

    // inherit redefine
    parent!: LModelElement[];
    father!: LModelElement;
    annotations!: LAnnotation[];
    // personal
    ePackage!: LPackage;
    abstract create(DClass: DClass): DObject;
    abstract createFromString(eDataType: DDataType, literalValue: string): EJavaObject;
    abstract convertFromString(eDataType: DDataType, instanceValue: EJavaObject): string;
    // ********************** my additions inherited ********************* //
    // ********************** my additions personal ********************** //
}

// DModelElement.subclasses.push('DFactory_useless_'); // because it's abstract and cannot be used as a value, it's pure type definition
// DModelElement.subclasses.push('LFactory_useless_'); // because it's abstract and cannot be used as a value, it's pure type definition

@RuntimeAccessible
export class EJavaObject{

}// ??? EDataType instance?


@RuntimeAccessible
export class DMap extends Object { // DPointerTargetable
    // static logic: typeof LModelElement;
    // static structure: typeof DModelElement;
    // static singleton: LModelElement;
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    __isDMap!: true;
    constructor() {
        super();
    }

    // id!: Pointer<DModelElement, 1, 1, LModelElement>;
}

@RuntimeAccessible
export class LMap<Context extends LogicContext<DMap> = any, C extends Context = Context>  extends LPointerTargetable {
    // static logic: typeof LModelElement;
    // static structure: typeof DModelElement;
    // static singleton: LModelElement;
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    __isLMap!: true;
    // id!: Pointer<DModelElement, 1, 1, LModelElement>;
}
DPointerTargetable.subclasses.push(DMap as any);
LPointerTargetable.subclasses.push(LMap);

@RuntimeAccessible
export class DObject extends DPointerTargetable { // extends DNamedElement, m1 class instance
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];

    // inherit redefine
    annotations!: never[];
    id!: Pointer<DObject, 1, 1, LObject>;
    parent: Pointer<DModel | DObject, 0, 'N', LModel | LObject> = [];
    father!: Pointer<DModel, 1, 1, LModel> |  Pointer<DObject, 1, 1, LObject>;
    // annotations: Pointer<DAnnotation, 0, 'N', LAnnotation> = [];
    name!: string;

    // personal
    instanceof!: Pointer<DClass, 0, 1, LClass>;
    features: Pointer<DValue, 0, 'N', LValue> = [];


    public static new(instanceoff?: DObject["instanceof"], father?: DObject["father"], fatherType?: Constructor, name?: DNamedElement["name"], persist: boolean = true): DObject {
        // if (!name) name = this.defaultname(((meta: LNamedElement) => meta.name + " "), father);
        if (!name) name = this.defaultname(((meta: LNamedElement) => (meta?.name || "obj") + "_"), father, instanceoff);
        let ret = new Constructors(new DObject('dwc'), father, persist, fatherType).DPointerTargetable().DModelElement()
            .DNamedElement(name).DObject(instanceoff).end();
        return ret;
    }

}

@RuntimeAccessible
export class LObject<Context extends LogicContext<DObject> = any, C extends Context = Context, D extends DObject = DObject> extends LNamedElement { // extends DNamedElement, m1 class instance
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    public __raw!: DObject;
    id!: Pointer<DObject, 1, 1, LObject>;

    // inherit redefine
    annotations!: never[];
    childrens!: LValue[];
    allchildrens!: LValue[]; // including hidden values
    truechildrens!: LValue[]; // real shape without "mirage" values
    parent!: (LModel | LObject)[];
    father!: LModel | LObject;
    model!: LModel;
    // annotations!: LAnnotation[];
    // from LClass

    name!: string;
    ecoreRootName!: string;
    namespace!: string;
    fullname!:string;
    defaultValue!: DClass["defaultValue"];
    // abstract!: boolean;
    // interface!: boolean;
    // references!: LReference[];
    // attributes!: LAttribute[];
    // operations!: LOperation[];

    // personal
    deep_subobjects!: LObject[]; // damiano: itera features (lvalue[]) deep e vitando di inserire doppioni (salva una mappatura di di già aggiunti e skip se ricompaiono)
    subobjects!: LObject[];
    // damiano: + tutte le funzioni di comodità navigazionale del modello, trattarlo un pò come se fosse un modello (e quasi può esserlo)
    instanceof!: LClass;
    features!: LValue[];
    referencedBy!: LObject[];
    isRoot!: boolean;
    readonly partial!: boolean;

    protected get_truechildrens(context: Context): this["childrens"] {
        let childs: LValue[] = super.get_childrens(context);
        if (!context.data.instanceof) return childs;
        return childs.filter( (c) => !c.isMirage);
    }

    protected get_allchildrens(context: Context): this["childrens"] { return super.get_childrens(context); }

    protected get_childrens(context: Context): this["childrens"] {
        let childs: LValue[] = super.get_childrens(context);
        if (!context.data.instanceof || context.proxyObject.instanceof.partial) return childs;
        let conformchildrens: Pointer[] = context.proxyObject.instanceof.childrens.map(c=>c.id);
        return childs.filter( (c) => conformchildrens.includes(c.instanceof?.id) );
    }


    // protected get_fromlclass<T extends keyof (LClass)>(meta: LClass, key: T): LClass[T] { return meta[key]; }
    protected get_model(context: Context): LModelElement["model"] {
        let l: LObject | LModel = context.proxyObject;
        while (l && l.className !== DModel.name) l = l.father;
        return l as LModel; }
    // protected set_name(val: string, context: Context): boolean { return this.cannotSet("name"); }
    protected get_name(context: Context): LClass["name"] { return context.data.name || context.proxyObject.instanceof.name; }
    protected set_namespace(val: string, context: Context): boolean { return this.cannotSet("namespace"); }
    // protected get_namespace(context: Context): LClass["namespace"] { return context.proxyObject.instanceof.namespace; }
    protected set_fullname(val: string, context: Context): boolean { return this.cannotSet("fullname"); }
    protected get_fullname(context: Context): LClass["fullname"] { return context.proxyObject.instanceof.fullname; }
    protected set_ecoreRootName(val: string, context: Context): boolean { return this.cannotSet("ecoreRootName"); }
    protected get_ecoreRootName(context: Context): LObject["ecoreRootName"] {
        let instanceoff: LClass = context.proxyObject.instanceof;
        if (!instanceoff) return "schemaless:Object";
        return this.get_uri(context) + ":" + instanceoff.name; // optimize later in instanceoff.namespace + ":" + instanceoff.name; and implement namespace all around
    }
    protected set_partialdefaultname(val: DClass["partialdefaultname"], context: Context): boolean { return this.cannotSet("DObject.partialdefaultname()"); }
    protected get_partialdefaultname(context: Context): DClass["partialdefaultname"] { return context.data.instanceof ? context.proxyObject.instanceof.partialdefaultname : "val_"; }
    protected set_partial(val: DClass["partial"], context: Context): boolean { return this.cannotSet("DObject.set_partial()"); }
    protected get_partial(context: Context): DClass["partial"] { return context.proxyObject.instanceof?.partial || true; }

    /*    protected set_abstract(val: string, context: Context): boolean { return this.cannotSet("abstract"); }
        protected get_abstract(context: Context): LClass["abstract"] { return context.proxyObject.instanceof.abstract; }
        protected set_interface(val: string, context: Context): boolean { return this.cannotSet("interface"); }
        protected get_interface(context: Context): LClass["interface"] { return context.proxyObject.instanceof.interface; }*/
    protected set_defaultValue(val: string, context: Context): boolean { return this.cannotSet("defaultValue"); }
    protected get_defaultValue(context: Context): LClass["defaultValue"] { return context.proxyObject.instanceof.defaultValue; }
    protected set_referencedBy(val: string, context: Context): boolean { return this.wrongAccessMessage("referencedBy cannot be set directly. It should be updated automatically as side effect"); }
    protected get_referencedBy(context: Context): LObject["referencedBy"] {
        let state: IStore = store.getState();
        let targeting: LObject[] = LPointerTargetable.fromArr(context.data.pointedBy.map( p => {
            let s: GObject = state;
            for (let key of PointedBy.getPathArr(p)) {
                s = s[key];
                if (!s) return null;
                if (s.className === DObject.name) return s.id;
            }
        }));
        return targeting; }

    // damiano: do get childrens id, verifica che lobject.childrens funzioni
    protected get_isRoot(context: Context): LObject["isRoot"] { return context.proxyObject.father.className === DModel.name; }
    protected set_isRoot(val: never, context: Context): boolean { return this.wrongAccessMessage("isRoot cannot be set directly, change father element instead."); }

    public feature(name: string): (PrimitiveType|LObject)|(PrimitiveType|LObject)[] { this.cannotCall('feature'); return null; }
    private get_feature(context: Context): (name: string) => (PrimitiveType|LObject)|(PrimitiveType|LObject)[] {
        return (name: string) => {
            const lObject = context.proxyObject;
            const features = lObject.features.filter((value) => {
                return value.instanceof.name === name
            });
            if(features.length > 0) {
                const matchedFeature = features[0];
                switch(matchedFeature.value.length) {
                    case 0: return '';
                    case 1: return matchedFeature.value[0];
                    default: return matchedFeature.value;
                }
            } return '';
        }
    }
    /*
    * damiano todo:
    *          quando setti una ref containment, gli cambi il father.
    * perchè i value di ref iniziano con valore settato a [null]? fallo partire con []
    * values selector is bugged for lval. maybe uses instanceof.name as key but it's not unique. use pointer as key ad name as label
    * */

    protected generateEcoreJson_impl(context: Context, loopDetectionObj: Dictionary<Pointer, DModelElement> = {}): Json {
        loopDetectionObj[context.data.id] = context.data;
        let asEcoreRoot = (context.proxyObject.isRoot);
        // todo: actually use this loopdetectionobj
        const json: GObject = {};
        if (asEcoreRoot) {
            console.log("generate object ecore", {context, asEcoreRoot, json});
            const lc: LClass = context.proxyObject.instanceof;
            json[ECorePackage.xmiversion] = '2.0';
            json[ECorePackage.xmlnsxmi] = 'http://www.omg.org/XMI';
            // json[ECorePackage.xmlnsxsi] = 'http://www.w3.org/2001/XMLSchema-instance';
            json["xmlns:" + ( lc ? (lc.father).prefix : "shapeless_model_ns")] = 'http://www.eclipse.org/emf/2002/Ecore';
        }

        let features = context.proxyObject.features || [];
        console.log("features", {features});
        for (let f of features){
            json[f.name] = f.generateEcoreJson(loopDetectionObj);
        }


        return json; }

    public addValue(name?: DValue["name"], instanceoff?: DValue["instanceof"], value?: DValue["value"], isMirage?: boolean): DValue { return this.cannotCall("addValue"); }
    protected get_addValue(context: Context): this["addValue"] {
        return (name?: DValue["name"], instanceoff?: DValue["instanceof"], value?: DValue["value"], isMirage?: boolean) => DValue.new(name, instanceoff, value, context.data.id, true, isMirage); }

    protected get_namespace(context: Context): string {
        return context.data.instanceof ? context.proxyObject.instanceof.father.prefix : "schemaless"; }
    protected get_uri(context: Context): string {
        if (!context.data.instanceof) return "schemaless";
        let pkg = context.proxyObject.instanceof.father;
        return pkg.uri + "." + pkg.name; }
    // protected get_namespace(context: Context): string { if (!context.data.instanceof) return "schemaless"; return context.proxyObject.instanceof.namespace; }

    protected get_childrens_idlist(context: Context): Pointer<DAnnotation | DValue, 1, 'N'> {
        return [...super.get_childrens_idlist(context) as Pointer<DAnnotation | DValue, 1, 'N'>,
            ...context.data.features];
    }

    protected get_instanceof(context: Context): this["instanceof"] {
        const pointer = context.data.instanceof;
        return LPointerTargetable.from(pointer)
    }
    protected set_instanceof(val: Pack1<this["instanceof"]>, context: Context): boolean {
        const metaptr: D["instanceof"] = Pointers.from(val);
        this._removeConformity(context);
        SetFieldAction.new(context.data.id, "instanceof", metaptr, undefined, true);
        // update father's collections (pointedby's here are set automatically)
        metaptr && SetFieldAction.new(metaptr as Pointer<DClass>, "instances", context.data.id, '+=', true);
        if (metaptr) this._forceConformity(context, metaptr);
        return true;
    }

    private forceConformity(context: Context, meta: D["instanceof"]): void {
        let oldinstanceof = context.data.instanceof;
        // context.data.instanceof = meta;
        let ret = this._forceConformity(context, meta);
        // context.data.instanceof = oldinstanceof;
        return ret;
    }
    private _forceConformity(context: Context, meta: D["instanceof"]): void {
        let lmeta = meta && LPointerTargetable.wrap(meta) as this["instanceof"];
        if (!lmeta) return;
        let attrs = lmeta.attributes;
        let refs = lmeta.references;
        let values = context.proxyObject.allchildrens;
        let idmap: Dictionary<string, LAttribute | LReference> = {};
        for (let a of attrs) { idmap[a.id] = a; }
        for (let a of refs) { idmap[a.id] = a; }
        for (let v of values) { delete idmap[v.__raw.instanceof]; }
        console.log("forceconformity", {attrs, refs, values: values.map(v=> v.__raw.instanceof), idmap});
        for (let id in idmap) {
            // let l = idmap[id];
            context.proxyObject.addValue(undefined, id, [],true);
        }
    }
    private _removeConformity(context: Context): void {
        let childs = context.proxyObject.features;
        for (let child of childs) if (child.isMirage) child.delete();
    }

    protected get_features(context: Context): this['features'] {
        return this.get_childrens(context);
        // return context.data.features.map((feature) => { return LPointerTargetable.from(feature) });
    }

    protected get_delete(context: Context): () => void {
        const data = context.proxyObject;
        const ret = () => {
            const pointedBy = U.filteredPointedBy(data, 'value');
            for(let me of pointedBy) {
                if (me) {
                    const lValue = me as LValue;
                    const dFather = lValue.father.__raw as DObject;
                    SetFieldAction.new(lValue.__raw, 'value', dFather.features.indexOf(data.id as string), '-=', true);
                }
            }
            const me = data.instanceof;
            SetFieldAction.new(me.__raw, 'instances', me.__raw.instances.indexOf(data.id), '-=', true);
            data.superDelete();
        }
        return ret;
    }

    public ecorePointer(): string { return this.cannotCall("ecorePointer"); }
    protected get_ecorePointer(context: Context): () => string {
        let lastvisited: Pointer<DObject, 1, 1, LObject> = context.data.id;
        return () => "@//" + this.get_fatherList(context).map( (f: LModelElement | LObject | LValue) => {
            if (f.className === DObject.name) { lastvisited = (f as LObject).id; return ''; }
            if (f.className === DModel.name) { return ''; }
            console.log("get_ecorepointer", f, f.__raw, lastvisited);
            return (f as LValue).name + "." + ((f as LValue).__raw.value.indexOf(lastvisited));
        }).filter(v=>!!v).join("@/");
    }

}
DNamedElement.subclasses.push(DObject);
LNamedElement.subclasses.push(LObject);

@RuntimeAccessible
export class DValue extends DModelElement { // extends DModelElement, m1 value (attribute | reference)
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    // static singleton: LValue;
    // static logic: typeof LModelElement;
    // static structure: typeof DValue;

    // inherit redefine
    id!: Pointer<DValue, 1, 1, LValue>;
    parent: Pointer<DObject, 0, 'N', LObject> = [];
    father!: Pointer<DObject, 1, 1, LObject>;
    annotations: Pointer<DAnnotation, 0, 'N', LAnnotation> = [];
    name?: string; // nome opzionale solo per modelli schema-less

    // personal
    value: PrimitiveType[] | Pointer<DObject, 1, 'N', LObject> = [];
    instanceof: Pointer<DAttribute, 1, 1, LAttribute > | Pointer<DReference, 1, 1, LReference> = ''; // todo: maybe min lowerbound 0 if you want to allow free shape objects chiedere prof
    edges!: Pointer<DEdge, 0, 'N', LEdge>;
    // conformsTo!: Pointer<DStructuralFeature, 0, 'N', LStructuralFeature>; // low priority to do: attributo fittizio controlla a quali elementi m2 è conforme quando viene richiesto
    isMirage!: boolean;

    public static new(name?: DNamedElement["name"], instanceoff?: DValue["instanceof"], val?: DValue["value"], father?: DValue["father"] | DObject, persist: boolean = true, isMirage: boolean = false): DValue {
        if (!name) name = this.defaultname("property_", father);
        return new Constructors(new DValue('dwc'), (typeof father === "string" ? father : (father as DObject)?.id), persist, undefined).DPointerTargetable().DModelElement()
            .DNamedElement(name)
            .DValue(instanceoff, val, isMirage).end();
    }
}
@RuntimeAccessible
export class LValue<Context extends LogicContext<DValue> = any, C extends Context = Context> extends LModelElement { // extends DModelElement, m1 value (attribute | reference)
    static subclasses: (typeof RuntimeAccessibleClass | string)[] = [];
    static _extends: (typeof RuntimeAccessibleClass | string)[] = [];
    public __raw!: DValue;
    id!: Pointer<DValue, 1, 1, LValue>;

    // inherit redefine
    parent!: (LObject | LModel)[];
    father!: LObject | LModel;
    model!: LModel;
    // from namedelement
    name!: string;
    namespace!: string;
    fullname!:string;
    type!: LClassifier;
    primitiveType!: LClass;
    classType!: LClass;
    enumType!: LEnumerator;
// from structuralfeature (ref + attr)
    ordered!: boolean;
    unique!: boolean;
    lowerBound!: number;
    upperBound!: number;
    many!: boolean;
    required!: boolean;

    changeable!: boolean;
    volatile!: boolean;
    transient!: boolean;
    unsettable!: boolean;
    derived!: boolean;
    defaultValue!: DStructuralFeature["defaultValue"];
    // defaultValueLiteral!: string;
// from reference
    containment!: boolean;
    container!: boolean;
    // resolveProxies!: boolean;
    opposite?: LValue; // if DRef have opposite DRef, when you set a value ref you also set a opposite value ref from target to this src. they are always mirroring.
    // target!: LClass[]; is value[]
    edges!: LEdge[];


    // personal
    isMirage!: boolean;
    value!: PrimitiveType[] | LObject[];
    instanceof!: LAttribute | LReference;
    conformsTo!:( LAttribute | LReference)[]; // low priority to do: attributo fittizio controlla a quali elementi m2 è conforme quando viene richiesto

    protected get_edges(context: Context): this["edges"] { return LPointerTargetable.fromPointer(context.data.edges) || []; }
    protected get_fromlfeature<C, T extends keyof (C)>(meta: C, key: T): C[T] { return meta[key]; }
    protected get_opposite(context: Context): LReference["opposite"] { return this.get_fromlfeature(context.proxyObject.instanceof as LReference, "opposite"); }
    protected get_container(context: Context): LReference["container"] { return this.get_fromlfeature(context.proxyObject.instanceof as LReference, "container"); }
    protected get_containment(context: Context): LReference["containment"] { return this.get_fromlfeature(context.proxyObject.instanceof as LReference, "containment"); }
    // protected get_defaultValueLiteral(context: Context): LStructuralFeature["defaultValueLiteral"] { return this.get_fromlfeature(context.proxyObject.instanceof, "defaultValueLiteral"); }
    protected get_defaultValue(context: Context): LStructuralFeature["defaultValue"] { return this.get_fromlfeature(context.proxyObject.instanceof, "defaultValue"); }
    protected get_defaultderived(context: Context): LStructuralFeature["derived"] { return this.get_fromlfeature(context.proxyObject.instanceof, "derived"); }
    protected get_defaultunsettable(context: Context): LStructuralFeature["unsettable"] { return this.get_fromlfeature(context.proxyObject.instanceof, "unsettable"); }
    protected get_defaulttransient(context: Context): LStructuralFeature["transient"] { return this.get_fromlfeature(context.proxyObject.instanceof, "transient"); }
    protected get_volatile(context: Context): LStructuralFeature["volatile"] { return this.get_fromlfeature(context.proxyObject.instanceof, "volatile"); }
    protected get_changeable(context: Context): LStructuralFeature["changeable"] { return this.get_fromlfeature(context.proxyObject.instanceof, "changeable"); }
    protected get_required(context: Context): LStructuralFeature["required"] { return this.get_fromlfeature(context.proxyObject.instanceof, "required"); }
    protected get_unique(context: Context): LStructuralFeature["unique"] { return this.get_fromlfeature(context.proxyObject.instanceof, "unique"); }
    protected get_many(context: Context): LStructuralFeature["many"] { return this.get_fromlfeature(context.proxyObject.instanceof, "many"); }
    protected get_upperBound(context: Context): LStructuralFeature["upperBound"] { return this.get_fromlfeature(context.proxyObject.instanceof, "upperBound"); }
    protected get_lowerBound(context: Context): LStructuralFeature["lowerBound"] { return this.get_fromlfeature(context.proxyObject.instanceof, "lowerBound"); }
    protected get_ordered(context: Context): LStructuralFeature["ordered"] { return this.get_fromlfeature(context.proxyObject.instanceof, "ordered"); }
    protected get_enumType(context: Context): LStructuralFeature["enumType"] { return this.get_fromlfeature(context.proxyObject.instanceof, "enumType"); }
    protected get_classType(context: Context): LStructuralFeature["classType"] { return this.get_fromlfeature(context.proxyObject.instanceof, "classType"); }
    protected get_primitiveType(context: Context): LStructuralFeature["primitiveType"] { return this.get_fromlfeature(context.proxyObject.instanceof, "primitiveType"); }
    protected get_type(context: Context): LStructuralFeature["type"] { return this.get_fromlfeature(context.proxyObject.instanceof, "type"); }
    protected get_fullname(context: Context): LStructuralFeature["fullname"] { return this.get_fromlfeature(context.proxyObject.instanceof, "fullname"); }
    protected get_namespace(context: Context): LStructuralFeature["namespace"] { return this.get_fromlfeature(context.proxyObject.instanceof, "namespace"); }
    protected get_name(context: Context): LStructuralFeature["name"] { return context.data.instanceof ? this.get_fromlfeature(context.proxyObject.instanceof, "name") : context.data.name || ''; }

    protected get_instanceof(context: Context): this["instanceof"] {
        const pointer = context.data.instanceof;
        return LPointerTargetable.from(pointer)
    }
    protected set_instanceof(val: Pack1<this["instanceof"]>, context: Context): boolean {
        // const list = val.map((lItem) => { return Pointers.from(lItem) });
        let ptr = Pointers.from(val); // damiano: verifica sia un puntatore singolo
        SetFieldAction.new(context.data, 'instanceof', ptr, "", true);
        return true;
    }

    protected get_isMirage(context: Context): this["isMirage"] { return context.data.isMirage; }
    protected set_isMirage(val: this["isMirage"], context: Context): boolean { SetFieldAction.new(context.data, 'isMirage', val, "", false); return true; }

    protected get_getValue(context: Context): this["getValue"] {
        return function (fitSize, namedPointers, ecorePointers, shapeless) {
            let contextt: any = arguments[arguments.length - 1]; // proxy parameter mapping might get crazy with variable arguments
            fitSize = fitSize === contextt ? true : fitSize;
            namedPointers = namedPointers === contextt ? true : namedPointers;
            ecorePointers = ecorePointers === contextt ? false : ecorePointers;
            shapeless = shapeless === contextt ? false : shapeless;
            return LValue.prototype.get_value(contextt, fitSize, namedPointers, ecorePointers, shapeless);
        }
    }
    public getValue(fitSize: boolean = true, namedPointers: boolean = true, ecorePointers: boolean = false, shapeless: boolean = false): this["value"] {
        return this.cannotCall("getValue"); }

    protected get_value(context: Context, fitSize: boolean = true, namedPointers: boolean = true, ecorePointers: boolean = false, shapeless: boolean = false): this["value"] & {type: string} {
        let ret: any[] = [...context.data.value] as [];
        let meta: LAttribute | LReference | undefined = shapeless ? undefined : context.proxyObject.instanceof;
        let dmeta: DAttribute | DReference = (meta as LAttribute | LReference).__raw;
        console.log("wrap values", ret);
        if (meta && meta.className === DReference.name) ret = LPointerTargetable.fromArr(ret as DObject[]);
        let typestr: string = meta ? meta.typeToShortString() : "shapeless";
        if (!Array.isArray(ret)) ret = [];
        if (meta && fitSize && ret.length < dmeta.lowerBound && dmeta.lowerBound <= 0) {
            let times = dmeta.lowerBound - ret.length;
            while (times-- > 0) ret.push(undefined);
            // ret.length = meta.lowerBound; not really working for expanding, it says "emptyx10" or so. doing .map() only iterates "existing" elements. behaves like as it's smaller.
        }
        if (meta && fitSize && ret.length > dmeta.upperBound && dmeta.upperBound >= 0) ret.length = dmeta.upperBound;
        let numbermax = 0, numbermin = 0;
        switch (typestr) {
            case "shapeless":
                let state: IStore = store.getState();
                ret = ret.map( (val) => {
                    let l: any = LPointerTargetable.fromPointer(val, state);
                    if (l) {
                        if (l.className === DEnumLiteral.name) { l = (l as DEnumLiteral).literal; } else
                        if (namedPointers) { l = l.name ? ("@" + l.name) : ("#" + l.className); }
                        else if (ecorePointers && !(meta as LReference).containment){
                            l = l.ecorePointer();
                            // throw new Error("values as EcorePointers: todo. for containment do nothing, just nest the obj. for non-containment put the ecore reference string in array vals")
                        }
                        return l;
                    }
                    return val;
                })
                break;
            default: // it's a reference or enum
                ret = LPointerTargetable.wrapAll(ret);
                if ((meta as LAttribute)?.type?.className === DEnumerator.name) {
                    ret = ret.map( (lit: LEnumLiteral) => lit.literal);
                    break;
                }
                // is reference
                ret = !meta ? ret : ret.filter( (l: LObject) => {
                    return l.instanceof?.isExtending((meta as LReference).type);
                });
                if (namedPointers) {
                    ret = ret.map( l => l && (l.name ? ("@" + l.name) : ("#" + l.className)));
                }
                else if (ecorePointers && !(meta as LReference).containment){
                    console.log({ret});
                    ret = ret.map( (lval: LObject) => lval && lval.ecorePointer())
                    // throw new Error("values as EcorePointers: todo. for containment do nothing, just nest the obj. for non-containment put the ecore reference string in array vals")
                }
                break;
            case ShortAttribETypes.EByte:
                numbermin = -128;
                numbermax = 127;
                break;
            case ShortAttribETypes.EShort:
                numbermin = -32768;
                numbermax = 32767;
                break;
            case ShortAttribETypes.EInt:
                numbermin = -2147483648;
                numbermax = 2147483647;
                break
            case ShortAttribETypes.ELong:
                numbermin = -9223372036854775808;
                numbermax = 9223372036854775807;
                break;
            case ShortAttribETypes.EFloat:
                numbermin = Number.NEGATIVE_INFINITY;
                numbermax = Number.POSITIVE_INFINITY;
                break;
            case ShortAttribETypes.EString:
            case ShortAttribETypes.EDate:
                ret = ret.map( v => v ? v + '' : '');
                break;
            case ShortAttribETypes.EChar:
                ret = ret.map( v => v ? (v + '')[0] : 'A');
                break;
            case ShortAttribETypes.EBoolean:
                ret = ret.map( v => typeof v === "boolean" ? v : U.fromBoolString(v+'', v?.length>0, false));
                break;
            case ShortAttribETypes.void: ret = []; break;
        }
        // some kind of numeric type
        if (numbermax !== 0) {
            ret = ret.map( v => {
                if (typeof v !== "number") {
                    if (!v) v = 0;
                    else if (v === "true") v = 1;
                    else if (v.constructor?.name=== "Date") v = v.getTime();
                    else {
                        console.log("number casting:", v,  U.getFirstNumber(v+'', true), {numbermax, numbermin});
                        v = U.getFirstNumber(v+'', true);
                    }
                }
                return Math.min(numbermax, Math.max(numbermin, v))
            });
        }
        (ret as GObject).type = typestr;
        // console.error("type value:", {ret, typestr, meta, fitSize});
        return ret as any;
    }

    public valuestring(keepemptyquotes?: boolean): string { return this.cannotCall("valuestring"); }
    private get_valuestring(context: Context): this["valuestring"] { return (keepemptyquotes?: boolean) => this.valuestring_impl(context, keepemptyquotes); }
    private valuestring_impl(context: Context, keepemptyquotes?: boolean): string {
        // console.error("valuestring_impl", {context, data:context.data});
        let val = this.get_value(context, true, true, false);
        let ret: any;
        switch (val.length) {
            case 0: ret = ''; break;
            case 1: ret = val[0] || val[0] === 0 ? val[0] : ''; break;
            default:
                let havestrings: boolean = val.type === ShortAttribETypes.EString;
                let havechars: boolean = val.type === ShortAttribETypes.EChar;
                let havepointers: boolean = false;
                let haveLelements: boolean = false;
                for (let vall of [val[0]]) {
                    if ((vall as any)?.__isProxy) haveLelements = true;
                    /*else if (typeof vall === "string") { havestrings = true; havepointers = havepointers || vall.includes("Pointer"); }}
                     */
                }
                /*if (havepointers) {
                    val = LPointerTargetable.wrapAll(val);
                    haveLelements = true;
                }*//*
                if (haveLelements) {
                    val = val.map( l => l && (l.name ? ("@" + l.name) : ("#" + l.className)));
                }*/
                if (havestrings || havechars) {
                    let valstr = JSON.stringify(val);
                    if (!keepemptyquotes) valstr = U.replaceAll(valstr, "\"\"", "");
                    ret = valstr.substring(1, valstr.length-1);
                    break;
                }
                else ret = val.join(', ');
        }
        // console.error("valuestring_impl()", {ret, context, data:context.data});
        return ret;
    }

    protected set_value(val: (string | Pointer<DObject>)|(string | Pointer<DObject>)[], context: Context): boolean {
        const list: (string | Pointer<DObject>)[] = (Array.isArray(val)) ? val : [val];
        let l = context.proxyObject;
        let instanceoff: LReference | LAttribute = l.instanceof;
        let isRef: boolean | undefined = (!instanceoff ? undefined : instanceoff.className === DReference.name);
        SetFieldAction.new(context.data, 'value', list as any, '', false);
        console.log("pre set_value actions", l, list, val, context);

        if (!l.instanceof || (instanceoff as LReference).containment) {
            let i = 0;
            for (let v of list) {
                console.log("loop set_value actions", v, context.data, isRef, instanceoff, Pointers.isPointer(v));
                i++;
                if (isRef || instanceoff === undefined && Pointers.isPointer(v)) { // if shapeless obj need to check val by val
                    console.log("loop set_value actions SET", v, context.data, isRef, instanceoff, Pointers.isPointer(v));
                    SetFieldAction.new(v, "pointedBy", PointedBy.fromID(context.data.id, "values." + i as any), "+=");
                    SetFieldAction.new(v, "father", context.data.id, undefined, true);
                    let oldv = context.data.value[i];
                    // todo: need to update father.contains? removing from old father and updating to new father
                    // if (Pointers.isPointer(oldv)) SetFieldAction.new(context.data.id, "contains", U.arrayRemoveAll([...context.data.contains], oldv), '', true);
                    // SetFieldAction.new(context.data.id, "contains", oldv as DObject["id"], undefined, true);

                }
            }
        }
        context.data.isMirage && SetFieldAction.new(context.data, 'isMirage', false, '', false);
        return true;
    }

    protected generateEcoreJson_impl(context: Context, loopDetectionObj: Dictionary<Pointer, DModelElement> = {}): Json {
        loopDetectionObj[context.data.id] = context.data;
        let json: any = this.get_value(context, true, false, true);
        delete json["type"];

        json = json.map( (j: any) => { return j?.__isProxy ? j.generateEcoreJson(loopDetectionObj) : j;} );
        json = json.filter((j: any) => !!j);
        return json; }

    protected get_toString(context: Context): () => string { return () => this._toString(context); }
    protected _toString(context: Context): string {
        let val: any = this.get_value(context);
        if (!val) return val + '';
        if (!Array.isArray(val)) val = [val];
        if (context.proxyObject.instanceof.className === DReference.name) val = val.map( (e: GObject) =>  {  return e.instanceof.__raw.name || e; });
        switch(val.length) {
            case 0: return '';
            case 1: return val[0] + '';
            default: return val + '';
        }
    }

    public rawValue(): void { super.cannotCall('rawValue'); }
    public get_rawValue(context: Context): this["value"]{
        return (this.get_getValue(context))(false, false, false, true);
    }
    protected get_delete(context: Context): () => void {
        const data = context.proxyObject;
        const ret = () => {
            const me = data.instanceof;
            me && SetFieldAction.new(me.__raw, 'instances', me.__raw.instances.indexOf(data.id), '-=', true);
            data.superDelete();
            // super.get_delete(context);
        }
        return ret;
    }
}
DNamedElement.subclasses.push(DValue);
LNamedElement.subclasses.push(LValue);



export type WModelElement = getWParams<LModelElement, DModelElement>;
export type WModel = getWParams<LModel, DModel>;
export type WValue = getWParams<LValue, DValue>;
export type WNamedElement = getWParams<LNamedElement, DNamedElement>;
export type WObject = getWParams<LObject, DObject>;
export type WEnumerator = getWParams<LEnumerator, DEnumerator>;
export type WEnumLiteral = getWParams<LEnumLiteral, DEnumLiteral>;
export type WAttribute = getWParams<LAttribute, DAttribute>;
export type WReference = getWParams<LReference, DReference>;
export type WStructuralFeature = getWParams<LStructuralFeature, DStructuralFeature>;
export type WClassifier = getWParams<LClassifier, DClassifier>;
export type WDataType = getWParams<LDataType, DDataType>;
export type WClass = getWParams<LClass, DClass>;
export type WParameter = getWParams<LParameter, DParameter>;
export type WOperation = getWParams<LOperation, DOperation>;
export type WPackage = getWParams<LPackage, DPackage>;
export type WTypedElement = getWParams<LTypedElement, DTypedElement>;
export type WAnnotation = getWParams<LAnnotation, DAnnotation>;
// export type WJavaObject = getWParams<LJavaObject, DJavaObject>;
export type WMap = getWParams<LMap, DMap>;
export type WFactory_useless_ = getWParams<LFactory_useless_, DFactory_useless_>;


/*
let alld: GObject = {
    DModelElement,
    DModel,
    DValue,
    DNamedElement,
    DObject,
    DEnumerator,
    DEnumLiteral,
    DAttribute,
    DReference,
    DStructuralFeature,
    DClassifier,
    DDataType,
    DClass,
    DParameter,
    DOperation,
    DPackage,
    DTypedElement,
    DAnnotation,
    DFactory_useless_, DMap};
let alll: GObject = {
    LModelElement,
    LModel,
    LValue,
    LNamedElement,
    LObject,
    LEnumerator,
    LEnumLiteral,
    LAttribute,
    LReference,
    LStructuralFeature,
    LClassifier,
    LDataType,
    LClass,
    LParameter,
    LOperation,
    LPackage,
    LTypedElement,
    LAnnotation,
    LFactory_useless_, LMap};
*/
