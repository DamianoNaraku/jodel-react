import React, {Dispatch, ReactElement, ReactNode, useEffect, useState} from 'react';
import {connect} from "react-redux";
import {Dictionary, DocString, DPointerTargetable, GObject, Log, LPointerTargetable, TextArea, DState, LViewElement, Pointer, U} from "../../joiner";
import {useStateIfMounted} from "use-state-if-mounted";
import {stringify} from "querystring";
import "./FunctionComponent.scss";

/*
 Rationale behind this:
 To do this properly, one would need a complete js parser to make sure comments, ifs, loops, newlines,
   expressions inside array indexing for objects... are all correctly parsed.


 Instead, to make it faster, i'm forcing the valid "function string" value to hold a much more definite structure
   for which i can do an extremely simpler inline parser.
 The getter and setter properties and the interface, are making sure the user cannot write a "function string"
   not respecting my format, and that it is as much turing-complete as javascript is.

 legenda:
  - ALL_CAPS identifiers, are not literals and the user can change their names.
  - Newlines are included in the format, spaces are not.
  - ... are explaining the format and are not part of it.
  - // **   ** // Styled comments ARE part of the format.
  - Excess spaces in the format are not preserved (might be added/removed by getter/setter), but not mandatory and not relevant.

 my structure is:
 (OBJECT_NAME)=> {\n
   STATEMENT_A1
   STATEMENT_A2
   ...
   STATEMENT_AN
   \n// ** declarations here ** //\n
   OBJECT_NAME.IDENTIFIER_1 = STATEMENT_1;\n
   OBJECT_NAME.IDENTIFIER_2 = STATEMENT_2;\n
   ...
   OBJECT_NAME.IDENTIFIER_N = STATEMENT_N;\n
 }
 */

type StrPos = {value: string, line?: number, startindex?: number, endindex?: number};
type RowData = {index: number; key?: string, id: StrPos & { prefix: string }; exp: StrPos, isDirty?: boolean};
type TextAreaState = {v:string, isDirty?: boolean};
type FunctionComponentState = {advancedMode: boolean, ta: TextAreaState, arr: RowData[]};
type SetState = (value: FunctionComponentState)=>void;

function parseFunction(props: AllProps): FunctionComponentState {
    Log.exDev(!props.data, "FunctionComponent: missing data props", {props});
    let getter = props.getter || ((a: GObject) => a[props.field]); // ((lobj: GObject<LPointerTargetable>, key: string) => U.wrapUserFunction(lobj[key]));
    let val: string = getter(props.data);
    if (!val) val = "(ret)=>{\n    // ** declarations here ** //\n\n}";
    let txtparts = val.split("// ** declarations here ** //");
    Log.exDev(txtparts.length !== 2, "cannot find declaration section", {val, props});
    let declarations: string[] = (txtparts[1] || '').split("\n");
    let stateArrayValues: RowData[] = [];
    let textAreaState: TextAreaState = {v: txtparts[0]};
    let i: number = 0;
    for (let dec of declarations) {
        let splitindex = dec.indexOf("=");
        if (splitindex === -1) continue; // for ending \n} line
        let expression = dec.substring(splitindex+1);
        let identifier = dec.substring(0, splitindex);
        let idsplitindex = identifier.indexOf(".");
        let identifierPrefix = identifier.substring(0, idsplitindex);
        let identifierName = identifier.substring(idsplitindex+1);
        stateArrayValues.push({
            index: i++, // don't loop by i, the index ending in state must increase only for non-empty rows filtering them out.
            key: identifierName,
            id: {prefix: identifierPrefix, value: identifierName.trim(), line: i, startindex: idsplitindex, endindex: splitindex},
            exp:{                          value: expression.trim(),     line: i, startindex: splitindex,   endindex: -1}
        });
    }
    return {advancedMode: !!props.advancedMode, ta: textAreaState, arr:stateArrayValues};
}

