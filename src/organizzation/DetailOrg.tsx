export default function DetailOrg(props: any) {

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">{props.org.name}</h3>
                    {props.org.isPublic ? <h6 className="card-subtitle">This org is Public</h6> : <h6 className="card-subtitle">This org is not Public</h6>}
                    <div className="row">
                        <div className="col-sm-6 text-center">
                            <p className="mx-3"><b>Admins</b></p>
                            <ul className="list-group list-group">
                                <li className="list-group-item">
                                    Giorgia
                                    <span className="float-end">
                                        <button className="btn btn-danger">
                                            Remove
                                        </button>
                                    </span>
                                </li>
                                <li className="list-group-item">
                                    Marco
                                </li>
                                <li className="list-group-item">
                                    Gianni
                                </li>
                            </ul>
                            <button className="btn btn-primary mt-2">Add Admin</button>
                        </div>
                        <div className="col-sm-6 text-center">
                            <p className="mx-3"><b>Members</b></p>
                            <ul className="list-group list-group">
                                <li className="list-group-item">
                                    Giorgia
                                </li>
                                <li className="list-group-item">
                                    Marco
                                </li>
                                <li className="list-group-item">
                                    Gianni
                                </li>
                                <li className="list-group-item">
                                    Mirko
                                </li>
                            </ul>
                            <button className="btn btn-primary mt-2">Add Member</button>
                        </div>
                    </div>
                </div>
                <div className="card-footer text-center">
                    <button className="btn btn-secondary" onClick={() => props.handleCloseButton()}>Close</button>
                </div>
            </div>
        </>
    )
}