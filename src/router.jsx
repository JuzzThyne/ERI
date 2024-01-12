import { Navigate, createBrowserRouter } from "react-router-dom";
import UserLayoutComponent from "./components/UserLayoutComponent";
import Login from "./views/Login";
import ItemLayoutComponent from "./components/ItemLayoutComponent";
import Home from "./views/Home";
import AccountSettings from "./views/AccountSettings";
import SeachItem from "./views/SeachItem";
import NotFound from "./views/NotFound";


const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <ItemLayoutComponent/>,
            children: [
                {
                    path: "/",
                    element: <Navigate to='/home'/>
                },
                {
                    path: "/home",
                    element: <Home/>
                },
                {
                    path: "/account",
                    element: <AccountSettings/>
                },
                {
                    path: "/search",
                    element: <SeachItem/>
                },
            ]
        },
        {
            path: "/",
            element: <UserLayoutComponent/>,
            children: [
                {
                    path: "/login",
                    element: <Login/>
                }
            ]
        },
        {
            path: "*",
            element: <NotFound/>,
        },
    ]
)

export default router;