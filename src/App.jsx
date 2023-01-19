import {useRef, useState, useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import facade from "./apiFacade";
import Header from "./components/Header.jsx";
import SignUp from "./components/SignUp.jsx";


function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginMessage, setLoginMessage] = useState("Log in to use the API");
    const [errorMessage, setErrorMessage] = useState("No Errors");

    return (
        <>
            <Header setLoggedIn={setLoggedIn} loggedIn={loggedIn} setErrorMessage={setErrorMessage}
                    setLoginMessage={setLoginMessage} loginMessage={loginMessage}/>
            <Routes>
                <Route path="" element={<Home/>}/>
                <Route path="/signup" element={<SignUp setLoggedIn={setLoggedIn}/>}/>

                {/*<Route path="/boat"*/}
                {/*       element={*/}
                {/*           <>*/}
                {/*               {<h3> Boats </h3>}*/}
                {/*               {facade.hasUserAccess("admin", loggedIn) ?*/}
                {/*                   <Boats boats={boats}*/}
                {/*                          onGetBoats={getBoats}/> :*/}
                {/*                   ("you must be logged in with admin rights to see boat details")*/}
                {/*               }*/}
                {/*           </>*/}
                {/*       }*/}
                {/*/>*/}
                <Route path="*" element={<h1>Page Not Found !!!!</h1>}/>
            </Routes>
        </>
    )
}

export default App;

