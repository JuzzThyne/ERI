import { createBrowserRouter } from "react-router-dom";
import UserLayoutComponent from "./components/UserLayoutComponent";
import Login from "./views/Login";


const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <UserLayoutComponent/>,
            children: [
                {
                    path: "/",
                    element: <Login/>
                }
            ]
        }
    ]
)

export default router;