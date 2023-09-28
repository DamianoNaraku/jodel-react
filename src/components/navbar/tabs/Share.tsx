import React, {Dispatch, ReactElement} from 'react';
import {DState} from '../../../redux/store';
import {connect} from 'react-redux';
import {Firebase} from '../../../firebase';
import {SetRootFieldAction} from '../../../redux/action/action';
import {DUser, U} from '../../../joiner';

function ShareComponent(props: AllProps) {
    const room = props.room;
    const debug = props.debug;
    const root = process.env['REACT_APP_URL'] || '';

    const create = async(iot: boolean = false) => {
        const code = U.getRandomString(5);
        await Firebase.add('rooms', code, {
            code: code,
            actions: [],
            createdBy: DUser.current,
            iot: iot
        });
        window.open(root + '/room/' + code, '_blank');
    }

    const quit = async() => {
        window.location.replace(root);
    }

    const deleteAllRoms = async() => {
        SetRootFieldAction.new('isLoading', true);
        await Firebase.removeAllRooms();
        SetRootFieldAction.new('isLoading', false);
    }

    return(<li className={'nav-item dropdown'}>
        <div tabIndex={-1} className={'dropdown-toggle'} data-bs-toggle={'dropdown'}>Share</div>
        <ul className={'dropdown-menu'}>
            {!room && <li tabIndex={-1} onClick={e => create()} className={'dropdown-item'}>Collaborative</li>}
            {room && <li tabIndex={-1} onClick={quit} className={'dropdown-item'}>Quit</li>}
            {debug && <li tabIndex={-1} onClick={deleteAllRoms} className={'dropdown-item'}>Delete all roms</li>}
        </ul>
    </li>);
}

interface OwnProps {}
interface StateProps {room: string, debug: boolean}
interface DispatchProps {}
type AllProps = OwnProps & StateProps & DispatchProps;


function mapStateToProps(state: DState, ownProps: OwnProps): StateProps {
    const room = state.room;
    const debug = state.debug;
    return {room, debug};
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    const ret: DispatchProps = {};
    return ret;
}


export const ShareConnected = connect<StateProps, DispatchProps, OwnProps, DState>(
    mapStateToProps,
    mapDispatchToProps
)(ShareComponent);

export const Share = (props: OwnProps, children: (string | React.Component)[] = []): ReactElement => {
    return <ShareConnected {...{...props, children}} />;
}

export default Share;
