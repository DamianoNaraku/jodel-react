import React from 'react';
import {useStateIfMounted} from "use-state-if-mounted";
import Persistance from "../persistance/api";
import {LUser} from "../joiner";


interface IProps {user: LUser}
export default function CreateOrg(props: IProps) {

    const user = props.user;

    const [name, setName] = useStateIfMounted('');
    const [emailOrg, setEmailOrg] = useStateIfMounted('');
    const [bio, setBio] = useStateIfMounted('');
    const [isOpen, setIsOpen] = useStateIfMounted(true);
    const [isPublic, setIsPublic] = useStateIfMounted(true);

    const submit = async(evt: React.MouseEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const response = await Persistance.put(`organization/${name}`, {
            name: name,
            mailDomainRequired: emailOrg,
            bio: bio,
            openMembership: isOpen ? '1' : '0',
            isPublic: isPublic ? '1' : '0'
        }, user.token);
        if(!response) alert('Error');
        else alert('Ok');
    }

    return (
        <div className={'container mt-5'}>
            <form onSubmit={submit}>
                <div className={'input-group mb-2'}>
                    <input type={'text'} className={'form-control'} placeholder={'Name'}
                           onChange={(evt) => setName(evt.target.value)} required={true} />
                </div>
                <div className={'input-group mb-2'}>
                    <input type={'email'} className={'form-control'} placeholder={'Email'}
                           onChange={(evt) => setEmailOrg(evt.target.value)} required={true} />
                </div>
                <div className={'input-group mb-2'}>
                    <textarea className={'form-control'} placeholder={'Bio'}
                              onChange={(evt) => setBio(evt.target.value)} />
                </div>
                <h6>Membership:</h6>
                <div className={'form-check mb-2'}>
                    <input type={'radio'} className={'form-check-input'} name={'membership'}
                           onChange={() => setIsOpen(true)} checked={isOpen} />
                    <label className={'form-check-label'}>Open</label>
                </div>
                <div className={'form-check'}>
                    <input type={'radio'} className={'form-check-input'} name={'membership'}
                           onChange={() => setIsOpen(false)} checked={!isOpen} />
                    <label className={'form-check-label'}>Closed</label>
                </div>
                <div className={'form-check my-3'}>
                    <input type={'checkbox'} className={'form-check-input'}
                           onChange={() => setIsPublic(!isPublic)} checked={isPublic} />
                    <label className={'form-check-label'}>public</label>
                </div>
                <button type={'submit'} className={'form-control btn btn-primary'}>Create organization</button>
            </form>
        </div>
    )
}
