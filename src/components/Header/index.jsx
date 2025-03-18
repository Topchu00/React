import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import './index.css';
import { HEADER_NAV_ITEMS } from './constants';

const Header = () => {

    const onClick = () => {
        console.log('Logout')
    }

    const LogoutButtonTemplate = (
        <Button
            onClick={onClick}
            rounded 
            icon="pi pi-sign-out" 
            severity="help" 
        />
    )
    

    return (
        <header className="header">
            <div className="container">
                <Menubar 
                    model={HEADER_NAV_ITEMS} 
                    end={LogoutButtonTemplate}
                />
            </div>
        </header>
    )
}

export default Header