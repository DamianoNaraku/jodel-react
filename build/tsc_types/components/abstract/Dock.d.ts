import './style.scss';
import { ReactElement } from 'react';
declare function DockComponent(props: AllProps): JSX.Element;
interface OwnProps {
}
interface StateProps {
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const DockConnected: import("react-redux").ConnectedComponent<typeof DockComponent, import("react-redux").Omit<OwnProps & StateProps & DispatchProps, never> & OwnProps>;
declare const Dock: (props: OwnProps, children?: (string | React.Component)[]) => ReactElement;
export default Dock;
