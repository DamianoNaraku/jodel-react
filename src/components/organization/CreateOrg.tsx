import { useStateIfMounted } from "use-state-if-mounted";
import Persistance from "../../persistance/api";
import axios from 'axios';



export default function CreateOrg(props: any) {
    const [name, setName] = useStateIfMounted('');
    const [emailOrg, setEmailOrg] = useStateIfMounted('');
    const [bio, setBio] = useStateIfMounted('');
    const [isOpen, setIsOpen] = useStateIfMounted('1');
    const [isPublic, setIsPublic] = useStateIfMounted('1');
    const [errorMessage, setErrorMessage] = useStateIfMounted('');
    const [successMessage, setSuccessMessage] = useStateIfMounted('');

    const token = props.user.token;

    function submit(evt: React.MouseEvent<HTMLFormElement>) {

        setErrorMessage('');

        const config = {
            headers: {
                'Authorization': "Token " + token
            }
        }

        axios.put(Persistance.url('organization/' + name), {
            name: name,
            mailDomainRequired: emailOrg,
            bio: bio,
            openMembership: isOpen,
            isPublic: isPublic
        }, config)
            .then(function (response) {
                console.log(response);
                setSuccessMessage('Organization ' + '\'' + name + '\'' + ' created');
                setErrorMessage('');
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    setErrorMessage(error.response.data.message);
                    setSuccessMessage('');
                }
            });
        evt.preventDefault();
    }

    function onRadioChange(e: { target: { value: any; }; }) {
        setIsOpen(e.target.value);
    }

    function onCheckboxChange(e: { target: { value: any; }; }) {
        isPublic == '1' ? setIsPublic('0') : setIsPublic('1');
    }

    return (
        <div className="container mt-5">
            <form onSubmit={submit}>
                <div className="input-group mb-2">
                    <input type='text' className='form-control' onChange={(evt) => setName(evt.target.value)} placeholder='Name' required />
                </div>
                <div className="input-group mb-2">
                    <input type='email' className='form-control' onChange={(evt) => setEmailOrg(evt.target.value)} placeholder='Email' required />
                </div>
                <div className="input-group mb-2">
                    <textarea className='form-control' onChange={(evt) => setBio(evt.target.value)} placeholder='Bio' />
                </div>
                <h6>Membership:</h6>
                <div className="form-check mb-2">
                    <input type='radio' className='form-check-input' name="membership" value="1" id="open" onChange={onRadioChange} checked={isOpen == "1"} />
                    <label className="form-check-label" htmlFor="open">Open</label>
                </div>
                <div className="form-check">
                    <input type='radio' className='form-check-input' name="membership" value="0" id="close" onChange={onRadioChange} checked={isOpen == "0"} />
                    <label className="form-check-label" htmlFor="close">Closed</label>
                </div>
                <div className="form-check my-3">
                    <input type='checkbox' className='form-check-input' value="1" id="isPublic" onChange={onCheckboxChange} checked={isPublic == '1'} />
                    <label className="form-check-label" htmlFor="isPublic">public</label>
                </div>
                <button type='submit' className='form-control btn btn-primary'>Create organization</button>
                {errorMessage != '' ? <div className="alert alert-danger my-2">{errorMessage}</div>
                    : ''}
                {successMessage != '' ? <div className="alert alert-success my-2">{successMessage}</div>
                    : ''}

            </form>
        </div>
    )
}