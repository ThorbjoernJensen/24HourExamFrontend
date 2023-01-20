import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";

import Table from 'react-bootstrap/Table';
import {Link} from "react-router-dom";
import facade from "../apiFacade.js";
import Login from "../components/Login.jsx";
import LoggedIn from "../components/LoggedIn.jsx";

function Talks({facade, talks, onGetTalks, loggedIn}) {
    const [conference, setConference] = useState({});
    const [adminMode, setAdminMode] = useState(false);

    useEffect(() => {
        onGetTalks();
        setAdminMode(facade.hasUserAccess("admin", loggedIn));

    }, []);
    console.log("her kommer talks")
    console.log(talks);


    return (
        <div className="mainContent">
            <h3> Talks </h3>

            {adminMode &&
                (<h4>Admin page</h4>)
            }

            {adminMode ?

                (<Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Topic</th>
                    <th>Duration</th>
                    <th>Edit</th>

                </tr>
                </thead>
                <tbody>

                {talks.length > 0 ?
                    (talks.map((talk) => (

                        <tr key={talk.id}>
                            <td>{talk.id}</td>
                            <td>{talk.topic}</td>
                            <td>{talk.duration}</td>

                            <td><Link key={talk.id} to={"/edittalk/" + talk.id}
                                      state={{data: talk}}>
                                Edit
                            </Link>
                            </td>


                        </tr>
                    )))


                    : (
                        <tr>
                            <td> No talks found</td>
                        </tr>
                    )}


                </tbody>
            </Table>) :
                (<Table striped bordered hover size="sm">
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
                                <td> No talks found</td>
                            </tr>
                        )}


                    </tbody>
                </Table>)
            }

            {adminMode &&
                (<NavLink to="/createTalk">
                    <i className="fa fa-fw fa-envelope"></i> Add Talk
                </NavLink>)
            }
        </div>


    )


}

export default Talks;