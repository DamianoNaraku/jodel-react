import {useStateIfMounted} from "use-state-if-mounted";
import Login from "./Login";
import Signin from "./Signin";

interface IProps { }
export default function Auth(props: IProps) {
    const [isLogin, setIsLogin] = useStateIfMounted(true);

    return (<div className={'card w-25 mx-auto mt-3 border border-custom p-1'}>
        <h6 className={'mx-auto text-primary'}>JJODEL</h6>
        {(isLogin) ? <Login /> : <Signin />}
        {(isLogin) ?
            <label className={'mx-auto text-dark'}>Dont'have an account? <b className={'text-primary cursor-pointer'}
                                            onClick={() => {setIsLogin(false)}}>click here</b></label> :
            <label className={'mx-auto text-dark'}>Already have an account? <b className={'text-primary cursor-pointer'}
                                               onClick={() => {setIsLogin(true)}}>click here</b></label>
        }
    </div>);


}
