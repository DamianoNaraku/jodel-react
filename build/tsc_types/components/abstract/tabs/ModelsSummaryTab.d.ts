import type { LProject } from '../../../joiner';
import { ReactElement } from 'react';
declare function InfoTabComponent(props: AllProps): JSX.Element;
interface OwnProps {
}
interface StateProps {
    project: LProject;
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const InfoTabConnected: import("react-redux").ConnectedComponent<typeof InfoTabComponent, import("react-redux").Omit<OwnProps & StateProps & DispatchProps, "project"> & OwnProps>;
export declare const InfoTab: (props: OwnProps, children?: (string | React.Component)[]) => ReactElement;
export default InfoTab;
