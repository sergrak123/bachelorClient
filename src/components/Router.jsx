import React, {useContext} from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import PostIdPage from "../pages/PostIdPage";
import {privateRoutes, publicRoutes} from "../router/Routes";
import {AuthContext} from "../context";

const Router = () => {
    const {isAuth, isLoading} = useContext(AuthContext)
    if (isLoading) {
        return <h1>Loading profile...</h1>
    }
    return (

        isAuth
            ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route path={route.path} element={route.element} key={route.path}/>
                )}
                <Route path="*" element={<Navigate to="/catalog" replace/>}/>
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route path={route.path} element={route.element} key={route.path}/>
                )}
                <Route path="*" element={<Navigate to="/login" replace/>}/>
            </Routes>
    );
};

export default Router;