import React, { ReactNode } from "react";
import type { Dictionary, DocString, LGraph } from "../joiner";
import { LPointerTargetable, GraphElementComponent, DViewElement } from "../joiner";
export declare class UX {
    static recursiveMap<T extends ReactNode | ReactNode[] | null | undefined>(children: T, fn: (rn: T, i: number, depthIndices: number[]) => T, depthIndices?: number[]): T;
    static injectProp(parentComponent: GraphElementComponent, e: ReactNode, gvidmap_useless: Dictionary<DocString<'VertexID'>, boolean>, parentnodeid: string, index: number, indices: number[], injectOffset?: LGraph): ReactNode;
    static ReactNodeAsElement(e: React.ReactNode): React.ReactElement | null;
    static deleteWithAlarm(lItem: LPointerTargetable): Promise<void>;
    static info(text: string): Promise<void>;
    private static initPropInjectionStuff;
    private static graphComponents;
    private static inputComponents;
    private static graphComponentsRegexp;
    private static inputComponentRegexp;
    private static GC_propsAdder;
    private static Input_propsAdder;
    private static injectPropsToString_addstuff;
    private static viewRootProps;
    private static decorativeViewRootProps;
    private static mainViewRootProps;
    static injectPropsToString(s: string, asMainView: boolean, graphComponentsProps: string, inputComponentProps: string): string;
    static parseAndInject(jsxString: string, v: DViewElement): string;
}
