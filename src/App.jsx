import {useRef, useState, useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import facade from "./apiFacade";
import Header from "./components/Header.jsx";
import SignUp from "./components/SignUp.jsx";
import ConferenceInfo from "./components/ConferenceInfo.jsx";
import Conferences from "./pages/Conferences.jsx";
import Speakers from "./pages/Speakers.jsx";


function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginMessage, setLoginMessage] = useState("Log in to use the API");
    const [errorMessage, setErrorMessage] = useState("No Errors");

    const [conferences, setConferences] = useState([]);
    const [conference, setConference] = useState({});

    const [speakers, setSpeakers] = useState([]);

    const getConferences = async () => {
        await facade.fetchData("/info/conference", setConferences, "GET", null, setErrorMessage);
        // console.log("fra get Conferences" + conferences);
    }

    const getSpeakers = async () => {
        await facade.fetchData("/info/speaker", setSpeakers, "GET", null, setErrorMessage);
        // console.log(speakers);
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

                <Route path="*" element={<h1>Page Not Found !!!!</h1>}/>
            </Routes>
        </>
    )
}

export default App;

