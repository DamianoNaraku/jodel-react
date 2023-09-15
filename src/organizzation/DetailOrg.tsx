import React from 'react';
import {Organization} from './types';

interface IProps {org: Organization, handleCloseButton: () => void}
export default function DetailOrg(props: IProps) {
    const org = props.org;

    return (<div className='card'>
        <div className='card-body'>
            <h3 className='card-title'>{props.org.name}</h3>
            <h6 className='card-subtitle'>This org is {org.isPublic ? 'Public' : 'Not Public'}.</h6>
            <div className='row'>
                <div className='col-sm-6 text-center'>
                    <p className='mx-3'><b>Admins</b></p>
                    <ul className='list-group list-group'>
                        <li className='list-group-item'>
                            <label>Mike</label>
                            <div className='float-end'>
                                <button className='btn btn-danger'>
                                    Remove
                                </button>
                            </div>
                        </li>
                    </ul>
                    <button className='btn btn-primary mt-2'>Add Admin</button>
                </div>
                <div className='col-sm-6 text-center'>
                    <p className='mx-3'><b>Members</b></p>
                    <ul className='list-group list-group'>
                        <li className='list-group-item'>
                            John
                        </li>
                    </ul>
                    <button className='btn btn-primary mt-2'>Add Member</button>
                </div>
            </div>
        </div>
        <div className='card-footer text-center'>
            <button className='btn btn-secondary' onClick={() => props.handleCloseButton()}>Close</button>
        </div>
    </div>)
}
