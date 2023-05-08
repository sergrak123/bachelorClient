import React, {useEffect, useState} from "react";
import {
    BrowserRouter,
} from "react-router-dom";
import Router from "./components/Router";
import {AuthContext} from "./context";
import NavigationBar from "./components/NavigationBar";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
    const [isAuth, setIsAuth] = useState(false)
    const [authInfo, setAuthInfo] = useState()
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        if (localStorage.getItem("auth")) {
            setIsAuth(true)
            const info = localStorage.getItem("authInfo");
            // if (jsonValue != null) return JSON.parse(jsonValue);
            setAuthInfo(JSON.parse(info))
        }
        setLoading(false)
    }, [])

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            authInfo,
            setAuthInfo,
            isLoading
        }}>
            <BrowserRouter>
                <ScrollToTop/>
                <NavigationBar/>
                <Router/>
            </BrowserRouter>
        </AuthContext.Provider>

    )
}

export default App;
