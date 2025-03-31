import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import './index.css'

const DefaultLayout = ({children}) => {
    return (
        <div className="defailt-layout">
            <Header />
            <div className="container">
                <Outlet />
            </div>
            {children}
            <footer>
                <div className="footer-container">
                    <p>&copy; All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

export default DefaultLayout;