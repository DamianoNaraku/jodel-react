import CreateOrg from "./CreateOrg";
import SearchOrg from "./SearchOrg";
import { useStateIfMounted } from "use-state-if-mounted";

export default function HandleOrg(props: any) {

    const [panel, setPanel] = useStateIfMounted('Organizations');
    const [activePanel, setActivePanel] = useStateIfMounted('Organizations')

    function changePanel(evt: any) {
        console.log(evt.target.innerText);
        setPanel(evt.target.innerText);
        setActivePanel(evt.target.innerText);
    }

    return (
        <>
            <ul className="nav nav-pills justify-content-center mt-2">
                <li className="nav-item">
                    {activePanel == 'Organizations' ?
                        <a className="nav-link active" onClick={evt => { changePanel(evt) }}>Organizations</a> :
                        <a className="nav-link" onClick={evt => { changePanel(evt) }}>Organizations</a>}
                </li>
                <li className="nav-item">
                    {activePanel == 'Profile' ?
                        <a className="nav-link active" onClick={evt => { changePanel(evt) }}>Profile</a> :
                        <a className="nav-link" onClick={evt => { changePanel(evt) }}>Profile</a>}
                </li>
            </ul>

            {panel == 'Organizations' &&
                <>
                    <SearchOrg user={props.user} />
                    <CreateOrg user={props.user} />
                </>
            }
        </>
    )
}
