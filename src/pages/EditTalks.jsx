import React, {useEffect, useState} from "react";
import {NavLink, useLocation} from "react-router-dom";

import Table from 'react-bootstrap/Table';
import {Link} from "react-router-dom";

function EditTalks({onUpdateTalk, onDeleteTask}) {
    const location = useLocation()
    const talk = location?.state?.data

    const [updatedTalk, setupdatedTalk] = useState(talk);

    const onChange = (evt) => {
        setupdatedTalk({...updatedTalk, [evt.target.id]: evt.target.value})
    }

    const onSubmit = (evt) => {
        evt.preventDefault();
        onUpdateTalk(updatedTalk);

    }
    const onDelete = (evt) => {
        evt.preventDefault();
        onDeleteTask(updatedTalk);

    }



    return (
        <div className="mainContent">

            <h3> Edit Info for talk#{talk.id}: {talk.topic} </h3>
                <form>
                    <input onChange={onChange} type="text" placeholder="Topic" id="topic"
                           value={updatedTalk.topic}/>
                    <input onChange={onChange} type="number" placeholder="Duration" id="duration"
                           value={updatedTalk.duration}/>
                    <input onChange={onChange} type="text" placeholder="propslist" id="propsList"
                           value={updatedTalk.propsList}/>
                    <button onClick={onSubmit} type="submit">Update Talk</button>
                    <button onClick={onDelete} type="submit">Delete Talk</button>
                </form>
        </div>)
}

export default EditTalks;