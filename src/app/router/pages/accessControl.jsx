import { Children } from "react";
import SettingsPage from "../../../pages/AccessControl/SettingsPage";
import UsersPage from "../../../pages/AccessControl/UsersPage";

export default [

    {
        index: true,
        path: '/users',
        element: <UsersPage />
    },
    {
        paht: '/settings',
        element: <SettingsPage />
    }

]