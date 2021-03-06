import React, {Dispatch, PureComponent, ReactElement, ReactNode} from "react";
import { connect } from "react-redux";
import './graph.scss';
import {
    IStore,
    DViewElement,
    LModelElement,
    LModel,
    DModel,
    LGraph,
    DGraph,
    DPointerTargetable,

    Graph, Vertex
} from "../../joiner";


// private
interface ThisState { }

export class GraphsContainerComponent extends PureComponent<AllProps, ThisState>{
    constructor(props: AllProps, context: any) {
        super(props, context);
    }

    // todo: per ogni vista crea un set di opzioni {enableAutocorrect: "boolean(true)", displayEdges: "boolean(true)", maximumGraphWidth: "number(2000)"} specificate dall\'utente che deve specificare sia il tipo (Come se osse una funzione) che il valore predefinito
    // il grafo deve leggere l'oggetto di opzioni e creare un menù che consente di cambiarle (una checkbox al posto dell'enableAutocorrect (bool), uno spinner per maximumGraphWidth (number...)

    render(): ReactNode {
        // const editinput = "<input onChange={(e) => this.data.name = e.target.value } value={this.data.name} />";
        // const editinput = "";
        // todo: rendi opzionale obj = this.data.id se non è specificato.
        // const editinput = "<Input obj={this.data.id} field={'name'} getter={val => val.toUpperCase()} setter={(val) => val.toLowerCase()} />";
        // "<Input obj={this.data} field={'name'} getter={val => val.toUpperCase()} setter={(val) => val.toLowerCase()} />";
        return (<>
            {
                this.props.graphs.map( (m: LGraph) => (
                    <>
                        {/*<svg style={{backgroundColor: 'red'}}>
                        <Overlap style={{width: '100px'}}>
                            success, now i can test resize handler overlayed to content and dragndrop dnd
                            <foreignObject className={"rectangle"} />
                            <foreignObject className={"ellipse"} />
                            <foreignObject className={"point"} />
                        </Overlap>
                        </svg><svg style={{backgroundColor: 'red'}}>
                            <Overlap>
                                <foreignObject className={"rectangle"} style={{width: '100px'}}/>
                                <foreignObject className={"ellipse"} style={{width: '300px'}}/>
                                <foreignObject className={"point"} />
                            </Overlap>
                        </svg>* /}
                        <GraphElement data={m} />*/}
                        {
                            <Graph graphid={m.id} data={m.model} view={undefined}>
                                <Vertex data={m.model}/>
                            </Graph>

                        }
                        {this.props.children/*<QA />*/}
                    </>)
                )
            }
        </>); }
}

// private
interface OwnProps {
    // propsRequestedFromHtmlAsAttributes: string;
}
// private
interface StateProps {
    models: LModel[];
    graphs: LGraph[];
    // propsFromReduxStateOrOtherKindOfStateManagement: boolean; // flux or custom things too, unrelated to this.state of react.
}

// private
interface DispatchProps {
    // propsFromReduxActions: typeof funzioneTriggeraAzioneDaImportare;
}


// private
type AllProps = OwnProps & StateProps & DispatchProps;

////// mapper func

function mapStateToProps(state: IStore, ownProps: OwnProps): StateProps {
    const ret: StateProps = {} as any;
    console.log('mapStateToProps', {ret, state, ownProps, models: state.models})
    ret.models = state.models.length ? state.models.map( (mid) => mid && DPointerTargetable.wrap(state.idlookup[mid] as DModel)) as LModel[] : [];
    ret.graphs = state.graphs.length ? state.graphs.map( (mid) => mid && LGraph.wrap(state.idlookup[mid] as DGraph)) as LGraph[] : [];
    /// to fill
    return ret; }

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    const ret: DispatchProps = {} as any;
    /// to fill
    return ret; }


const GraphsContainerConnected = connect<StateProps, DispatchProps, OwnProps, IStore>(
    mapStateToProps,
    mapDispatchToProps
)(GraphsContainerComponent);

export const GraphsContainer = (props: OwnProps, childrens: (string | React.Component)[] = []): ReactElement => {
    return <GraphsContainerConnected {...{...props, childrens}} />; }

