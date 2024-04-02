import { ReactNode } from "react";
import type { LModelElement } from "../../../joiner";
import { LObject } from "../../../joiner";
export default class Structure {
    static cname: string;
    private static BaseEditor;
    static ModelEditor(lModel: LModelElement): ReactNode;
    static PackageEditor(lPackage: LModelElement): ReactNode;
    static ClassEditor(lClass: LModelElement): ReactNode;
    private static DataTypeEditor;
    static EnumEditor(lEnum: LModelElement): ReactNode;
    private static TypedElementEditor;
    private static StructuralFeatureEditor;
    static AttributeEditor(lAttribute: LModelElement): ReactNode;
    static ReferenceEditor(lReference: LModelElement): ReactNode;
    static EnumLiteralEditor(lEnumLiteral: LModelElement): ReactNode;
    static OperationEditor(me: LModelElement): ReactNode;
    static ObjectEditor(me: LModelElement): ReactNode;
    static forceConform(me: LObject): JSX.Element;
    static ValueEditor(me: LModelElement): ReactNode;
    static Editor(lModelElement: LModelElement | null): ReactNode;
}
