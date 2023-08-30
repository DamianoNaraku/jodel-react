import { useStateIfMounted } from "use-state-if-mounted";
import Persistance from "../../persistance/api";
import { CreateElementAction, DUser, SetFieldAction, SetRootFieldAction } from "../../joiner";
import axios from 'axios';

export default function UpdateProfile(props: any) {

    const [username, setUsername] = useStateIfMounted(props.user.username);
    const [password, setPassword] = useStateIfMounted('');
    const [name, setName] = useStateIfMounted('');
    const [mail, setMail] = useStateIfMounted('');

    console.log(props.user);

    function submit(evt: React.MouseEvent<HTMLFormElement>) {

        const config = {
            headers: {
                'Authorization': "Token " + props.user.token
            }
        }

        axios.patch(Persistance.url('user/' + username), {
            username: username,
            password: password,
            name: name,
            mail: mail
        }, config)
            .then(function (response) {
                const dUser = DUser.new();
                CreateElementAction.new(dUser);
                SetFieldAction.new(dUser.id, 'username', username, '', false);
                SetRootFieldAction.new('user', dUser.id, '', true);
                SetRootFieldAction.new('user.username', username, '', true);
                SetRootFieldAction.new('user.name', name, '', true);
                SetRootFieldAction.new('user.mail', mail, '', true);


            })
            .catch(function (error) {
            });


        evt.preventDefault();
    }

    return (
        <div className="container mt-5">
            <form onSubmit={submit}>
                <input type='text' className='form-control my-2' value={props.user.username} onChange={(evt) => setUsername(evt.target.value)} placeholder='Username' required />
                <input type='password' className='form-control my-2' onChange={(evt) => setPassword(evt.target.value)} placeholder='Password' />
                <input type='text' className='form-control my-2' onChange={(evt) => setName(evt.target.value)} placeholder='Name' />
                <input type='mail' className='form-control my-2' onChange={(evt) => setMail(evt.target.value)} placeholder='E-mail' />
                <button type='submit' className='form-control btn btn-primary my-3'>Update</button>
            </form>
        </div>
    )
}