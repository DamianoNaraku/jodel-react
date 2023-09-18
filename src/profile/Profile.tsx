import React from 'react';
import {useStateIfMounted} from "use-state-if-mounted";
import {LUser, SetFieldAction} from '../joiner';
import Persistance from '../persistance/api';

interface IProps {user: LUser}
function Profile(props: IProps) {
    const user = props.user;
    const [username, setUsername] = useStateIfMounted(user.username);
    const [name, setName] = useStateIfMounted(user.name);
    const [email, setEmail] = useStateIfMounted(user.email);

    const submit = async(evt: React.MouseEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const response = await Persistance.patch(`user/${username}`, {
            username: username,
            name: name,
            mail: email
        }, user.token);
        if(!response) {alert('Invalid Data 1!'); return;}
        SetFieldAction.new(user.id, 'username', username, '', false);
        SetFieldAction.new(user.id, 'name', username, '', false);
        SetFieldAction.new(user.id, 'email', username, '', false);
        alert('Updated!');
    }

    return (
        <div className="container mt-5">
            <form onSubmit={submit}>
                Username<input type='text' className='form-control my-2' value={username} placeholder='Username'
                       onChange={(evt) => setUsername(evt.target.value)}  disabled={true} />
                Name<input type='text' className='form-control my-2' value={name} placeholder='Name'
                       onChange={(evt) => setName(evt.target.value)} required={true}  />
                Email<input type='mail' className='form-control my-2' value={email} placeholder='E-mail'
                       onChange={(evt) => setEmail(evt.target.value)} required={true}  />
                <button type='submit' className='form-control btn btn-primary mt-3'>Update</button>
                <label>* username and password cannot be modified</label>
            </form>
        </div>
    )
}

export default Profile;
