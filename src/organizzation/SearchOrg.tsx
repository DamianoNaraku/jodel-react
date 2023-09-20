import React from 'react';
import {useStateIfMounted} from 'use-state-if-mounted';
import Pagination from './Pagination';
import DetailOrg from './DetailOrg';
import {Organization} from './types';
import Persistance from '../persistance/api';
import {LUser} from '../joiner';

interface IProps {user: LUser}
export default function SearchOrg(props: IProps) {
    const user = props.user;
    const [search, setSearch] = useStateIfMounted('');
    const [orgs, setOrgs] = useStateIfMounted<Organization[]>([]);
    const [resultCount, setResultCount] = useStateIfMounted(0);
    const [currentPage, setCurrentPage] = useStateIfMounted(0);
    const [currentOrg, setCurrentOrg] = useStateIfMounted<Organization|null>(null);

    const submit = async(evt: React.MouseEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const response = await Persistance.get('organization', user.token, `regexp=0&name=${search}`);
        if(!response) {alert('Error'); return;}
        setCurrentOrg(null);
        setOrgs(response.data.results);
        setResultCount(response.data.count);
        setCurrentPage(1);
    }

    const changePage = async(page: number) => {
        const response = await Persistance.get('organization', user.token, `regexp=0&name=${search}&page=${page}`);
        if(!response) {alert('Error'); return;}
        setOrgs(response.data.results);
        setResultCount(response.data.count);
        setCurrentPage(page);
    }

    const deleteOrg = async (org: Organization) => {
        let response = await  Persistance.delete(`organization/${org.name}`, user.token);
        if(response) {
            setOrgs(orgs.filter(o => o.name != org.name))
            setCurrentOrg(null);
        }
    }

    function reset() {
        setSearch('');
        setOrgs([]);
        setResultCount(0);
        setCurrentPage(0);
        setCurrentOrg(null);
    }

    return(
        <div className='container mt-5'>
            <form onSubmit={submit}>
                <div className='input-group mb-2'>
                    <input type='text' className='form-control' value={search} placeholder='Org name'
                           onChange={(evt) => setSearch(evt.target.value)} required={true} />
                </div>
                <button type='submit' className='btn btn-primary'>Search</button>
                <button type='button' className='btn btn-warning m-2' onClick={reset}>Reset</button>
            </form>
            <ul className='list-group mt-3'>
                {orgs.map(org =>
                    <li key={org.pk} className='list-group-item' onClick={() => setCurrentOrg(org)}>
                        <b>{org.name}</b>
                    </li>
                )}
            </ul>
            {orgs.length > 0 && <Pagination orgsPerPage={2} totalOrgs={resultCount} curPage={currentPage} changePage={changePage} />}
            {currentOrg && <DetailOrg
                org={currentOrg}
                user={user}
                handleCloseButton={() => setCurrentOrg(null)}
                handleRemoveOrg={(org: Organization) => deleteOrg(org)}/>}
        </div>
    )


}
