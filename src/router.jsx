import { Navigate, createBrowserRouter } from "react-router-dom";
import UserLayoutComponent from "./components/UserLayoutComponent";
import Login from "./views/Login";
import ItemLayoutComponent from "./components/ItemLayoutComponent";
import App from "./views/App";


const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <ItemLayoutComponent/>,
            children: [
                {
                    path: "/",
                    element: <Navigate to='/dashboard'/>
                },
                {
                    path: "/dashboard",
                    element: <App/>
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
    ]
)

export default router;