/// <reference types="jquery" />
import type { GObject, TODO } from "../joiner";
import { RuntimeAccessibleClass } from "../joiner";
import React from "react";
import { radian } from "../joiner/types";
export declare abstract class IPoint extends RuntimeAccessibleClass {
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    x: number;
    y: number;
    static getM(firstPt: IPoint, secondPt: IPoint): number;
    static getQ(firstPt: IPoint, secondPt: IPoint, m?: number): number;
    constructor(x?: number, y?: number);
    static init_constructor(thiss: GObject, x?: any, y?: any, ...a: any): void;
    raw(): {
        x: number;
        y: number;
    };
    toString(letters?: boolean, separator?: string): string;
    clone(other: {
        x: number;
        y: number;
    }): this;
    protected abstract new(): this;
    duplicate(): this;
    distanceFromPoint(tentativeEnd: IPoint, skipSqrt?: boolean): number;
    subtract(p2: IPoint, newInstance: boolean): this;
    add(p2: {
        x?: number;
        y?: number;
    }, newInstance: boolean): this;
    addAll(p: IPoint[], newInstance: boolean): this;
    subtractAll(p: this[], newInstance: boolean): this;
    multiply(pt: {
        x?: number;
        y?: number;
    } | number, newInstance?: boolean): this;
    divide(pt: Partial<this> | number, newInstance?: boolean): this;
    multiplyScalar(scalar: number, newInstance: boolean): this;
    divideScalar(scalar: number, newInstance: boolean): this;
    isInTheMiddleOf(firstPt: this, secondPt: this, tolleranza: number): boolean;
    distanceFromLine(p1: IPoint, p2: IPoint): number;
    equals(pt: IPoint, tolleranzaX?: number, tolleranzaY?: number): boolean;
    moveOnNearestBorder(startVertexSize: ISize, clone: boolean, graph: TODO, debug?: boolean): IPoint;
    getM(pt2: IPoint): number;
    degreeWith(pt2: IPoint, toRadians: boolean): number;
    absolute(): number;
    set(x: number, y: number): void;
    move(rad: radian, distance: number, clone?: boolean): this;
}
export declare class GraphPoint extends IPoint {
    private dontmixwithPoint;
    static fromEvent(e: JQuery.ClickEvent | JQuery.MouseMoveEvent | JQuery.MouseUpEvent | JQuery.MouseDownEvent | JQuery.MouseEnterEvent | JQuery.MouseLeaveEvent | JQuery.MouseEventBase): GraphPoint | null;
    protected new(): this;
}
export declare class Point extends IPoint {
    private dontmixwithGPoint;
    static fromEvent(e: JQuery.ClickEvent | JQuery.MouseMoveEvent | JQuery.MouseUpEvent | JQuery.MouseDownEvent | JQuery.MouseEnterEvent | JQuery.MouseLeaveEvent | JQuery.MouseEventBase | React.MouseEvent): Point;
    protected new(): this;
}
export declare abstract class ISize<PT extends IPoint = IPoint> extends RuntimeAccessibleClass {
    static subclasses: (typeof RuntimeAccessibleClass | string)[];
    static _extends: (typeof RuntimeAccessibleClass | string)[];
    x: number;
    y: number;
    w: number;
    h: number;
    constructor(x?: number, y?: number, w?: number, h?: number);
    static init_constructor(thiss: GObject, x?: any, y?: any, w?: any, h?: any, ...a: any): void;
    toString(letters?: boolean, separator?: string): string;
    set(x?: number, y?: number, w?: number, h?: number): void;
    protected abstract makePoint(x: number, y: number): PT;
    protected abstract new(...args: any): this;
    clone(json: this): this;
    duplicate(): this;
    add(pt2: number | {
        x?: number;
        y?: number;
        w?: number;
        h?: number;
    }, newInstance?: boolean): this;
    subtract(pt2: number | {
        x?: number;
        y?: number;
        w?: number;
        h?: number;
    }, newInstance?: boolean): this;
    multiply(pt2: number | {
        x?: number;
        y?: number;
        w?: number;
        h?: number;
    }, newInstance?: boolean): this;
    divide(pt2: number | {
        x?: number;
        y?: number;
        w?: number;
        h?: number;
    }, newInstance?: boolean): this;
    tl(): PT;
    tr(): PT;
    bl(): PT;
    br(): PT;
    center(): PT;
    relativePoint(xPercent: number, yPercent: number): PT;
    equals(size: this): boolean;
    min(minSize: this, clone: boolean): this;
    max(maxSize: this, clone: boolean): this;
    intersection(size: this): this | null;
    contains(pt: PT): boolean;
    isOverlapping(size2: this): boolean;
    isOverlappingAnyOf(sizes: this[]): boolean;
    multiplyPoint(other: PT, newInstance: boolean): this;
    dividePoint(other: PT, newInstance: boolean): this;
    boundary(size2: this): void;
}
export declare class Size extends ISize<Point> {
    static subclasses: any[];
    private static sizeofvar;
    private static $sizeofvar;
    private dontMixWithGraphSize;
    /**
     * measure a node size
     * @param {Element} element0 - the emelemnt to measure;
     * @param {boolean} sizePostTransform - includes css transform instructions for computing his size. like transform: scale(1.5)
     * */
    static of(element0: Element, sizePostTransform?: boolean): Size;
    static fromPoints(firstPt: IPoint, secondPt: IPoint): Size;
    protected makePoint(x: number, y: number): Point;
    protected new(...args: any): this;
}
export declare class GraphSize extends ISize<GraphPoint> {
    private dontMixWithSize;
    static fromPoints(firstPt: GraphPoint, secondPt: GraphPoint): GraphSize;
    static closestIntersection(size: GraphSize, pt: GraphPoint, targetPt: GraphPoint, gridAlign?: GraphPoint, m0?: number, q0?: number): GraphPoint | undefined;
    static closestIntersection_old(size: GraphSize, prevPt: GraphPoint, pt0: GraphPoint, gridAlign?: GraphPoint): GraphPoint | null;
    private static closestIntersection0;
    protected new(...args: any): this;
    protected makePoint(x: number, y: number): GraphPoint;
    closestPoint(pt: GraphPoint): GraphPoint;
}
export declare class Geom extends RuntimeAccessibleClass {
    static isPositiveZero(m: number): boolean;
    static isNegativeZero(m: number): boolean;
    static TanToRadian(n: number): number;
    static TanToDegree(n: number): number;
    static RadToDegree(radians: number): number;
    static DegreeToRad(degree: number): number;
    static radToDeg(radians: number): number;
    static degToRad(degree: number): number;
    private static GeomTolerance;
    static isOnEdge(pt: GraphPoint, shape: GraphSize, tolerance?: number): boolean;
    static isOnVerticalEdges(pt: GraphPoint, shape: GraphSize, tolerance?: number): boolean;
    static isOnHorizontalEdges(pt: GraphPoint, shape: GraphSize, tolerance?: number): boolean;
    static isOnRightEdge(pt: GraphPoint, shape: GraphSize, tolerance?: number): boolean;
    static isOnLeftEdge(pt: GraphPoint, shape: GraphSize, tolerance?: number): boolean;
    static isOnTopEdge(pt: GraphPoint, shape: GraphSize, tolerance?: number): boolean;
    static isOnBottomEdge(pt: GraphPoint, shape: GraphSize, tolerance?: number): boolean;
    static closestPoint(size: GraphSize, pt: GraphPoint): GraphPoint;
    static isMinusZero(number: number): boolean;
    static closestPointToSegment(segStart: GraphPoint, segEnd: GraphPoint, pt: GraphPoint): GraphPoint;
    static lineToSegmentIntersection(segStart: GraphPoint, segEnd: GraphPoint, q: number, m: number): GraphPoint | undefined;
    static isNumberBetween(target: number, s: number, e: number): boolean;
    private static lineToLineIntersection;
    static mToRad(m: number, start: GraphPoint, end: GraphPoint): number;
    static lineToSizeIntersection_TODO(size: GraphSize, m: number, startLine: GraphPoint, endIfSegment?: GraphPoint): [] | [GraphPoint] | [GraphPoint, GraphPoint];
}
