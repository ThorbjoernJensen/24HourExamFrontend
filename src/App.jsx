import {useRef, useState, useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import facade from "./apiFacade";
import Header from "./components/Header.jsx";
import SignUp from "./components/SignUp.jsx";
import ConferenceInfo from "./components/ConferenceInfo.jsx";
import Conferences from "./pages/Conferences.jsx";
import Speakers from "./pages/Speakers.jsx";
import Talks from "./pages/Talks.jsx";
import CreateTalk from "./pages/CreateTalk.jsx";


function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginMessage, setLoginMessage] = useState("Log in to use the API");
    const [errorMessage, setErrorMessage] = useState("No Errors");

    const [conferences, setConferences] = useState([]);
    const [conference, setConference] = useState({});

    const [talks, setTalks] = useState([]);

    const [speakers, setSpeakers] = useState([]);

    const getConferences = async () => {
        await facade.fetchData("/info/conference", setConferences, "GET", null, setErrorMessage);
        // console.log("fra get Conferences" + conferences);
    }

    const getTalks = async () => {
        await facade.fetchData("/info/talk", setTalks, "GET", null, setErrorMessage);
        console.log("fra get Talks" + conferences);
    }

    const getSpeakers = async () => {
        await facade.fetchData("/info/speaker", setSpeakers, "GET", null, setErrorMessage);
        // console.log(speakers);
    }

    const createTalk = async (newTalk) => {
        console.log("create talk")
        console.log(newTalk)
        await facade.fetchData("/info/talk", ()=>alert("Talk created"), "POST", newTalk, setErrorMessage);
    }


    return (
        <>
            <Header setLoggedIn={setLoggedIn} loggedIn={loggedIn} setErrorMessage={setErrorMessage}
                    setLoginMessage={setLoginMessage} loginMessage={loginMessage}/>
            <Routes>
                <Route path="" element={<Home/>}/>
                <Route path="/signup" element={<SignUp setLoggedIn={setLoggedIn}/>}/>
                <Route path="/conferenceinfo" element={<ConferenceInfo conference={conference}/>}/>
                <Route path="/conferenceinfo/:id" element={<ConferenceInfo conference={conference}/>}/>
                <Route path="/conference"
                       element={
                           <>
                               {facade.hasUserAccess("user", loggedIn) ?
                                   <Conferences conferences={conferences}
                                                onGetConferences={getConferences}
                                                setConference={setConference}/> :
                                   ("you must be logged in with user rights to see conference details")
                               }
                           </>
                       }
                />

                <Route path="/talk"
                       element={
                           <>
                               {facade.hasUserAccess("user", loggedIn) ?
                                   <Talks talks={talks}
                                             onGetTalks={getTalks}/> :
                                   ("you must be logged in with user rights to see talks-info")
                               }
                           </>
                       }
                />

                <Route path="/speaker"
                       element={
                           <>
                               {facade.hasUserAccess("user", loggedIn) ?
                                   <Speakers speakers={speakers}
                                             onGetSpeakers={getSpeakers}/> :
                                   ("you must be logged in with user rights to see speaker info")
                               }
                           </>
                       }
                />
                <Route path="/createtalk"
                       element={
                           <>
                               {facade.hasUserAccess("user", loggedIn) ?
                                   // onCreateTalk, conferences, onGetConferences
                                   <CreateTalk onCreateTalk={createTalk} conferences={conferences}
                                             onGetConferences={getConferences}/> :
                                   ("you must be logged in with user rights to see speaker info")
                               }
                           </>
                       }
                />

                <Route path="*" element={<h1>Page Not Found !!!!</h1>}/>
            </Routes>
        </>
    )
}

export default App;

