/// <reference types="react" />
import { LViewElement, LViewPoint } from '../../../../joiner';
interface Props {
    view: LViewElement;
    viewpoints: LViewPoint[];
    readonly: boolean;
}
declare function InfoData(props: Props): JSX.Element;
export default InfoData;
