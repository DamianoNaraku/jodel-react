import React from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import Persistance from "../persistance/api";
import {CreateElementAction, DUser, SetFieldAction, SetRootFieldAction} from "../joiner";


interface IProps { }
export default function Signin(props: IProps) {
    const [name, setName] = useStateIfMounted('');
    const [username, setUsername] = useStateIfMounted('');
    const [email, setEmail] = useStateIfMounted('');
    const [password, setPassword] = useStateIfMounted('');

    const submit = async(evt: React.MouseEvent<HTMLFormElement>) => {
        evt.preventDefault();
        evt.preventDefault();
        const response = await Persistance.post('user', {
            name: name,
            username: username,
            mail: email,
            password: password
        });
        if(!response) {alert('Invalid Data!'); return;}
        const token = response.data.token;
        await Persistance.put(`model/${username}`, {
            author: username,
            is_public: 0,
            content_xml: 'empty',
            namespace: username,
            name: 'Default State'
        }, token);
        const dUser = DUser.new(username, token);
        CreateElementAction.new(dUser);
        SetRootFieldAction.new('user', dUser.id, '', true);
    }

    return (
        <div className="container mt-5">
            <form onSubmit={submit}>
                <input type={'text'} className={'form-control my-2'}
                       onChange={(evt) => setName(evt.target.value)} placeholder={'Name'} />
                <input type={'text'} className={'form-control my-2'}
                       onChange={(evt) => setUsername(evt.target.value)} placeholder={'Username'} />
                <input type={'email'} className={'form-control my-2'}
                       onChange={(evt) => setEmail(evt.target.value)} placeholder={'E-mail'} />
                <input type={'password'} className={'form-control my-2'}
                       onChange={(evt) => setPassword(evt.target.value)} placeholder={'Password'} />
                <button type={'submit'} className={'form-control btn btn-primary my-3'}>Sign in</button>
            </form>
        </div>)
}
