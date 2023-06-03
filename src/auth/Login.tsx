import React from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import Persistance from "../persistance/api";
interface IProps { }
export default function Login(props: IProps) {

    const [username, setUsername] = useStateIfMounted('');
    const [password, setPassword] = useStateIfMounted('');

    function submit(evt: React.MouseEvent<HTMLFormElement>) {
        Persistance.login(username, password);
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