// event listing start
// it's not on purpose, but this function is a candidate for obscure code context XD
function addClick(v: FunctionComponentState, set: SetState): void {
    set({...v, arr: [...v.arr, {index: (v.arr[v.arr.length-1]?.index ?? -1) +1,
            id: {prefix: v.arr[0]?.id.prefix || "ret", value: ""},
            exp: {value: ""} }]
    });
}

function deleteClick(v: FunctionComponentState, set: SetState, i: number, props: AllProps): void {
    v = {...v, arr:[...v.arr]};
    v.arr.splice(i, 1);
    set(v);
    onBlur(v, set, props, undefined, true);
}

function expressionChange(e: React.FormEvent<HTMLInputElement>, i: number, v: FunctionComponentState, set: SetState): void {
    v = {...v, arr:[...v.arr]};
    v.arr[i] = {
        ...v.arr[i],
        isDirty: true,
        exp: {...v.arr[i].exp, value: e.currentTarget.value}
    };
    set(v);
}

function identifierChange(e: React.FormEvent<HTMLInputElement>, i: number, v: FunctionComponentState, set: SetState): void {
    let nv = e.currentTarget.value;
    v = {...v, arr:[...v.arr]};
    v.arr[i] = {
        ...v.arr[i],
        isDirty: true,
        // empty string is fine, as long value is empty too the entire row is ignored. but identifiers cannot start with a number are not allowed.
        id: {...v.arr[i].id, value: isNaN(+nv[0]) ? nv : "A" + nv}
    };
    set(v);
}

function textAreaChange(e: React.FormEvent<HTMLTextAreaElement>, v: FunctionComponentState, set: SetState): void {
    set({...v, ta: {v:e.currentTarget.value, isDirty: true} });
}

function onBlur(v: FunctionComponentState, set: SetState, props: AllProps, i?: number, isDelete?: boolean) {
    if (isDelete) {
        // force update without checking dirty (the row is not present anymore)
    }
    // problem: this might be called before the onChange setState() actually edits the state, so it finds isDirty false or even a non-yet existing index
        // for now i will just hope the user is not typing and blurring extra fast, i don't think a simple solution exists
    else if (i !== undefined) {
        if (!v.arr[i]?.isDirty) return;
        v = {...v, arr:[...v.arr]};
        v.arr[i] = {
            ...v.arr[i],
            isDirty: false,
        };
        set(v);
    }
    else {
        if (!v.ta.isDirty) return;
        set({...v, ta: {v: v.ta.v, isDirty: false} });
    }
    updateFunctionValue(props, v.ta.v, v.arr);
}

function updateFunctionValue(props: AllProps, textAreaContent: string, stateArrayValues: RowData[]){
    let declarations: string[] = stateArrayValues.map( o => o.id.value && o.exp.value ? o.id.prefix + "." + o.id.value + " = " + o.exp.value : '');
    let setter = props.setter || ((v: string) => (props.data as GObject)[props.field] = v);
    setter(textAreaContent + "\n// ** declarations here ** //\n" + declarations.filter(d=>!!d).join("\n") + "\n}")
}
// event listing end

