import React from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import Persistance from "../persistance/api";
import { CreateElementAction, DUser, SetFieldAction, SetRootFieldAction } from "../joiner";
import axios from 'axios';
interface IProps { }
export default function Login(props: IProps) {

    const [username, setUsername] = useStateIfMounted('');
    const [password, setPassword] = useStateIfMounted('');

    function submit(evt: React.MouseEvent<HTMLFormElement>) {
        //const token = Persistance.login(username, password);

        axios.post(Persistance.url('token'), {
            username: username,
            password: password,
        })
            .then(function (response) {
                const dUser = DUser.new();
                CreateElementAction.new(dUser);
                SetFieldAction.new(dUser.id, 'username', username, '', false);
                SetRootFieldAction.new('user', dUser.id, '', true);
                SetRootFieldAction.new('user.token', response.data.token, '', true);
                SetRootFieldAction.new('user.username', username, '', true);

            })
            .catch(function (error) {
            });


        evt.preventDefault();
    }

    return (
        <div className="container mt-5">
            <form onSubmit={submit}>
                <input type='text' className='form-control my-2' onChange={(evt) => setUsername(evt.target.value)} placeholder='Username' required />
                <input type='password' className='form-control my-2' onChange={(evt) => setPassword(evt.target.value)} placeholder='Password' required />
                <button type='submit' className='form-control btn btn-primary my-3'>Login</button>
            </form>
        </div>)
}
