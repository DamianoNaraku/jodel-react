import {useStateIfMounted} from "use-state-if-mounted";
import Login from "./Login";
import Signin from "./Signin";

interface IProps { }
export default function Auth(props: IProps) {
    const [flag, setFlag] = useStateIfMounted(true);

    return (<div>
        <button className={'btn btn-primary'} onClick={() => setFlag(true)}>Login</button>
        <button className={'btn btn-primary'} onClick={() => setFlag(false)}>Sign in</button>
        {(flag) ? <Login /> : <Signin />}
    </div>);


}
