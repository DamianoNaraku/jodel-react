import React, {ReactNode} from "react";
import type {DClassifier, GObject, LModelElement, LParameter} from "../../../joiner";
import {
    DValue,
    Input,
    LClassifier,
    LEnumerator, LOperation,
    LPointerTargetable,
    LStructuralFeature,
    LValue,
    Select,
    Selectors,
    SetFieldAction,
    U,
    UX
} from "../../../joiner";
import Value from "./editors/Value";

export default class Structure {
    private static BaseEditor(lModelElement: LModelElement) : ReactNode {
        return(<>
            <Input obj={lModelElement} field={"id"} label={"ID"} type={"text"} readonly={true} />
            <Input obj={lModelElement} field={"name"} label={"Name"} type={"text"} tooltip={"name"} />
        </>);
    }
    public static ModelEditor(lModel: LModelElement): ReactNode {
        return(<>{Structure.BaseEditor(lModel)}</>);
    }
    public static PackageEditor(lPackage: LModelElement): ReactNode {
        return(<>
            {Structure.BaseEditor(lPackage)}
            <Input obj={lPackage} field={"uri"} label={"NsURI"} type={"text"} tooltip={"uri"} />
            <Input obj={lPackage} field={"prefix"} label={"NsPrefix"} type={"text"} tooltip={"prefix"} />
        </>);
    }
    public static ClassEditor(lClass: LModelElement): ReactNode {
        return(<>
            {Structure.BaseEditor(lClass)}
            <Input obj={lClass} field={"abstract"} label={"IsAbstract"} type={"checkbox"} tooltip={"abstract"} />
            <Input obj={lClass} field={"interface"} label={"IsInterface"} type={"checkbox"} tooltip={"interface"} />
        </>);
    }
    private static DataTypeEditor(lDataType: LModelElement): ReactNode {
        return(<Input obj={lDataType} field={"serializable"} label={"IsSerializable"} type={"checkbox"} tooltip={"serializable"} />);
    }
    public static EnumEditor(lEnum: LModelElement): ReactNode {
        return(<>
            {Structure.BaseEditor(lEnum)}
            {Structure.DataTypeEditor(lEnum)}
        </>);
    }
    private static TypedElementEditor(lTypedElement: LModelElement): ReactNode {
        return(<>
            <Select obj={lTypedElement} field={"type"} label={"Type"} />
            <Input obj={lTypedElement} field={"lowerBound"} label={"Lower Bound"} type={"number"} tooltip={"lowerBound"} />
            <Input obj={lTypedElement} field={"upperBound"} label={"Upper Bound"} type={"number"} tooltip={"upperBound"} />
            <Input obj={lTypedElement} field={"ordered"} label={"IsOrdered"} type={"checkbox"} tooltip={"ordered"} />
            <Input obj={lTypedElement} field={"unique"} label={"IsUnique"} type={"checkbox"} tooltip={"unique"} />
        </>);
    }
    private static StructuralFeatureEditor(lStructuralFeature: LModelElement): ReactNode {
        return(<>
            <Input obj={lStructuralFeature} field={"defaultValueLiteral"} label={"Default Value Literal"} type={"text"} tooltip={"defaultValueLiteral"} />
            <Input obj={lStructuralFeature} field={"changeable"} label={"IsChangeable"} type={"checkbox"} tooltip={"changeable"} />
            <Input obj={lStructuralFeature} field={"volatile"} label={"IsVolatile"} type={"checkbox"} tooltip={"volatile"} />
            <Input obj={lStructuralFeature} field={"transient"} label={"IsTransient"} type={"checkbox"} tooltip={"transient"} />
            <Input obj={lStructuralFeature} field={"unsettable"} label={"IsUnsettable"} type={"checkbox"} tooltip={"unsettable"} />
            <Input obj={lStructuralFeature} field={"derived"} label={"IsDerived"} type={"checkbox"} tooltip={"derived"} />
        </>);
    }
    public static AttributeEditor(lAttribute: LModelElement): ReactNode {
        return(<>
            {Structure.BaseEditor(lAttribute)}
            {Structure.TypedElementEditor(lAttribute)}
            {Structure.StructuralFeatureEditor(lAttribute)}
            <Input obj={lAttribute} field={"isID"} label={"IsID"} type={"checkbox"} tooltip={"isID"} />
        </>);
    }
    public static ReferenceEditor(lReference: LModelElement): ReactNode {
        return(<>
            {Structure.BaseEditor(lReference)}
            {Structure.TypedElementEditor(lReference)}
            {Structure.StructuralFeatureEditor(lReference)}
            <Input obj={lReference} field={"containment"} label={"IsContainment"} type={"checkbox"} tooltip={"containment"} />
            <Input obj={lReference} field={"container"} label={"IsContainer"} type={"checkbox"} tooltip={"container"} />
            <Input obj={lReference} field={"resolveProxies"} label={"IsResolveProxies"} type={"checkbox"} tooltip={"resolveProxies"} />
        </>);
    }
    public static EnumLiteralEditor(lEnumLiteral: LModelElement): ReactNode {
        return(<>
            {Structure.BaseEditor(lEnumLiteral)}
            <Input obj={lEnumLiteral} field={"value"} label={"Value"} type={"number"} tooltip={"Value"} />
        </>);
    }

    public static OperationEditor(me: LModelElement): ReactNode {
        const operation: LOperation = LOperation.fromPointer(me.id);
        return(<>
            {Structure.BaseEditor(operation)}
            <Select obj={operation.parameters[0].id} field={'type'} label={'Return'} />
            {operation.parameters.map((parameter, index) => {
                if (index > 0) {
                    return <div key={index}>
                        <label className={'ms-1'}>Parameter</label>
                        <div className={'ms-3'}>
                            <Input obj={parameter.id} field={"name"} label={'• Name'} type={"text"} tooltip={"parameter"} />
                            <Select obj={parameter.id} field={"type"} label={'• Type'} />
                        </div>
                    </div>
                }
            })}
            {operation.exceptions.map((exception, index) => {
                return <div key={index}>
                    <Input obj={exception.id} field={"name"} label={"Exception"} type={"text"} tooltip={"exception"} />
                </div>
            })}
        </>);
    }
    public static ValueEditor(me: LModelElement & GObject): ReactNode {
        const lValue: LValue = LValue.fromPointer(me.id);

        return(<div>
            {Structure.BaseEditor(lValue)}
            <Value value={lValue} />
        </div>);
    }
    public static Editor(lModelElement: LModelElement|undefined) : ReactNode {
        if(lModelElement){
            switch (lModelElement.className){
                default: break;
                case "DModel": return Structure.ModelEditor(lModelElement);
                case "DPackage": return Structure.PackageEditor(lModelElement);
                case "DClass": return Structure.ClassEditor(lModelElement);
                case "DAttribute": return Structure.AttributeEditor(lModelElement);
                case "DReference": return Structure.ReferenceEditor(lModelElement);
                case "DEnumerator": return Structure.EnumEditor(lModelElement);
                case "DEnumLiteral": return Structure.EnumLiteralEditor(lModelElement);
                case "DOperation": return Structure.OperationEditor(lModelElement);
                case "DObject" : return Structure.BaseEditor(lModelElement);
                case "DValue" : return Structure.ValueEditor(lModelElement);
            }
        }
        return <div className={"row"}><div className={"col-lg"}>No model selected.</div></div>;
    }
}

