import { DGraphElement, DModelElement, DocString, DViewElement, EdgeHead } from '../joiner';
import React from "react";
export declare class DV {
    static invisibleJsx(): string;
    static modelView(): string;
    static packageView(): string;
    static classView(): string;
    static attributeView(): string;
    static referenceView(): string;
    static enumeratorView(): string;
    static literalView(): string;
    static voidView(): string;
    static operationView(): string;
    static operationViewm1(): string;
    static objectView(): string;
    static valueView(): string;
    static defaultPackage(): string;
    static errorView(publicmsg: string | JSX.Element, debughiddenmsg: any, errortype: string, data?: DModelElement | undefined, node?: DGraphElement | undefined, v?: DViewElement): React.ReactNode;
    static errorView_string(publicmsg: string, debughiddenmsg: any, errortype: string, data?: DModelElement | undefined, node?: DGraphElement | undefined, v?: DViewElement): React.ReactNode;
    static edgePointView(): string;
    static edgePointViewSVG(): string;
    static svgHeadTail(head: "Head" | "Tail", type: EdgeHead): string;
    static edgeView(modename: EdgeHead, head: DocString<"JSX">, tail: DocString<"JSX">, dashing: string | undefined): string;
    static semanticErrorOverlay_old(): string;
    static semanticErrorOverlay(): string;
}
