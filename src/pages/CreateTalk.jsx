import React, {useEffect, useState} from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

function CreateTalk({onCreateTalk, conferences, onGetConferences}) {
    const init = {topic: "", duration: 0, propsList: ""};
    //todo add conference to dto
    // const init = {topic: "", duration: 0, propslist: "", harbour: {}, owners: []};
    const [newTalk, setNewTalk] = useState(init);

     const onChange = (evt) => {
        setNewTalk({...newTalk, [evt.target.id]: evt.target.value})
    }

    const onSubmit = (evt) => {
        evt.preventDefault();
        onCreateTalk(newTalk);

    }

    //Dropdown-data for conferences
    const [conferenceID, setConferenceID] = useState("Choose conference");
    const [inputValue, setInputValue] = React.useState("");
    const [conference, setConference] = useState({})
    const conferenceNames = conferences.map((conference) => conference.name);

    const [owners, setOwners] = useState([])

    useEffect(() => {
            onGetConferences();
        },
        []
    );

    //talks sorteres fra så newTalk-json passer til TalkDTO'en
    const reducedConferences = conferences.map(({ talks, ...rest }) => rest)

    function assignConference(newValue) {
        //
        const chosenConference = reducedConferences.find((conference) => conference.name === newValue);
        setConference(chosenConference);
        console.log("conference")
        console.log(conference)
        console.log("chosen")
        console.log(chosenConference)
        setNewTalk({...newTalk, conference: chosenConference})

        console.log("newTalk");
        console.log(newTalk);


        // setTasks(
        //     tasks.map((task) =>
        //         task.id === id ? { ...task, reminder: data.reminder } : task
        //     )

        //Hvorfor logger den et skridt forsinket?

    }


    return (
        <div className="container">
            <div>
                <h2>Create new Talk </h2>
                <form>
                    <input onChange={onChange} type="text" placeholder="Topic" id="topic"
                           value={newTalk.topic}/>
                    <input onChange={onChange} type="number" placeholder="Duration" id="duration"
                           value={newTalk.duration}/>
                    <input onChange={onChange} type="text" placeholder="propslist" id="propsList"
                           value={newTalk.propsList}/>


                    <div>
                        <Autocomplete className="drop-down"
                            /*løsning fra stackoverflow der gør at den ikke brokker sig over at initial input ikke giver nogen resultater*/
                                      isOptionEqualToValue={(option, value) => option.value === value.value}
                                      value={conferenceID}
                                      onChange={(event, newValue) => {
                                          setConferenceID(newValue);
                                          assignConference(newValue);
                                      }}

                                      inputValue={inputValue}

                                      onInputChange={(event, newInputValue) => {
                                          setInputValue(newInputValue);
                                      }}

                                      id="controllable-states-demo"
                                      options={conferenceNames}
                            // keykey={harbour.id}
                                      sx={{width: 300}}
                                      renderInput={(params) => <TextField {...params} />}
                        />
                        {/*{harbour ?*/}
                        {/*    (<p>Name: {harbour.name}</p>)*/}
                        {/*    : <h3> No boats in this harbour </h3>}*/}
                    </div>
                    <button onClick={onSubmit} type="submit">Create Talk</button>

                </form>
            </div>
        </div>
    );
}

export default CreateTalk;