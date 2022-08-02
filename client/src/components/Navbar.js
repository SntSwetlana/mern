import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import {Authcontext} from "../context/Authcontext";

export const Navbar = () => {
    const  auth  = useContext(Authcontext)
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
    }
    return(
        <nav>
            <div className="nav-wrapper orange darken-3" style = {{padding: '0 2 rem'}}>
                <span className="brand-logo">Strict links</span>

                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/PlayCardGame">Play Matching Game!!!</NavLink></li>
                    <li><NavLink to="/CreateQuizletPage">Create Quizlet Page</NavLink></li>
                    <li><NavLink to="/QuizletPage">Quizlet Page</NavLink></li>
                    <li><NavLink to="/SchoolPage">School Page</NavLink></li>
                    <li><NavLink to="/create">Create Page</NavLink></li>
                    <li><NavLink to="/links">Links Page</NavLink></li>
                    <li><NavLink to="/" onClick={logoutHandler}>logout</NavLink></li>
                </ul>
            </div>
        </nav>

    )
}
