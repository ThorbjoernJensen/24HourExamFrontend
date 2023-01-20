import React, {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Table from "react-bootstrap/Table";

function Speakers({speakers, onGetSpeakers}) {
    const [SpeakerId, setSpeakerId] = useState("Choose speaker");
    const [inputValue, setInputValue] = React.useState("");
    const [speaker, setSpeaker] = useState({})
    const speakerNames = speakers.map((speaker) => speaker.name);

    useEffect(() => {
            onGetSpeakers();
        },
        []
    );

    function choseSpeaker(newValue) {
        const chosenSpeaker = speakers.find((speaker) => speaker.name === newValue);
        setTimeout(function delay() {
            setSpeaker(chosenSpeaker)
        }, 100);
        ;
    }

    return (
        <div className="mainContent">
            <h3> Speakers </h3>

            <Autocomplete className="drop-down"
                /*løsning fra stackoverflow der gør at den ikke brokker sig over at initial input ikke giver nogen resultater*/
                          isOptionEqualToValue={(option, value) => option.value === value.value}

                          value={SpeakerId}
                          onChange={(event, newValue) => {
                              setSpeakerId(newValue);
                              choseSpeaker(newValue);
                          }}
                          inputValue={inputValue}
                          onInputChange={(event, newInputValue) => {
                              setInputValue(newInputValue);
                          }}
                          id="controllable-states-demo"
                          options={speakerNames}
                          sx={{width: 300}}
                          renderInput={(params) => <TextField {...params} />}
            />

            {
                speaker &&
                <div>
                    <div key={speaker.id}>
                        <p>Name: {speaker.name}</p>
                        <p>Profession: {speaker.profession}</p>
                        <p>Gender: {speaker.gender}</p>
                        <p>Talks with this speaker: </p>
                        <Table striped bordered hover size="sm">
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>Topic</th>
                                <th>Duration</th>
                            </tr>
                            </thead>
                            <tbody>
                            {speaker.talks && speaker.talks.length !== 0 && speaker.talks.constructor !== Object ?
                                (speaker.talks.map((talk) => (
                                    <tr key={talk.id}>
                                        <td>{talk.id}</td>
                                        <td>{talk.topic}</td>
                                        <td>{talk.duration}</td>
                                    </tr>
                                )))
                                : (
                                    <tr>
                                        <td> No talks for by this speaker</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>
            }
        </div>
    )
}
export default Speakers;