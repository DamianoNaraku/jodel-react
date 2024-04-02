import { CSSProperties, PureComponent, ReactChild, ReactNode } from "react";
interface ThisState {
}
export declare class Overlap extends PureComponent<AllProps, ThisState> {
    static cname: string;
    render(): ReactNode;
}
interface OwnProps {
    children: ReactChild[] | ReactChild;
    autosizex?: boolean;
    autosizey?: boolean;
    style?: CSSProperties;
}
interface StateProps {
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export default Overlap;
