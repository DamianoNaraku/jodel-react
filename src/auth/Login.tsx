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
        const response = await Persistance.post('token', {
            username: username,
            password: password
        });
        if(!response) {alert('Invalid Data!'); return;}
        const dUser = DUser.new(username, response.data.token);
        CreateElementAction.new(dUser);
        SetRootFieldAction.new('user', dUser.id, '', true);
    }

    return (
        <div className={'container mt-5'}>
            <form onSubmit={submit}>
                <input type={'text'} className={'form-control my-2'} placeholder={'Username'}
                       onChange={(evt) => setUsername(evt.target.value)} required={true} />
                <input type={'password'} className={'form-control my-2'} placeholder={'Password'}
                       onChange={(evt) => setPassword(evt.target.value)} required={true} />
                <button type={'submit'} className={'form-control btn btn-primary my-3'}>Login</button>
            </form>
        </div>)
}