function FunctionComponent(props: AllProps) {
    // if (false) return asTextArea(props) // i gave up
    const [state, setState] = useStateIfMounted(parseFunction(props));
    // if (!props.data) return <></>;
    let stateArrayValues: RowData[] = state.arr,
        textAreaState: TextAreaState = state.ta,
        advancedMode: boolean = state.advancedMode,
        readOnly = props.readonly; // (props.readonly !== undefined) ? props.readonly : !props.debugMode && props.data.id.indexOf("Pointer_View") !== -1;

    // NB: could be heavily optimized by cutting the original string with indexes and substring,
    // but it is a function called too rarely and not impactful on overall performances



    // JSX building start
    let inputs: JSX.Element[] = [];
    console.log("funccomp", {stateArrayValues, textAreaState, props});


    for (let row of stateArrayValues) {
        inputs.push(<div className={"d-flex" + (advancedMode ? "" : " my-1")} key={row.index} data-key={row.index}>
            <span className={"my-auto detailedMode"}>{row.id.prefix}.</span>
            <input className={"my-auto input"} placeholder={"identifier"} value={row.id.value}  disabled={readOnly}
                   tabIndex={row.index*2}
                   onInput={(e)=>identifierChange(e, row.index, state, setState)}
                   onBlur={(e)=> !readOnly && onBlur(state, setState, props, row.index)}
            />
            <span className={"my-auto mx-1 simpleMode"} style={{fontWeight: "bold"}}>⇠</span>
            <span className={"my-auto mx-1 detailedMode"}>=</span>
            <input className={"my-auto input"} placeholder={"expression"} value={row.exp.value} disabled={readOnly}
                   tabIndex={row.index*2+1}
                   onInput={(e)=>expressionChange(e, row.index, state, setState)}
                   onBlur={(e)=> !readOnly && onBlur(state, setState, props, row.index)}
            />
            <span className={"my-auto detailedMode"}>;</span>
            <button className={"btn btn-danger my-auto ms-2"} tabIndex={stateArrayValues.length*2 +1 +row.index} disabled={readOnly} onClick={()=>!readOnly && deleteClick(state, setState, row.index, props)}>
                <i className={"p-1 bi bi-trash3-fill"} /></button>
        </div>);
    }

    return <div className={"function-editor-root"} data-mode={advancedMode ? "detailedMode" : "simpleMode"} style={{fontSize: "0.9rem"}}>
        <i className={ advancedMode ? "p1 bi bi-eye-slash-fill" : "p1 bi bi-eye-fill"} onClick={()=>setState( {...state, advancedMode:!state.advancedMode})} />
        <textarea className={"detailedMode input"} disabled={readOnly} rows={Math.min(10, textAreaState.v.split("\n").length)}
                  onInput={(e)=>textAreaChange(e, state, setState)}
                  onBlur={(e)=> !readOnly && onBlur(state, setState, props)}
        >{textAreaState.v}</textarea>
        {inputs}
        <button className={"btn btn-secondary w-100"} tabIndex={stateArrayValues.length*2}
                disabled={readOnly} onClick={()=> !readOnly && addClick(state, setState)}>+</button>
        <div style={{whiteSpace:"pre"}}>{(props.data as any)[props.field]}</div>
    </div>;
}

interface OwnProps {
    advancedMode?: boolean; // toggle textbox pre-declarations, initial value to set state. after initialization only state.advancedMode is used
    data: LPointerTargetable;
    field: string;
    getter?: (data: LPointerTargetable) => string;
    setter?: (value: string|boolean) => void;
    readonly?: boolean;
    // not used for now
    label?: string;
    jsxLabel?: ReactNode;
    className?: string;
    style?: GObject;
    tooltip?: string | boolean | ReactElement;
    hidden?: boolean;
    autosize?: boolean;
    inputClassName?: string;
    inputStyle?: GObject;
    asLabel?: boolean;
    key?: React.Key | null;
}

interface StateProps {
}

interface DispatchProps { }
type AllProps = OwnProps & StateProps & DispatchProps;

/*
function mapStateToProps(state: DState, ownProps: OwnProps): StateProps {
  return ownProps;
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    const ret: DispatchProps = {};
    return ret;
}


export const FunctionConnected = connect<StateProps, DispatchProps, OwnProps, DState>(
    mapStateToProps,
    mapDispatchToProps
)(FunctionComponent);
*/
// export const Function = (props: OwnProps, children: (string | React.Component)[] = []): ReactElement => (<FunctionConnected {...{...props, children}} />);
export const Function = (props: OwnProps, children: (string | React.Component)[] = []): ReactElement => (<FunctionComponent {...{...props, children}} />);

Function.cname = "FunctionComponent";
// FunctionConnected.cname = "FunctionComponent";
FunctionComponent.cname = "FunctionComponent_Disconnected";

