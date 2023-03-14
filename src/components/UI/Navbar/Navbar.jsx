import React, {useContext} from 'react';
import {Link} from "react-router-dom";

import {AuthContext} from "../../../context";

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem("auth")
    }

    return (
        <div className="navbar">
            <button onClick={logout}>Log out</button>
            <div className="navbar__links">
                <Link to="/about">About</Link>
                <Link to="/posts">Posts</Link>
            </div>
        </div>
    );
};

export default Navbar;