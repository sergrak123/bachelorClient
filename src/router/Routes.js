import About from "../pages/About";
import Posts from "../pages/Posts";
import PostIdPage from "../pages/PostIdPage";
import Login from "../pages/Login";
import Catalog from "../pages/Catalog";

export const privateRoutes = [
    // {path: "/about", element: <About/>},
    // {path: "/posts", element: <Posts/>},
    // {path: "/posts/:id", element: <PostIdPage/>}
    {path: "/catalog", element: <Catalog/>},
]

export const publicRoutes = [
    {path: "/login", element: <Login/>},
    {path: "/catalog", element: <Catalog/>},
]