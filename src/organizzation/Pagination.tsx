import React from 'react';

export default function Pagination(props: any) {
    console.log(props);

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(props.totalOrgs / props.orgsPerPage); i++) {
        pageNumbers.push(i);
    }

    const pages = pageNumbers.map(page => {

        if (props.curPage == page) {
            return (
                <li key={page} className="page-item disabled">
                    <a className="page-link">{page}</a>
                </li>
            )
        } else {
            return (
                <li key={page} className="page-item">
                    <a className="page-link" onClick={() => props.changePage(page)}>{page}</a>
                </li>
            )
        }
    })

    return (
        <nav className="m-2">
            <ul className="pagination justify-content-center">
                {pages}
            </ul>
        </nav>

    )
}
