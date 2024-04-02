import React, { PureComponent, ReactElement, ReactNode } from 'react';
import { DockContext, PanelData, TabData } from "rc-dock";
import './style.scss';
import { DModel, LModel, Pointer } from '../../joiner';
export declare class TabDataMaker {
    static metamodel(model: LModel | DModel): TabData;
    static model(model: LModel | DModel): TabData;
}
interface ThisState {
}
declare class DockLayoutComponent extends PureComponent<AllProps, ThisState> {
    private dock;
    private dockPanel;
    private dockContext;
    private groups;
    private test;
    private structureEditor;
    private treeEditor;
    private viewsEditor;
    private styleEditor;
    private viewpointEditor;
    private console;
    private views;
    private moveOnStructure;
    private moveOnViews;
    private iotLoaded;
    constructor(props: AllProps, context: any);
    OPEN(model: DModel | LModel): void;
    CLOSE(pointer: Pointer<DModel, 1, 1, LModel>): void;
    shouldComponentUpdate(newProps: Readonly<AllProps>, newState: Readonly<ThisState>, newContext: any): boolean;
    componentDidUpdate(prevProps: Readonly<AllProps>, prevState: Readonly<ThisState>, snapshot?: any): void;
    open(evt: React.MouseEvent<HTMLButtonElement>, context: DockContext, panelData: PanelData): void;
    addMetamodel(evt: undefined | React.MouseEvent<HTMLButtonElement>, context: DockContext, panelData: PanelData, model?: DModel): Promise<void>;
    addModel(evt: React.MouseEvent<HTMLButtonElement>, context: DockContext, panelData: PanelData): void;
    render(): ReactNode;
}
interface OwnProps {
}
interface StateProps {
    views: number;
    m2: Pointer<DModel, 0, 'N', LModel>;
    m1: Pointer<DModel, 0, 'N', LModel>;
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const DockLayoutConnected: import("react-redux").ConnectedComponent<typeof DockLayoutComponent, import("react-redux").Omit<React.ClassAttributes<DockLayoutComponent> & OwnProps & StateProps & DispatchProps, "views" | "m2" | "m1"> & OwnProps>;
export declare const Dock: (props: OwnProps, children?: (string | React.Component)[]) => ReactElement;
export default Dock;
