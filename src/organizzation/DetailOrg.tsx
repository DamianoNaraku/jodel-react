import React, {useEffect} from 'react';
import {Organization} from './types';
import Persistance from "../persistance/api";
import {useStateIfMounted} from "use-state-if-mounted";
import {GObject, LUser} from "../joiner";

interface IProps {org: Organization, user: LUser, handleCloseButton: () => void, handleRemoveOrg: (org: Organization) => void}
export default function DetailOrg(props: IProps) {
    const user = props.user;
    const org = props.org;

    const [admins, setAdmins] = useStateIfMounted<GObject[]>([]);
    const [members, setMembers] = useStateIfMounted<GObject[]>([])
    const [newAdmin, setNewAdmin] = useStateIfMounted('');
    const [newMember, setNewMember] = useStateIfMounted('');
    const [disabledButtons, setDisabledButtons] = useStateIfMounted(true);

    useEffect( () => {
        setDisabledButtons(true);
        Persistance.get(`organization/${org.name}/admin`, user.token)
            .then((response) => {
                if(response){
                    setAdmins(response.data.results);
                    if(response.data.results.find((a: { username: string; }) => a.username == user.username))
                        setDisabledButtons(false);
                }
            })
        Persistance.get(`organization/${org.name}/member`, user.token)
            .then((response) => {
                if(response)
                    setMembers(response.data.results)
            })

    }, [props.org])

    const addAdmin = async(evt: React.MouseEvent<HTMLFormElement>) => {
        evt.preventDefault();
        let response = await Persistance.put(`organization/${org.name}/admin/${newAdmin}`, {}, user.token);
        if(response) {
            setAdmins([...admins, {username: newAdmin}]);
            setNewAdmin('');
        } else {
            console.log("errore");
        }
    }

    const addMember = async(evt: React.MouseEvent<HTMLFormElement>) => {
        evt.preventDefault();
        let response = await Persistance.put(`organization/${org.name}/member/${newMember}`, {}, user.token);
        if(response) {
            setMembers([...members, {username: newMember}]);
            setNewMember('');
        } else {
            console.log("errore");
        }
    }

    const removeAdmin = async(admin: string)=> {
        let response = await Persistance.delete(`organization/${org.name}/admin/${admin}`, user.token);
        if(response) {
            setAdmins(admins.filter(a => a.username != admin));
        }
    }

    const removeMember = async(admin: string)=> {
        let response = await Persistance.delete(`organization/${org.name}/member/${admin}`, user.token);
        if(response) {
            setMembers(members.filter(a => a.username != admin));
        }
    }

    return (<div className='card'>
        <div className='card-header'>
            <div className='row text-center'>
                <div className='col'>
                    <h3 className='card-title'>{props.org.name}</h3>
                </div>
            </div>
            <div className='row'>
                <h6 className='card-subtitle'>This org is {org.isPublic ? 'Public' : 'Private'}.</h6>
            </div>
            <div className='row mt-2'>
                <h6 className='card-subtitle'>{org.openMembership ? 'Open Membership' : ''}</h6>
            </div>
        </div>
        <div className='card-body'>
            <div className='row'>
                <div className='col-sm-6 text-center'>
                    <p className='mx-3'><b>Total Admins {admins.length}</b></p>
                    <ul className='list-group list-group'>
                        {admins.map((admin, index) => {
                            return(<li className='list-group-item' key={index}>
                                <label>{admin.username}</label>
                                <div className='float-end'>
                                    <button className='btn btn-danger' disabled={disabledButtons} onClick={() => removeAdmin(admin.username)}>Remove</button>
                                </div>
                            </li>)
                        })}
                    </ul>
                    <form onSubmit={addAdmin}>
                        <input className='form-control mt-3' placeholder='Admin username' value={newAdmin} onChange={(evt) => setNewAdmin(evt.target.value)} required={true}/>
                        <button className='btn btn-primary mt-2' disabled={disabledButtons}>Add Admin</button>
                    </form>
                </div>
                <div className='col-sm-6 text-center'>
                    <p className='mx-3'><b>Total Members {members.length}</b></p>
                    <ul className='list-group list-group'>
                        {members.map((member, index) => {
                            return (
                                <li className='list-group-item' key={index}>
                                    <label>{member.username}</label>
                                    <div className='float-end'>
                                        <button className='btn btn-danger' disabled={disabledButtons} onClick={() => removeMember(member.username)}>Remove</button>
                                    </div>
                                </li>)
                            })}
                    </ul>
                    <form onSubmit={addMember}>
                        <input className='form-control mt-3' placeholder='Member username' value={newMember} onChange={(evt) => setNewMember(evt.target.value)} required={true}/>
                        <button className='btn btn-primary mt-2' disabled={disabledButtons}>Add Member</button>
                    </form>
                </div>
            </div>
        </div>
        <div className='card-footer text-center'>
            <button className='btn btn-danger' disabled={disabledButtons} onClick={() => props.handleRemoveOrg(props.org)}>Delete Org</button>
            <button className='btn btn-secondary m-2' onClick={() => props.handleCloseButton()}>Close</button>
        </div>
    </div>)
}
