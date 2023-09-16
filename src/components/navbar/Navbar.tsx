import React, {Dispatch, ReactElement} from "react";
import {connect} from "react-redux";
import './style.scss';
import {DState, LUser} from "../../joiner";
import {useStateIfMounted} from "use-state-if-mounted";
import Topbar from "../topbar/Topbar";
import SearchOrg from "../../organizzation/SearchOrg";
import CreateOrg from "../../organizzation/CreateOrg";
import Dock from "../abstract/DockLayout";

function Navbar(props: AllProps) {
    const [onModel, setOnModel] = useStateIfMounted(false);
    if(onModel) {
        return(<>
            <Topbar user={props.user} room={props.room} setOnModel={setOnModel} />
            <Dock />
        </>);
    } else {
        return(<>
            <div className={'nav-bar d-flex'}>
                <label onClick={() => setOnModel(true)} className={'item border round ms-1'}>Go to Models</label>
            </div>
            <div>
                <SearchOrg user={props.user} />
                <CreateOrg user={props.user} />
            </div>
        </>);
    }

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
