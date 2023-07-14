import React from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import Persistance from "../persistance/api";
import {CreateElementAction, DUser, SetFieldAction} from "../joiner";
interface IProps { }
export default function Login(props: IProps) {

    const [username, setUsername] = useStateIfMounted('');
    const [password, setPassword] = useStateIfMounted('');

    function submit(evt: React.MouseEvent<HTMLFormElement>) {
        Persistance.login(username, password);
        const dUser = DUser.new();
        CreateElementAction.new(dUser);
        SetFieldAction.new(dUser.id, 'username', username, '', false);
        SetFieldAction.new(dUser.id, 'email', 'todo', '', false);
        evt.preventDefault();
    }

    return (
        <div className="container mt-5">
            <form onSubmit={submit}>
                <input type={'text'} className={'form-control my-2'} onChange={(evt) => setUsername(evt.target.value)} placeholder={'Username'} />
                <input type={'password'} className={'form-control my-2'} onChange={(evt) => setPassword(evt.target.value)} placeholder={'Password'} />
                <button type={'submit'} className={'form-control btn btn-primary my-3'}>Login</button>
            </form>
        </div>)
}
