import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";

import Table from 'react-bootstrap/Table';
import {Link} from "react-router-dom";

function Talks({talks, onGetTalks}) {
    const [conference, setConference] = useState({});
    useEffect(() => {
        onGetTalks();

    }, []);
    console.log("her kommer talks")
    console.log(talks);



    return (
        <div className="mainContent">
            <h3> Talks </h3>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Topic</th>
                    <th>Duration</th>
                </tr>
                </thead>
                <tbody>

                {talks.length > 0 ?
                    (talks.map((talk) => (

                        <tr key={talk.id}>
                            <td>{talk.id}</td>
                            <td>{talk.topic}</td>
                            <td>{talk.duration}</td>
                        </tr>
                    )))
                    : (
                        <tr>
                            <td> No talks found </td>
                        </tr>
                    )}


                </tbody>
            </Table>
            <NavLink to="/createTalk">
                <i className="fa fa-fw fa-envelope"></i> Add Talk
            </NavLink>
        </div>

    )


}

export default Talks;