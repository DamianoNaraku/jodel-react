import React from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import Persistance from "../persistance/api";
import {DUser, SetFieldAction} from "../joiner";


interface IProps { }
export default function Signin(props: IProps) {
    const [name, setName] = useStateIfMounted('');
    const [username, setUsername] = useStateIfMounted('');
    const [email, setEmail] = useStateIfMounted('');
    const [password, setPassword] = useStateIfMounted('');

    function submit(evt: React.MouseEvent<HTMLFormElement>) {
        Persistance.signin(name, username, email, password);
        evt.preventDefault();
    }

    return (
        <div className="container mt-5">
            <form onSubmit={submit}>
                <input type={'text'} className={'form-control my-2'} onChange={(evt) => setName(evt.target.value)} placeholder={'Name'} />
                <input type={'text'} className={'form-control my-2'} onChange={(evt) => setUsername(evt.target.value)} placeholder={'Username'} />
                <input type={'email'} className={'form-control my-2'} onChange={(evt) => setEmail(evt.target.value)} placeholder={'E-mail'} />
                <input type={'password'} className={'form-control my-2'} onChange={(evt) => setPassword(evt.target.value)} placeholder={'Password'} />
                <button type={'submit'} className={'form-control btn btn-primary my-3'}>Sign in</button>
            </form>
        </div>)
}
