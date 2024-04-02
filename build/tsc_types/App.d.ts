/// <reference types="react" />
import './App.scss';
import './styles/view.scss';
import './styles/style.scss';
import { LUser } from "./joiner";
declare function App(props: AllProps): JSX.Element;
interface OwnProps {
    room?: string;
}
interface StateProps {
    offlineMode: boolean;
    debug: boolean;
    isLoading: boolean;
    user: LUser;
}
interface DispatchProps {
}
declare type AllProps = OwnProps & StateProps & DispatchProps;
export declare const AppConnected: import("react-redux").ConnectedComponent<typeof App, import("react-redux").Omit<OwnProps & StateProps & DispatchProps, "debug" | "isLoading" | "offlineMode" | "user"> & OwnProps>;
export default AppConnected;
