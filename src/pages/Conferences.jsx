import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";

import Table from 'react-bootstrap/Table';

function Conferences({conferences, onGetConferences}) {

    useEffect(() => {
        onGetConferences();

    }, []);
    console.log(conferences);


    return (
        <div className="mainContent">
            <h3> Conferences </h3>
            <Table striped bordered hover size="sm">
                <thead>
                <th> Id</th>
                <th>Name</th>
                <th>Location</th>
                <th>Capacity</th>
                <th>Date</th>
                <th>Time</th>
                </thead>
                <tbody>
                {conferences.length > 0
                    ? (conferences.map((conference) => (

                        <tr key={conference.id}>
                            <td>{conference.id}</td>
                            <td>{conference.name}</td>
                            <td>{conference.location}</td>
                            <td>{conference.capacity}</td>
                            <td>{conference.date}</td>
                            <td>{conference.time}</td>
                            {/*<td>*/}
                            {/*    <button className="btn btn-danger " type="submit" name="delete"*/}
                            {/*            value="${orderItem.order_id}">Slet*/}
                            {/*    </button>*/}
                            {/*</td>*/}
                        </tr>)))


                    : (<tr>
                        <td> no conferences registered"</td>
                    </tr>)}
                </tbody>
            </Table>
        </div>

    )


}

export default Conferences;