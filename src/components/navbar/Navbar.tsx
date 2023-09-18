import React, {Dispatch, ReactElement} from "react";
import {connect} from "react-redux";
import './style.scss';
import {DState, LUser} from "../../joiner";
import {useStateIfMounted} from "use-state-if-mounted";
import Topbar from "../topbar/Topbar";
import SearchOrg from "../../organizzation/SearchOrg";
import CreateOrg from "../../organizzation/CreateOrg";
import Dock from "../abstract/DockLayout";
import Profile from "../../profile/Profile";

function Navbar(props: AllProps) {
    const user = props.user;
    const [tab, setTab] = useStateIfMounted('organization');

    if(tab === 'model') {
        return(<>
            <Topbar user={props.user} room={props.room} setTab={setTab} />
            <Dock />
        </>);
    }

    if(tab === 'organization') {
        return(<>
            <div className={'nav-bar d-flex'}>
                <label onClick={() => setTab('profile')} className={'item border round ms-1'}>Profile</label>
                <label onClick={() => setTab('model')} className={'item border round ms-1'}>Go to Models</label>
            </div>
            <div>
                <SearchOrg user={user} />
                <CreateOrg user={user} />
                <h5>{user.pk}</h5>
            </div>
        </>);
    }

    if(tab === 'profile') {
        return(<>
            <div className={'nav-bar d-flex'}>
                <label onClick={() => setTab('organization')} className={'item border round ms-1'}>Organizations</label>
                <label onClick={() => setTab('model')} className={'item border round ms-1'}>Go to Models</label>
            </div>
            <div>
                <Profile user={user} />
            </div>
        </>);
    }

    return(<>Error</>);
}
interface OwnProps {user: LUser, room?: string}
interface StateProps {}
interface DispatchProps {}
type AllProps = OwnProps & StateProps & DispatchProps;


function mapStateToProps(state: DState, ownProps: OwnProps): StateProps {
    const ret: StateProps = {} as any;
    return ret;
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    const ret: DispatchProps = {};
    return ret;
}


export const NavBarConnected = connect<StateProps, DispatchProps, OwnProps, DState>(
    mapStateToProps,
    mapDispatchToProps
)(Navbar);

export const NavBar = (props: OwnProps, children: (string | React.Component)[] = []): ReactElement => {
    return <NavBarConnected {...{...props, children}} />;
}

export default NavBar;
