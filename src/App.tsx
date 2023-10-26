import React, {Dispatch} from 'react';
import './App.scss';
import './styles/view.scss';
import './styles/style.scss';
import {DState, DUser, LUser, statehistory} from "./joiner";
import {connect} from "react-redux";
import Loader from "./components/loader/Loader";
import Navbar from "./components/navbar/Navbar";
import {FakeStateProps} from "./joiner/types";
import Dashboard from "./pages/Dashboard";
import Editor from "./pages/Editor";

function App(props: AllProps) {
    const debug = props.debug;
    const isLoading = props.isLoading;
    const user = props.user;

    return(<div className={'d-flex flex-column h-100 p-1 REACT-ROOT' + (props.debug ? " debug" : "")}
                onClick={e => statehistory.globalcanundostate = true}>
        {isLoading && <Loader />}
        <Navbar />
        {user.project ? <Editor /> : <Dashboard />}
    </div>);

}

interface OwnProps {room?: string}
interface StateProps {debug: boolean, isLoading: boolean, user: LUser}
interface DispatchProps {}
type AllProps = OwnProps & StateProps & DispatchProps;


function mapStateToProps(state: DState, ownProps: OwnProps): StateProps {
    const ret: StateProps = {} as FakeStateProps;
    ret.debug = state.debug;
    ret.isLoading = state.isLoading;
    ret.user = LUser.fromPointer(DUser.current);
    return ret;
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    const ret: DispatchProps = {};
    return ret;
}

export const AppConnected = connect<StateProps, DispatchProps, OwnProps, DState>(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default AppConnected;


/* SPLASH SCREEN
return(<div className={'w-100 h-100 text-center bg-smoke'}>
    <img style={{height: '60%', width: '80%'}} className={'mt-3 rounded shadow'} src={SplashImage}></img>
    <Oval height={80} width={80} wrapperStyle={{justifyContent: 'center'}} wrapperClass={'mt-3'}
          color={'#475e6c'} secondaryColor={'#ff8811'} />
</div>);
*/
