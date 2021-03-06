import React, {CSSProperties, Dispatch, PureComponent, ReactElement, ReactNode} from "react";
import { connect } from "react-redux";
import {
    U,
    IStore,
    Log,
    windoww,
    LViewElement,
    RuntimeAccessibleClass, LModelElement, Dictionary, GObject, DModelElement,
} from "../../joiner";
import {
    GraphElementStatee,
    GraphElementDispatchProps,
    GraphElementReduxStateProps,
    GraphElementOwnProps,
    GraphElementComponent,
} from "../../joiner";

const superclass: typeof GraphElementComponent = RuntimeAccessibleClass.classes.GraphElementComponent as any as typeof GraphElementComponent;

// private
class DefaultNodeStatee extends GraphElementStatee { }

// from ownstateprops function getVertexID(props: AllPropss): Pointer<DVoidVertex, 0, 1, LVoidVertex> { return props.vertex?.id; }

export class DefaultNodeComponent<AllProps extends AllPropss = AllPropss, NodeState = DefaultNodeStatee>
    extends superclass<AllProps, NodeState>{


    static mapStateToProps(state: IStore, ownProps: GraphElementOwnProps): GraphElementReduxStateProps {
        let ret: GraphElementReduxStateProps = {} as GraphElementReduxStateProps; // NB: cannot use a constructor, must be pojo
        GraphElementComponent.mapViewAndModelElement(state, ret, ownProps);
        return ret; }

    constructor(props: AllProps, context: any) { super(props, context); }

    render(): ReactNode {
        const view: LViewElement = this.props.view;
        const modelElement: LModelElement = this.props.data;

        let componentMap: Dictionary<string, (props: GObject, childrens?: (string | React.Component)[]) => ReactElement> = windoww.components;
        let dmodelMap: Dictionary<string, typeof DModelElement> = RuntimeAccessibleClass.classes as any;

        let serializableProps = {...this.props, data: this.props.data?.id, view: this.props.view?.id, views: this.props.views?.map( v => v.id )};
        // console.log('dnode render', {props: {...this.props}, serializableProps});
        if (view.forceNodeType) switch (view.forceNodeType) {
            default: Log.exDevv('unrecognized View.forceNodeType:' + view.forceNodeType, {view, modelElement}); return <div>dev error</div>
            case windoww.Components.GraphElementComponent.name:
            case windoww.Components.VertexComponent.name:
            case windoww.Components.FieldComponent.name: return componentMap[view.forceNodeType](this.props, this.props.children);
        }
        if (modelElement) switch(modelElement.className) {
            default:
                const dmodel: typeof DModelElement = dmodelMap[modelElement.className];
                Log.exDev(!dmodel || !dmodel.defaultComponent, 'invalid model class:', {dmodel, modelElement, view, dmodelMap, componentMap});
                return dmodel.defaultComponent(serializableProps, this.props.children);
        }
        // errore: questoon passa gli id correttamente al sottoelemento vertex o field
        return (<>Error: Node is missing both view and model</>);
    }

}

// private
class DefaultNodeOwnProps extends GraphElementOwnProps {}
class DefaultNodeReduxStateProps  extends GraphElementReduxStateProps {}
class DefaultNodeDispatchProps extends GraphElementDispatchProps {}
type AllPropss = DefaultNodeOwnProps & DefaultNodeReduxStateProps & DefaultNodeDispatchProps;


const DefaultNodeConnected = connect<DefaultNodeReduxStateProps, DefaultNodeDispatchProps, DefaultNodeOwnProps, IStore>(
    DefaultNodeComponent.mapStateToProps,
    DefaultNodeComponent.mapDispatchToProps
)(DefaultNodeComponent as any);
// export const Vertex = VertexConnected;


export const DefaultNode = (props: DefaultNodeOwnProps, childrens: (string | React.Component)[] = []): ReactElement => {
    return <DefaultNodeConnected {...{...props, childrens}} />; }
