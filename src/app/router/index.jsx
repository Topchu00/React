import { createBrowserRouter } from "react-router-dom";
import Login from "../../pages/Login";
import MainPage from "../../pages/MainPage";
import DefaultLayout from "../../layout/DefaultLayout";
import accessControl from "./pages/accessControl";
import SettingsPage from "../../pages/AccessControl/SettingsPage";
import UsersPage from "../../pages/AccessControl/UsersPage";
import AnilibriaPage from "../../pages/Anilibria";
import AnimeDetail from "../../pages/Anilibria/AnimeDetail";
import ErrorPage from "../../pages/Anilibria/ErrorPage";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                index: true,
                path: '/',
                element: <MainPage />
            },
            {
                path: '/users',
                element: <UsersPage />
            },
            {
                path: '/settings',
                element: <SettingsPage />
            },
            {
                path: '/anilibria',
                element: <AnilibriaPage />,
                errorElement: <ErrorPage />
            },
            {
                path: '/anime/releases/:id',
                element: <AnimeDetail />,
                errorElement: <ErrorPage />
            }
        ]
    }
])

export default router