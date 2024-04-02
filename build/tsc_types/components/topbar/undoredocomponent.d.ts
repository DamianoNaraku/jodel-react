import React, { PureComponent, ReactNode } from 'react';
import { GObject, DState } from '../../joiner';
declare class UndoRedoState {
    hover: boolean;
    jsx: any | null;
    constructor(jsx: any);
}
interface ThisState {
    undo: UndoRedoState;
    redo: UndoRedoState;
}
interface OwnProps {
}
interface StateProps {
    maxlistsize: number;
    undo: GObject<"delta">[];
    redo: GObject<"delta">[];
    debug: boolean;
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare class SaveManagerComponent extends PureComponent<AllProps, ThisState> {
    static cname: string;
    private undoredolistoutdated;
    do_undo: (index: number) => void;
    do_redo: (index: number) => void;
    printablePointer(pathsegment: string, state: DState): string;
    undoredoenter: (key?: string) => void;
    undoenter: () => void;
    redoenter: () => void;
    undoleave: () => void;
    redoleave: () => void;
    constructor(props: AllProps, context: any);
    render(): ReactNode;
}
export declare const SaveManagerConnected: import("react-redux").ConnectedComponent<typeof SaveManagerComponent, import("react-redux").Omit<React.ClassAttributes<SaveManagerComponent> & OwnProps & StateProps & DispatchProps, "debug" | "undo" | "redo" | "maxlistsize"> & OwnProps>;
export default SaveManagerConnected;
