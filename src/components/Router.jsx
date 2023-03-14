import React from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import PostIdPage from "../pages/PostIdPage";
import {privateRoutes, publicRoutes} from "../router/Routes";

const Router = () => {
    const isAuth = true;
    return (

        {/*<Route path="/about" element={<About/>}/>*/}
    {/*<Route path="/posts" element={<Posts/>}/>*/
    }
    {/*/!*как потом будем ловить параметр на странице + exact не нужен*!/*/
    }
    {/*<Route path="/posts/:id" element={<PostIdPage/>}/>*/
    }
    {/*/!*<Route path="*" element={<Posts/>} />*!/*/
    }
    {/*/!*Вместо Redirect. Нужно именно так, через Navigate для случая с авторизацией*/
    }
    {/*тк иначе будет просто выводиться компонент без содержимого в отличии от редиректа*!/*/
    }
    {/*<Route path="/*" element={<Navigate to="/posts" replace/>}/>*/
    }

    isAuth
        ?
        <Routes>
            {privateRoutes.map(route =>
                <Route path={route.path} element={route.element}/>
            )}
        </Routes>
        :
        <Routes>
            {publicRoutes.map(route =>
                <Route path={route.path} element={route.element}/>
            )}
        </Routes>
)
    ;
};

export default Router;