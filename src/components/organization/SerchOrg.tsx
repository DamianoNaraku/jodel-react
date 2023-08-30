import React from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import axios from 'axios';
import Pagination from './Pagination';


export default function SearchOrg(props: any) {
    const [search, setSearch] = useStateIfMounted('');
    const [orgs, setOrgs] = useStateIfMounted<Org[]>([]);
    const [resultCount, setResultCount] = useStateIfMounted(0);
    const [currentPage, setCurrentPage] = useStateIfMounted(0);
    const orgsPerPage = 2;

    function submit(evt: React.MouseEvent<HTMLFormElement>) {
        let config = {
            headers: {
                'Authorization': "Token " + props.user.token
            }
        }

        console.log('organization/?regexp=0&name=' + search);

        axios.get('http://localhost:8000/api/v1/organization/?regexp=0&name=' + search, config)
            .then(function (response) {
                setOrgs(response.data.results)
                setResultCount(response.data.count);
                setCurrentPage(1);
            })
            .catch(function (error) {
                console.log(error);
            });

        evt.preventDefault();
    }

    function changePage(page: number) {
        let config = {
            headers: {
                'Authorization': "Token " + props.user.token
            }
        }

        console.log('organization/?regexp=0&name=' + search);

        axios.get('http://localhost:8000/api/v1/organization/?name=' + search + '&page=' + page + '&regexp=0', config)
            .then(function (response) {
                setOrgs(response.data.results)
                setCurrentPage(page);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    function reset() {

        setSearch("");
        setOrgs([]);
        setResultCount(0);

    }



    return (
        <div className="container mt-5">
            <form onSubmit={submit}>
                <div className="input-group mb-2">
                    <input type='text' className='form-control' value={search} onChange={(evt) => setSearch(evt.target.value)} placeholder='Org name' required />
                </div>
                <button type='submit' className='btn btn-primary'>Search</button>
                <button type='button' className='btn btn-warning m-2' onClick={reset}>Reset</button>
            </form>
            <ul className="list-group mt-3">
                {orgs.map(org =>
                    <div className="card mt-2" key={org.pk}>
                        <div className="card-header">
                            <b>{org.name}</b>
                        </div>
                        <div className="card-body">
                            <p className="card-text">{org.isPublic ? 'Public' : 'Private'}</p>
                            <p className="card-text">Membership: {org.openMembership ? 'Open' : 'Closed'}</p>
                            <button className="btn btn-primary">{org.openMembership ? 'Join' : 'Request to Join'}</button>
                        </div>
                    </div>

                )}
            </ul>
            <Pagination orgsPerPage={orgsPerPage} totalOrgs={resultCount} curPage={currentPage} changePage={changePage} />
        </div>
    )

    interface Org {
        pk: number;
        name: string;
        isPublic: boolean;
        openMembership: boolean;
    }
}