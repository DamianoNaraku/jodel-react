import React, {ReactNode} from "react";
import type {DClassifier, DParameter, GObject, LClass, LModelElement, LParameter} from "../../../joiner";
import {Input, LPointerTargetable, Select, U, UX} from "../../../joiner";

export default class Structure {
    private static BaseEditor(lModelElement: LModelElement) : ReactNode {
        return(<div className={"structure-input-wrapper row"}>
            <Input obj={lModelElement} field={"name"} label={"Name"} type={"text"} />
        </div>);
    }
    public static ModelEditor(lModel: LModelElement): ReactNode {
        return(<>
            {Structure.BaseEditor(lModel)}
        </>);
    }
    public static PackageEditor(lPackage: LModelElement): ReactNode {
        return(
            <div>
                {Structure.BaseEditor(lPackage)}
                <div className={"structure-input-wrapper row"}>
                    <Input obj={lPackage} field={"uri"} label={"NsURI:"} type={"text"} />
                </div>
                <div className={"structure-input-wrapper row"}>
                    <Input obj={lPackage} field={"prefix"} label={"NsPrefix:"} type={"text"} />
                </div>
            </div>);
    }
    public static ClassEditor(lClass: LModelElement): ReactNode {
        return(<div>
            {Structure.BaseEditor(lClass)}
            <div className={"structure-input-wrapper row"}>
                <Input obj={lClass} field={"abstract"} label={"IsAbstract"} type={"checkbox"} />
            </div>
            <div className={"structure-input-wrapper row"}>
                <Input obj={lClass} field={"interface"} label={"IsInterface"} type={"checkbox"} />
            </div>
        </div>);
    }
    private static DataTypeEditor(lDataType: LModelElement): ReactNode {
        return(<>
            <div className={"structure-input-wrapper row"}>
                <Input obj={lDataType} field={"serializable"} label={"IsSerializable"} type={"checkbox"} />
            </div>
        </>);
    }
    public static EnumEditor(lEnum: LModelElement): ReactNode {
        return(<div>
            {Structure.BaseEditor(lEnum)}
            {Structure.DataTypeEditor(lEnum)}
        </div>);
    }
    private static TypedElementEditor(lTypedElement: LModelElement): ReactNode {
        return(<>
            <div className={"structure-input-wrapper row"}>
                <Input obj={lTypedElement} field={"lowerBound"} label={"Lower Bound"} type={"number"} />
            </div>
            <div className={"structure-input-wrapper row"}>
                <Input obj={lTypedElement} field={"upperBound"} label={"Upper Bound"} type={"number"} />
            </div>
            <div className={"structure-input-wrapper row"}>
                <Input obj={lTypedElement} field={"ordered"} label={"IsOrdered"} type={"checkbox"} />
            </div>
            <div className={"structure-input-wrapper row"}>
                <Input obj={lTypedElement} field={"unique"} label={"IsUnique"} type={"checkbox"} />
            </div>
        </>);
    }
    private static StructuralFeatureEditor(lStructuralFeature: LModelElement): ReactNode {
        return(<>
            <div className={"structure-input-wrapper row"}>
                <Input obj={lStructuralFeature} field={"defaultValueLiteral"} label={"Default Value Literal"} type={"text"} />
            </div>
            <div className={"structure-input-wrapper row"}>
                <Input obj={lStructuralFeature} field={"changeable"} label={"IsChangeable"} type={"checkbox"} />
            </div>
            <div className={"structure-input-wrapper row"}>
                <Input obj={lStructuralFeature} field={"volatile"} label={"IsVolatile"} type={"checkbox"} />
            </div>
            <div className={"structure-input-wrapper row"}>
                <Input obj={lStructuralFeature} field={"transient"} label={"IsTransient"} type={"checkbox"} />
            </div>
            <div className={"structure-input-wrapper row"}>
                <Input obj={lStructuralFeature} field={"unsettable"} label={"IsUnsettable"} type={"checkbox"} />
            </div>
            <div className={"structure-input-wrapper row"}>
                <Input obj={lStructuralFeature} field={"derived"} label={"IsDerived"} type={"checkbox"} />
            </div>
        </>);
    }
    public static AttributeEditor(lAttribute: LModelElement): ReactNode {
        return(<div>
            {Structure.BaseEditor(lAttribute)}
            {Structure.TypedElementEditor(lAttribute)}
            {Structure.StructuralFeatureEditor(lAttribute)}
            <div className={"structure-input-wrapper row"}>
                <Input obj={lAttribute} field={"isID"} label={"IsID"} type={"checkbox"} />
            </div>
        </div>);
    }
    public static ReferenceEditor(lReference: LModelElement): ReactNode {
        return(<div>
            {Structure.BaseEditor(lReference)}
            {Structure.TypedElementEditor(lReference)}
            {Structure.StructuralFeatureEditor(lReference)}
            <div className={"structure-input-wrapper row"}>
                <Input obj={lReference} field={"containment"} label={"IsContainment"} type={"checkbox"} />
            </div>
            <div className={"structure-input-wrapper row"}>
                <Input obj={lReference} field={"container"} label={"IsContainer"} type={"checkbox"} />
            </div>
            <div className={"structure-input-wrapper row"}>
                <Input obj={lReference} field={"resolveProxies"} label={"IsResolveProxies"} type={"checkbox"} />
            </div>
        </div>);
    }
    public static EnumLiteralEditor(lEnumLiteral: LModelElement): ReactNode {
        return(<div>
            {Structure.BaseEditor(lEnumLiteral)}<div className={"structure-input-wrapper row"}>
            <Input obj={lEnumLiteral} field={"value"} label={"Value"} type={"number"} />
        </div>
        </div>);
    }

    public static OperationEditor(lOperation: LModelElement & GObject): ReactNode {
        return(<div>
            {Structure.BaseEditor(lOperation)}
            {lOperation.parameters.map((parameter: LParameter, index: number) => {
                const lParameter: LParameter = parameter;
                if (index > 0) {
                    return <div>
                        <div className={"structure-children-input-wrapper row"}>
                            <Input obj={parameter.id} field={"name"} label={"Parameter"} type={"text"} />
                            <Select obj={parameter.id} field={"type"} />
                            <div className={"child-delete"} onClick={() => { UX.deleteWithAlarm(lParameter)}}>
                                <i className={"bi bi-trash3-fill"}></i>
                            </div>
                        </div>
                    </div>
                }
            })}
            {lOperation.exceptions.map((exception: DClassifier) => {
                const lException: LClass = LPointerTargetable.from(exception);
                return <div className={"structure-children-input-wrapper row"}>
                    <Input obj={exception} field={"name"} label={"Exception"} type={"text"} />
                    <div className={"child-delete"} onClick={async() => {await UX.deleteWithAlarm(lException)}}>
                        <i className={"bi bi-trash3-fill"}></i>
                    </div>
                </div>
            })}
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
            }
        }
        return <div className={"row"}><div className={"col-lg"}>No model selected.</div></div>;
    }
}
