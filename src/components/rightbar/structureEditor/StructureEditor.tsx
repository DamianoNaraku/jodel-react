import React, {Dispatch, PureComponent, ReactElement, ReactNode} from "react";
import {connect} from "react-redux";
import {
    DGraphElement,
    DModelElement,
    DPointerTargetable,
    DViewElement,
    IStore,
    LGraphElement,
    LModelElement,
    LViewElement,
    Pointer,
} from "../../../joiner";
import Structure from "./Structure";


interface ThisState {}

class StructureEditorComponent extends PureComponent<AllProps, ThisState> {

    constructor(props: AllProps, context: any) {
        super(props, context);
    }

    render(): ReactNode{
        const lModelElement: LModelElement | undefined = this.props.selected?.modelElement;
        return <div className={"px-4"}>
            <div className={"mt-3"}>
                {Structure.Editor(lModelElement)}
            </div>
            {/*
            <hr className={'mt-5'} />
            <div>Exportable Json</div>
            <span style={{whiteSpace: "pre"}}>{JSON.stringify(lModelElement?.generateEcoreJson(), null, "\t")}</span>
            <hr className={'mt-5'} />
            <div>Internal state</div>
            <span style={{whiteSpace: "pre"}}>{JSON.stringify(lModelElement, null, '\t')}</span>
            */}
        </div>;
    }
}

interface OwnProps {}
interface StateProps {
    selectedid?: { node: Pointer<DGraphElement, 1, 1>; view: Pointer<DViewElement, 1, 1>; modelElement: Pointer<DModelElement, 0, 1> };
    selected?: { node: LGraphElement; view: LViewElement; modelElement?: LModelElement };
}
interface DispatchProps {}

type AllProps = OwnProps & StateProps & DispatchProps;

function mapStateToProps(state: IStore, ownProps: OwnProps): StateProps {
    const ret: StateProps = {} as any;
    ret.selectedid = state._lastSelected;
    ret.selected = ret.selectedid && {
        node: DPointerTargetable.wrap(state.idlookup[ret.selectedid.node]) as LGraphElement,
        view: DPointerTargetable.wrap(state.idlookup[ret.selectedid.view]) as LViewElement,
        modelElement: ret.selectedid.modelElement ? DPointerTargetable.wrap<DPointerTargetable, LModelElement>(state.idlookup[ret.selectedid.modelElement]) : undefined };
    return ret;
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    const ret: DispatchProps = {} as any;
    return ret;
}


export const StructureEditorConnected = connect<StateProps, DispatchProps, OwnProps, IStore>(
    mapStateToProps,
    mapDispatchToProps
)(StructureEditorComponent);

export const StructureEditor = (props: OwnProps, childrens: (string | React.Component)[] = []): ReactElement => {
    return <StructureEditorConnected {...{...props, childrens}} />;
}
export default StructureEditor;
