import React, {useContext} from 'react';
import {AuthContext} from "../context";

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const login = event =>{
        event.preventDefault()
        setIsAuth(true)
        localStorage.setItem("auth", "true")
    }

    return (
        <div>
           <h1>Login</h1>
            <form onSubmit={login}>
                <input type="text" placeholder="Login"/>
                <input type="text" placeholder="Password"/>
                <button>Log in</button>
            </form>
        </div>
    );
};

export default Login;