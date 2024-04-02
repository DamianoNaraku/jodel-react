import type { LUser } from '../joiner';
import { ReactElement } from 'react';
declare function EditorComponent(props: AllProps): JSX.Element;
interface OwnProps {
}
interface StateProps {
    user: LUser;
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const EditorConnected: import("react-redux").ConnectedComponent<typeof EditorComponent, import("react-redux").Omit<OwnProps & StateProps & DispatchProps, "user"> & OwnProps>;
declare const Editor: (props: OwnProps, children?: (string | React.Component)[]) => ReactElement;
export default Editor;
