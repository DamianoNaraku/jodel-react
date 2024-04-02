import { ReactElement } from 'react';
import { LUser } from '../../../joiner';
import type { LProject } from '../../../joiner';
declare function CollaboratorsEditorComponent(props: AllProps): JSX.Element;
interface OwnProps {
}
interface StateProps {
    project: LProject;
    author: LUser;
    collaborators: LUser[];
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const CollaboratorsEditorConnected: import("react-redux").ConnectedComponent<typeof CollaboratorsEditorComponent, import("react-redux").Omit<OwnProps & StateProps & DispatchProps, "project" | "author" | "collaborators"> & OwnProps>;
declare const CollaboratorsEditor: (props: OwnProps, children?: (string | React.Component)[]) => ReactElement;
export default CollaboratorsEditor;
