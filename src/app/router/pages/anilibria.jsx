import {Anilibria} from "../../../pages/Anilibria/index.jsx";
import AnilibriaDetails from "../../../pages/Anilibria/AnilibiraDetails/index.jsx";
import { SearchProvider } from "../../../widgets/Anilibria/context/SearchContext.jsx";

export default [
    {
        path: '/anilibria',
        element: 
            <SearchProvider>
                <Anilibria />
            </SearchProvider>
    },
    {
        path: '/anilibria/:identifier',
        element: <AnilibriaDetails />
    }
]