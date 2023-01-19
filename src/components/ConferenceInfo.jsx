import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import Table from "react-bootstrap/Table";
import {useLocation} from 'react-router-dom'


export default function ConferenceInfo() {
    const location = useLocation()
    const conference = location?.state?.data

    return (
        <div className="mainContent">
            hello
            <h3> Info for talks on conference#{conference.id}: {conference.name} </h3>

            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Topic</th>
                    <th>Duration</th>
                </tr>
                </thead>
                <tbody>

                {conference.talks.length > 0 ?
                    (conference.talks.map((talk) => (

                        <tr key={talk.id}>
                            <td>{talk.id}</td>
                            <td>{talk.topic}</td>
                            <td>{talk.duration}</td>
                        </tr>
                    )))
                    : (
                        <tr>
                            <td> No talks for this conference</td>
                        </tr>
                    )}


                </tbody>
            </Table>
        </div>
    )

}