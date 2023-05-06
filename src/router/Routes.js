import PostIdPage from "../pages/PostIdPage";
import Login from "../pages/Login";
import Catalog from "../pages/Catalog";
import Card from "../pages/Card";
import ShoppingCart from "../pages/ShoppingCart";
import Checkout from "../pages/Checkout";

export const privateRoutes = [
    // {path: "/posts", element: <Posts/>},
    // {path: "/posts/:id", element: <PostIdPage/>}
    {path: "/catalog", element: <Catalog/>},
    {path: "/cart", element: <ShoppingCart/>},
    {path: "/checkout", element: <Checkout/>},
]

export const publicRoutes = [
    {path: "/login", element: <Login/>},
    {path: "/catalog", element: <Catalog/>},
    {path: "/cart", element: <ShoppingCart/>},
]