import React from 'react';
import {useStateIfMounted} from "use-state-if-mounted";
import Persistance from "../persistance/api";
import {CreateElementAction, DUser, SetRootFieldAction} from "../joiner";

interface IProps {}
export default function Login(props: IProps) {
    const [username, setUsername] = useStateIfMounted('');
    const [password, setPassword] = useStateIfMounted('');

    const submit = async(evt: React.MouseEvent<HTMLFormElement>) => {
        evt.preventDefault();
        let response = await Persistance.post('token/', {
            username: username,
            password: password
        });
        if(!response) {alert('Invalid Data 1!'); return;}
        const token = response.data.token;
        response = await Persistance.get(`user/${username}`, token);
        if(!response) {alert('Invalid Data 2!'); return;}
        const pk = response.data.pk;
        const name = response.data.first_name;
        const email = response.data.email;
        const dUser = DUser.new(username, name, email, token, `Pointer_DUser_${pk}`);
        CreateElementAction.new(dUser);
        SetRootFieldAction.new('user', dUser.id, '', true);
    }

    return (<div className={'container'}>
        <form onSubmit={submit}>
            <input type={'text'} className={'form-control my-2'} placeholder={'Username'}
                   onChange={(evt) => setUsername(evt.target.value)} required={true} />
            <input type={'password'} className={'form-control my-2'} placeholder={'Password'}
                   onChange={(evt) => setPassword(evt.target.value)} required={true} />
            <button type={'submit'} className={'form-control btn btn-primary my-3'}>Login</button>
        </form>
    </div>)
}
