import React, { Dispatch } from 'react';
import './App.scss';
import './styles/view.scss';
import './styles/style.scss';
//import Dock from "./components/abstract/DockComponent";
import Dock from "./components/abstract/DockLayout";
import { DUser, IStore, LUser, Pointer, statehistory } from "./joiner";
import { useStateIfMounted } from "use-state-if-mounted";
import { useEffectOnce } from "usehooks-ts";
import SplashImage from './static/img/splash.png';
import { Oval } from "react-loader-spinner";
import TopBar from "./components/topbar/Topbar";
import Auth from "./auth/Auth";
import { connect } from "react-redux";
import NavBar from './components/adminPanel/NavBar';

function App(props: AllProps) {
    const user = props.user;
    const [splash, setSplash] = useStateIfMounted(false);

    useEffectOnce(() => {
        const promise = new Promise((resolve) => { setTimeout(resolve, 4 * 1000) });
        promise.then(() => { setSplash(false) });
    });

    /* DO NOT UNCOMMENT!
    if(splash) {
        return(<div className={'w-100 h-100 text-center bg-smoke'}>
            <img className={'mt-3 rounded shadow'} src={SplashImage}></img>
            <Oval height={80} width={80} wrapperStyle={{justifyContent: 'center'}} wrapperClass={'mt-3'}
                  color={'#475e6c'} secondaryColor={'#ff8811'} />
        </div>);
    } else {
        return(<div className={'d-flex flex-column h-100 p-1'} onClick={() => {statehistory.globalcanundostate = true;} } >
            <TopBar />
            <Dock />
        </div>);
    }
    */
    if (!user) {
        return (<Auth />);
    } else {
        return (<NavBar user={user} />)
    }


}
interface OwnProps { }
interface StateProps { user: Pointer<DUser, 0, 1, LUser> }
interface DispatchProps { }
type AllProps = OwnProps & StateProps & DispatchProps;


function mapStateToProps(state: IStore, ownProps: OwnProps): StateProps {
    const user = state.user;
    return { user };
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    const ret: DispatchProps = {};
    return ret;
}

export const AppConnected = connect<StateProps, DispatchProps, OwnProps, IStore>(
    mapStateToProps,
    mapDispatchToProps
)(App);


export default AppConnected;
