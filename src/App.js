import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import About from "./pages/About";
import Posts from "./pages/Posts";
import Navbar from "./components/UI/Navbar/Navbar";
import Router from "./components/Router";

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
    return (
        <BrowserRouter>
            <Navbar/>
            <Router/>
        </BrowserRouter>
    )
}

export default App;
