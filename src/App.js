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
import NavBarCustom from "./components/NavBarCustom";
import ProductList from "./components/ProductList";
import Category from "./components/Category";
import Pagination from "./components/Pagination";

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
{/*                <div className="bg-blue-500 h-full w-full">*/}
{/*d*/}
{/*                </div>*/}
                <NavBarCustom/>
                <div className="w-full flex bg-gray-100">

                    <div className="w-1/6 mt-36 bg-white rounded-md ml-10" >
                        <Category/>
                    </div>
                    <div className="w-4/6 pl-16 mb-28">
                        <ProductList/>
                        <Pagination/>
                    </div>



                </div>

                {/*<div className="bg-blue-500 h-full w-full">*/}
                {/*    d*/}
                {/*</div>*/}

                {/*<Navbar/>*/}
                {/*<Router/>*/}
            </BrowserRouter>
        </AuthContext.Provider>

    )
}

export default App;
