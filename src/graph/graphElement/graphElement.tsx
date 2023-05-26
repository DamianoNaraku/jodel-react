import React, {Dispatch, PureComponent, ReactElement, ReactNode,} from "react";
import {createPortal} from "react-dom";
import {connect} from "react-redux";
import './graphElement.scss';

import {
    CreateElementAction,
    DGraph,
    DGraphElement,
    Dictionary,
    DModelElement,
    DocString, DViewElement,
    GObject,
    GraphElementDispatchProps,
    GraphElementOwnProps,
    GraphElementReduxStateProps,
    GraphElementStatee,
    InOutParam,
    IStore,
    JSXT,
    LModelElement,
    Log, LPointerTargetable,
    LViewElement,
    MyProxyHandler, Overlap,
    Pointer,
    RuntimeAccessible,
    Selectors,
    SetRootFieldAction,
    U,
    UX,
    windoww, DV, GraphSize, GraphPoint, LVoidVertex
} from "../../joiner";


export function makeEvalContext(props: AllPropss, view: LViewElement): GObject {
    let evalContext: GObject = view.constants ? eval('window.tmp = ' + view.constants) : {};
    evalContext = {...windoww.defaultContext, ...evalContext, model: props.data, ...props};
    windoww.evalContext = evalContext;
    return evalContext;
}

function setTemplateString(stateProps: InOutParam<GraphElementReduxStateProps>, ownProps: Readonly<GraphElementOwnProps>): void {
    //if (!jsxString) { this.setState({template: this.getDefaultTemplate()}); return; }
    // sintassi: '||' + anything + (opzionale: '|' + anything)*N_Volte + '||' + jsx oppure direttamente: jsx
    const view: LViewElement = stateProps.view; //data._transient.currentView;
    // eslint-disable-next-line no-mixed-operators
    let allProps: AllPropss = {...ownProps, ...stateProps} as AllPropss;
    (allProps as GObject).props = allProps;
    const evalContext = makeEvalContext(allProps, view);
    // const evalContextOld = U.evalInContext(this, constants);
    // this.setState({evalContext});
    //console.error({jsx:view.jsxString, view});

    // todo: invece di fare un mapping ricorsivo dei figli per inserirgli delle prop, forse posso farlo passando una mia factory che wrappa React.createElement
    let jsxCodeString: DocString<ReactNode>;
    try { jsxCodeString = JSXT.fromString(view.jsxString, {factory: 'React.createElement'}); }
    catch (e: any) {
        Log.eDevv('Syntax Error in custom user-defined template. try to remove typescript typings:\n\n' +e.toString() + '\n\n' + view.jsxString, {evalContext});
        jsxCodeString = '<div>Syntax error 1</div>';
    }
    let jsxparsedfunc: () => React.ReactNode;
    try {
        jsxparsedfunc = U.evalInContextAndScope<() => ReactNode>('()=>{ return ' + jsxCodeString + '}', evalContext);
        // U.evalInContext({...this, ...evalContext}, res); // todo: remove eval and add new Function() ?
    }
    catch (e: any) {
        let errormsg = ''; // 'Syntax Error in custom user-defined template.\n';
        let otherargs: any = {e, jsxCodeString, evalContext, where:"setTemplateString()", view};
        if (e.message.indexOf("Unexpected token .") >= 0 || view.jsxString.indexOf('?.') >= 0 || view.jsxString.indexOf('??') >= 0)
        { errormsg += 'Reminder: nullish operators ".?" and "??" are not supported.\n\n' +e.toString() + '\n\n' + view.jsxString; }
        else if (view.jsxString.indexOf('?.') >= 0) { errormsg += 'Reminder: ?. operator and empty tags <></> are not supported.\n\n' +e.toString() + '\n\n' + view.jsxString; }
        jsxparsedfunc = ()=> DV.errorView(errormsg, otherargs);
    }

    stateProps.preRenderFunc = view.preRenderFunc;
    stateProps.evalContext = evalContext;
    stateProps.template = jsxparsedfunc;
    // console.log('GE settemplatestring:', {stateProps});
}

