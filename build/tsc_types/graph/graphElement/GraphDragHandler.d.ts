/// <reference path="../../joiner/index.d.ts" />
/// <reference types="jquery" />
import type { LGraph } from "../../joiner";
import type { Point as PointType } from "../../joiner";
import { RuntimeAccessibleClass } from "../../joiner";
import React from "react";
export declare class GraphDragManager extends RuntimeAccessibleClass {
    static initialClickPos?: PointType;
    static draggingGraph?: LGraph;
    static startPanning(e: React.MouseEvent, graph: LGraph): void;
    static stopPanning(e: JQuery.MouseUpEvent | React.MouseEvent): void;
}
