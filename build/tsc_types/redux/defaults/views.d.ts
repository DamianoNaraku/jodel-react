import { DViewElement, DViewPoint, Pointer } from '../../joiner';
declare class DefaultViews {
    static model(vp: Pointer<DViewPoint>): DViewElement;
    static package(vp: Pointer<DViewPoint>): DViewElement;
    static class(vp: Pointer<DViewPoint>): DViewElement;
    static enum(vp: Pointer<DViewPoint>): DViewElement;
    static attribute(vp: Pointer<DViewPoint>): DViewElement;
    static reference(vp: Pointer<DViewPoint>): DViewElement;
    static operation(vp: Pointer<DViewPoint>): DViewElement;
    static literal(vp: Pointer<DViewPoint>): DViewElement;
    static object(vp: Pointer<DViewPoint>): DViewElement;
    static value(vp: Pointer<DViewPoint>): DViewElement;
}
export default DefaultViews;
