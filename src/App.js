import React, {useEffect, useState} from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import About from "./pages/About";
import Posts from "./pages/Posts";
import Navbar from "./components/UI/Navbar/Navbar";
import Router from "./components/Router";
import {AuthContext} from "./context";

// const router = createBrowserRouter([
//     {
//         path: "/about",
//         element: <About/>
//     },
//     {
//         path: "/posts",
//         element: <Posts/>
//     }
// ]);

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
                <Navbar/>
                <Router/>
            </BrowserRouter>
        </AuthContext.Provider>

    )
}

export default App;
