import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import Login from "./Login.jsx";
import LoggedIn from "./LoggedIn.jsx";
import "../styles/header.css";

function Header({loggedIn, setLoggedIn, setLoginMessage, loginMessage, setErrorMessage}) {

    return (
        <nav className="topnav">
            <div className="topnavLeft">
                <p> {loginMessage} </p>
            </div>

            <div className="topnavMid">
                <NavLink className="" to="/">
                    <i className="fa fa-fw fa-home"></i> Home
                </NavLink>
                <NavLink className="" to="/conference">
                    <i className="fa fa-fw fa-home"></i> Conferences
                </NavLink>
                <NavLink className="" to="/talk">
                    <i className="fa fa-fw fa-home"></i> Talks
                </NavLink>
                <NavLink className="" to="/speaker">
                    <i className="fa fa-fw fa-home"></i> Speakers
                </NavLink>
            </div>
            <div className="topnavRight">
                {!loggedIn ? (
                    <Login setLoggedIn={setLoggedIn} setLoginMessage={setLoginMessage}
                           setErrorMessage={setErrorMessage}/>
                ) : (

                    <LoggedIn setLoggedIn={setLoggedIn} setLoginMessage={setLoginMessage}/>

                )}
                <NavLink to="/signup">
                    <button className="signUp">Sign up</button>
                </NavLink>
            </div>
        </nav>
    );
}

export default Header;
