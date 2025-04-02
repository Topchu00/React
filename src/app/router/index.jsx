import { createBrowserRouter } from "react-router-dom";
import Login from "../../pages/Login";
import DefaultLayout from "../../layout/DefaultLayout";
import accessControl from "./page/accessControl";
import { MainPage } from "../../pages/MainPage/Card";
import Anilibria from "../../pages/Anilibria";


const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                index: true,
                element: <MainPage />
            },
            ...accessControl,
            {
                path: '/anilibria',
                element: <Anilibria />
            }
        ]
    }
])

export default router;