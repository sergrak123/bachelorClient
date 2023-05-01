import React, {useEffect, useState} from "react";
import {
    BrowserRouter,
} from "react-router-dom";
import Router from "./components/Router";
import {AuthContext} from "./context";
import NavBarCustom from "./components/NavBarCustom";

function App() {
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setLoading] =useState(true)

    useEffect(()=>{
        if (localStorage.getItem("auth")){
            setIsAuth(true)
        }
        setLoading(false)
    },[])

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading
        }}>
            <BrowserRouter>
                <NavBarCustom/>
                <Router/>
            </BrowserRouter>
        </AuthContext.Provider>

    )
}

export default App;