@RuntimeAccessible
export class GraphElementComponent<AllProps extends AllPropss = AllPropss, GraphElementState extends GraphElementStatee = GraphElementStatee>
    extends PureComponent<AllProps, GraphElementState>{
    static maxid: number = 0;
    static all: Dictionary<number, GraphElementComponent> = {};
    id: number;
    public static refresh() {
        for (let key in GraphElementComponent.all) {
            GraphElementComponent.all[key].forceUpdate();
        }
        console.log(GraphElementComponent.all);
    }

    public static defaultShouldComponentUpdate<AllProps extends GObject, State extends GObject, Context extends any>
    (instance: React.Component, nextProps: Readonly<AllProps>, nextState: Readonly<State>, nextContext: Context) {
        return (
            !U.shallowEqual(instance.props, nextProps) ||
            !U.shallowEqual(instance.state, nextState)
        );
    }

    static mapViewStuff(state: IStore, ret: GraphElementReduxStateProps, ownProps: GraphElementOwnProps) {
        let dnode: DGraphElement | undefined = ownProps?.nodeid && state.idlookup[ownProps.nodeid] as any;
        if (ownProps.view) {
            ret.views = [];
            ret.view = LPointerTargetable.wrap(ownProps.view) as LViewElement;
        }
        else {
            const viewScores = Selectors.getAppliedViews(ret.data, dnode, ret.graph, ownProps.view || null, ownProps.parentViewId || null);
            ret.views = viewScores.map(e => MyProxyHandler.wrap(e.element));
            ret.view = ret.views[0];
            (ret as any).viewScores = viewScores; // debug only
        }

        /*        if (ownProps.view) {
                    ret.view = DPointerTargetable.wrap(state.idlookup[ownProps.view]);
                } else {
                    ret.view = ret.views[0];
                }*/
    }

    static mapLModelStuff(state: IStore, ownProps: GraphElementOwnProps, ret: GraphElementReduxStateProps): void {
        const meid: string = (typeof ownProps.data === 'string' ? ownProps.data as string : (ownProps.data as any as DModelElement)?.id) as string;
        ret.dataid = meid;
        // Log.exDev(!meid, "model element id not found in GE.mapstatetoprops", {meid, ret, ownProps, state});
        ret.data = MyProxyHandler.wrap(state.idlookup[meid as any]);
        // Log.ex(!ret.data, "can't find model data:", {meid, state, ownpropsdata:ownProps.data, ownProps});

    }

    static mapLGraphElementStuff(state: IStore,
                                 ownProps: GraphElementOwnProps,
                                 ret: GraphElementReduxStateProps,
                                 dGraphElementDataClass: typeof DGraphElement = DGraphElement,
                                 isDGraph?: DGraph): void {
        const idlookup = state.idlookup;
        let nodeid: string = ownProps.nodeid as string;
        let graphid: string = isDGraph ? isDGraph.id : ownProps.graphid as string;
        let parentnodeid: string = ownProps.parentnodeid as string;
        let dataid: Pointer<DModelElement, 0, 1, LModelElement> = ownProps.data || null;
        // Log.exDev(!nodeid || !graphid, 'node id injection failed', {ownProps, data: ret.data, name:(ret.data as any)?.name || (ret.data as any)?.className}); /*
        /*if (!nodeid) {
            nodeid = 'nodeof_' + stateProps.data.id + (stateProps.view.bindVertexSizeToView ? '^' + stateProps.view.id : '') + '^1';
            stateProps.nodeid = U.increaseEndingNumber(nodeid, false, false, id => !idlookup[id]);
            todo: quando il componente si aggiorna questo viene perso, come posso rendere permanente un settaggio di reduxstate in mapstatetoprops? o devo metterlo nello stato normale?
        }*/

        ret.graph = idlookup[graphid] as DGraphElement as any; // se non c'è un grafo lo creo
        if (!ret.graph) {
            Log.exDev(!dataid, 'attempted to make a Graph element without model', {dataid, ownProps, ret, thiss:this});
            if (dataid) CreateElementAction.new(DGraph.new(dataid, parentnodeid, graphid, graphid)); }
        else {
            ret.graph = MyProxyHandler.wrap(ret.graph);
            Log.exDev(ret.graph.__raw.className !== "DGraph", 'graph class is wrong', {graph: ret.graph, ownProps});
        }


        let dnode: DGraphElement = idlookup[nodeid] as DGraphElement;

        // console.log('dragx GE mapstate addGEStuff', {dGraphElementDataClass, created: new dGraphElementDataClass(false, nodeid, graphid)});
        if (!dnode) {
            let dge = dGraphElementDataClass.new(dataid, parentnodeid, graphid, nodeid);
            let act = CreateElementAction.new(dge, false);
            // console.log("map ge2", {nodeid: nodeid+'', dge: {...dge}, dgeid: dge.id});
        }
        else { ret.node = MyProxyHandler.wrap(dnode); }
    }

    ////// mapper func
    static mapStateToProps(state: IStore, ownProps: GraphElementOwnProps, dGraphDataClass: typeof DGraphElement = DGraphElement, startingobj?: GObject): GraphElementReduxStateProps {
        // console.log('dragx GE mapstate', {dGraphDataClass});
        let ret: GraphElementReduxStateProps = (startingobj || {}) as GraphElementReduxStateProps; // NB: cannot use a constructor, must be pojo
        GraphElementComponent.mapLModelStuff(state, ownProps, ret);
        // console.log("map ge", {ownProps, ret, state});
        GraphElementComponent.mapLGraphElementStuff(state, ownProps, ret, dGraphDataClass);
        GraphElementComponent.mapViewStuff(state, ret, ownProps);
        // ret.view = LViewElement.wrap(state.idlookup[vid]);
        // view non deve essere più injected ma calcolata, però devo fare inject della view dell'elemento parent. learn ocl to make view target
        Log.exDev(!ret.view, 'failed to inject view:', {state, ownProps, reduxProps: ret});
        // console.log(!ret.view, 'failed to inject view:', {state, ownProps, reduxProps: ret});
        if (ret.view.usageDeclarations) U.objectMergeInPlace(ret, U.evalInContextAndScope(ret.view.usageDeclarations));
        // console.log('GE mapstatetoprops:', {state, ownProps, reduxProps: ret});
        // ret.model = state.models.length ? LModelElement.wrap(state.models[0]) as LModel : undefined;
        setTemplateString(ret, ownProps); // todo: this is heavy, should be moved somewhere where it's executed once unless view changes (pre-render with if?)
        // @ts-ignore
        ret.forceupdate = state.forceupdate;

        return ret;
    }

    static mapDispatchToProps(dispatch: Dispatch<any>): GraphElementDispatchProps {
        const ret: GraphElementDispatchProps = {} as any;
        return ret;
    }

    static graphVertexID_counter: Dictionary<DocString<'GraphID'>, Dictionary<DocString<'VertexID'>, boolean>> = {}


    _isMounted: boolean;
    // todo: can be improved by import memoize from "memoize-one"; it is high-order function that memorize the result if params are the same without re-executing it (must not have side effects)
    //  i could use memoization to parse the jsx and to execute the user-defined pre-render function
    constructor(props: AllProps, context: any) {
        super(props, context);
        this._isMounted = false;
        this.id = GraphElementComponent.maxid++;
        GraphElementComponent.all[this.id] = this;
/*
        console.log('GE constructor props:', this.props);
        this.setTemplateString(this.props.view, true);
        /*if (false) this.setTemplateString('{colors:["rEd", "gReen", "blye"], key2:[0,2,5]}',
            '() => { colors = colors.map(c=>c.toLowerCase())}',
            '<div><b>GraphElement colors:</b>{colors.map( (c, i) => <li key={c} style={{color: c}}>{c}</li>)}</div>', true);*/
        // this.onMountBindID();
    }
/*
    onMountBindID() {
        /*if (!this.props.view.bindVertexSizeToView) {
            // get position from view itself
            nodeid = 'nodeof_' + this.props.data.id;
            if (!store.getState().idlookup[nodeid]){
                new CreateElementAction(this.createDataNode(nodeid));
            } // view-indipendent fallback, i do not add view.id to node.id
        } else {* /
        if (this.getId()) return;
        let dnode: DGraphElement = this.createDataNode(this.generateId());
        new CreateElementAction(dnode);
        // let nodeid: Pointer<DGraphElement, 1, 1, LGraphElement> = dnode.id;
        // this.setState({nodeid} );
    }

    getId(): string | undefined {
        return this.props.nodeid;
    }

    generateId(): Pointer<DGraphElement, 1, 1, LGraphElement> {
        // if (this.state.nodeid) return this.state.nodeid;
        let ret: string = 'nodeof_' + this.props.data.id + (this.props.view.bindVertexSizeToView ? '^' + this.props.view.id : '') + '^1';
        const idlookup = store.getState().idlookup;
        ret = U.increaseEndingNumber(ret, false, false, id => !idlookup[id]);
        return ret;
    }

    // to override

    createDataNode(id?: string): DGraphElement {
        return new DGraphElement(id || this.generateId(), this);
    }
 */

    // constants: evalutate solo durante il primo render, può essere una funzione con effetti collaterali sul componente,
    // in tal caso la si esegue e si prende il valore di ritorno.
    // preRenderFunc: funzione evalutata ed eseguita sempre prima del render, ha senso solo per generare effetti collaterali sulle "costanti".
    // jsxString: funzione evalutata una sola volta durante il primo render ed eseguita ad ogni update dei dati.

    /*getDefaultTemplate(): () => ReactNode{
        // to delete, i will get it from redux props instead of asking them with a func
        return () => null;
    }*/


    /*
    makeEvalContext_to_move(view: ViewElement): GObject {
        let evalContext: GObject = view.constants ? eval('window.tmp = ' + view.constants) : {};
        evalContext = {...GraphElementRaw.defaultContext, ...evalContext, model: this.props.data, ...this.props};
        (window as any).evalContext = evalContext;
        return evalContext;
    }
    /*
    setTemplateStringToDelete_move_in_map_statetoprops(view: ViewElement, fromConstructor: boolean = false): void {
        // to delete, i will get it from redux props instead of asking them with a func
        //if (!jsxString) { this.setState({template: this.getDefaultTemplate()}); return; }
        // sintassi: '||' + anything + (opzionale: '|' + anything)*N_Volte + '||' + jsx oppure direttamente: jsx
        let colors = ["red", "green", "blallo"];
        let daa = "daa_var";
        sposta tutto lo stato non-redux in stato redux e memoizza
        learn samuro & zeratul
        // eslint-disable-next-line no-mixed-operators
        windoww.Input2 = Input;
        const evalContext = this.makeEvalContext();
        // const evalContextOld = U.evalInContext(this, constants);
        // this.setState({evalContext});
        //console.error({jsx:view.jsxString, view});

        let jsxCodeString: DocString<ReactNode> = JSXT.fromString(view.jsxString, {factory: 'React.createElement'}) as any;
        const jsxparsedfunc = U.evalInContextAndScope<() => ReactNode>('()=>' + jsxCodeString, evalContext); // U.evalInContext({...this, ...evalContext}, res); // todo: remove eval and add new Function() ?

        let state: GraphElementState = new GraphElementStatee(view.preRenderFunc, evalContext, jsxparsedfunc) as GraphElementState;
        if (!fromConstructor) this.setState(state);
        else (this as any).state = state;
        console.log('parsed:', {state, thisstate: this.state, 'template':jsxparsedfunc, data:this.props.data});
    }
    /*
        setState<K extends keyof MPState>(state: ((prevState: Readonly<MPState>, props: Readonly<AllProps>) => (Pick<MPState, K> | MPState | null)) | Pick<MPState, K> | MPState | null, callback?: () => void): void {
            if (this._isMounted) super.setState(state, callback);
            else this.state = state as MPState;
        }*/

    componentDidMount(): void {
        // after first render
        this._isMounted = true;
    }

    componentWillUnmount(): void {
        // todo: devo fare in modo che il nodo venga cancellato solo se sto modificando la vista in modo che questo vertice non esista più.
        //  e non venga cancellato se il componente viene smontato perchè ho solo cambiato vista
        //  LOW PRIORITY perchè funziona anche senza, pur sprecando memoria che potrebbe essere liberata.
        // if (view_is_still_active_but_got_modified_and_vertex_is_deleted) new DeleteElementAction(this.getId());
    }
    /*
        componentDidUpdate(oldProps: Readonly<AllProps {/*
            const newProps = this.props
            if (oldProps.view !== newProps.view) { this.setTemplateString(newProps.view); }
    }*/

    private getTemplate(): ReactNode {
        /*if (!this.state.template) {
            this.setTemplateString('{c1: 118}', '()=>{this.setState({c1: this.state.c1+1})}',
                '<div><input value="{name}" onInput="{setName}"></input><p>c1:{this.state.c1}</p><Attribute prop1={daa} prop2={1 + 1.5} stringPropdaa=\"daa\" /><ul>{colors.map( color => <li>color: {color}</li>)}</ul></div>');
        }*/
        // console.log('getTemplate:', {props: this.props, template: this.props.template, ctx: this.props.evalContext});
        let ret;
        if (false && this.props.evalContext.Vertex) {
            setTimeout( () => SetRootFieldAction.new('forceupdate_', 41), 1); // todo: optimize this to avoid triggering it tons of times when a model is loaded.
            return <div>Loading</div>;}
        let context = {component:this, __proto__:this.props.evalContext};
        try {
            ret = U.execInContextAndScope<() => ReactNode>(this.props.template, [], context); }
        catch(e: any) {
            const view: LViewElement = this.props.view; //data._transient.currentView;
            let errormsg = ''; // 'Syntax Error in custom user-defined template.\n';
            if (e.message.indexOf("Unexpected token .") >= 0 || view.jsxString.indexOf('?.') >= 0 || view.jsxString.indexOf('??') >= 0)
            { errormsg += 'Reminder: nullish operators ".?" and "??" are not supported.\n\n' +e.toString() + '\n\n' + view.jsxString; }
            else if (view.jsxString.indexOf('?.') >= 0) { errormsg += 'Reminder: ?. operator and empty tags <></> are not supported.\n\n' +e.toString() + '\n\n' + view.jsxString; }
            ret = DV.errorView(errormsg, {where:"in getTemplate()", e});
        }
        return ret;
    }

    public get_size(): GraphSize | undefined {
        return this.props.view.getSize(this.props.dataid || this.props.nodeid as string) || this.props.node.size;
    }

    // set_size(x_or_size_or_point: number, y?: number, w?:number, h?:number): void;
    set_size(x_or_size_or_point: Partial<GraphPoint>): void;
    set_size(x_or_size_or_point: Partial<GraphSize>): void;
    // set_size(x_or_size_or_point: number | GraphSize | GraphPoint, y?: number, w?:number, h?:number): void;
    set_size(size0: Partial<GraphSize> | Partial<GraphPoint>): void {
        let size: Partial<GraphSize> = size0 as Partial<GraphSize>;
        if (this.props.view.storeSize) {
            let id = (this.props.dataid || this.props.nodeid) as string;
            this.props.view.updateSize(id, size);
            return;
        }
        let olds = this.props.node.size;
        size.x = size.x === undefined ? olds.x : size.x;
        size.y = size.y === undefined ? olds.y : size.y;
        size.w = size.w === undefined ? olds.w : size.w;
        size.h = size.h === undefined ? olds.h : size.h;
        this.props.node.size = size as GraphSize;
    }

    public render(): ReactNode {
        if (this.props.preRenderFunc) U.evalInContextAndScope(this.props.preRenderFunc, {component:this, __proto__:this.props.evalContext});
        const rnode: ReactNode = this.getTemplate();
        let rawRElement: ReactElement | null = U.ReactNodeAsElement(rnode);
        // @ts-ignore
        console.log('GE render', {thiss: this, rnode, rawRElement, props:this.props, name: this.props.data.name});
        const me: LModelElement = this.props.data as LModelElement; // this.props.model;

        const addprops: boolean = true;
        let fiximport = !!this.props.node; // todo: check if correct approach
        if (addprops && me && rawRElement && fiximport) {
            // console.log("pre-injecting", {thiss:this, data:this.props.data, props:this.props});
            let fixdoubleroot = true;
            const onDragTestInject = () => {}; // might inject event handlers like this with cloneelement
            // add view props to GraphElement childrens (any level down)
            const subElements: Dictionary<DocString<'nodeid'>, boolean> = {}; // this.props.getGVidMap(); // todo: per passarla come prop ma mantenerla modificabile
            try {
                rawRElement = React.cloneElement(rawRElement, {key: this.props.key || this.props.view.id + '_' + me.id, onDragTestInject, children: UX.recursiveMap(rawRElement/*.props.children*/,
                        (rn: ReactNode, index: number) => UX.injectProp(this, rn, subElements, this.props.parentnodeid as string, index))});
                if(fixdoubleroot) rawRElement = rawRElement.props.children;
                // console.log("probem", {rawRElement, children:(rawRElement as any)?.children, pchildren:(rawRElement as any)?.props?.children});
            } catch (e) {
                rawRElement = DV.errorView("error while injecting props to subnodes", {e, rawRElement, key:this.props.key, newid: this.props.view?.id+'_'+me?.id});
            }
            /*console.log('tempdebug', {deepStrictEqual, okeys:Object.keys});
            let isEqual = true;
            try {deepStrictEqual(subElements, this.props.node.subElements)} catch(e) { isEqual = false; }
            if (isEqual) {
                this.props.node.subElements = Object.keys(subElements);
            }*/
        }
        // const injectprops = {a:3, b:4} as DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
        // rnode = React.cloneElement(rnode as ReactElement, injectprops);

        // console.log("nodeee", {thiss:this, props:this.props, node: this.props.node});
        if (false && (this.props.node?.__raw as DGraphElement).father) {
            let $containedIn = $('#' + this.props.node.father);
            let $containerDropArea = $containedIn.find(".VertexContainer");
            const droparea = $containerDropArea[0] || $containedIn[0];
            Log.exDev(!droparea, 'invalid vertex container target', {$containedIn, $containerDropArea});
            if (droparea) return createPortal(
                rawRElement || rnode,
                droparea
            );
        }
        return rawRElement || rnode;
    }

}

// private
// type AllPropss = GraphElementOwnProps & GraphElementDispatchProps & GraphElementReduxStateProps;
type AllPropss = Overlap<Overlap<GraphElementOwnProps, GraphElementDispatchProps>, GraphElementReduxStateProps>;

const GraphElementConnected = connect<GraphElementReduxStateProps, GraphElementDispatchProps, GraphElementOwnProps, IStore>(
    GraphElementComponent.mapStateToProps,
    GraphElementComponent.mapDispatchToProps
)(GraphElementComponent as any);

export const GraphElement = (props: GraphElementOwnProps, childrens: (string | React.Component)[] = []): ReactElement => {
    return <GraphElementConnected {...{...props, childrens}} />; }
console.info('graphElement loaded');
