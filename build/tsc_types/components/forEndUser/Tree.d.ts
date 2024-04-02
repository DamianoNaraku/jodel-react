/// <reference types="react" />
import { GObject, LModelElement } from '../../joiner';
import './style.scss';
interface TreeProps {
    data?: LModelElement;
    depth?: string[];
    children?: GObject;
}
declare function Tree(props: TreeProps): JSX.Element;
declare namespace Tree {
    var cname: string;
}
export default Tree;
