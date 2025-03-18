import CustomButton from '../CustomButton';
import './index.css';
import { Button } from 'primereact/button';

const Header = ({ title}) => {

    return (
        <header className="header">
            <div className="container">
                {/* <Button 
                    label="Submit" 
                    icon="pi pi-check" 
                    iconPos="right"
                    onClick={onClick}
                /> */}
                
                <CustomButton 
                    label={'Click me'}
                    additionalClass={'custom-button'}
                    handleClick={() => console.log('Клик по кнопке')}
                />

                <CustomButton 
                    label={'Click me 2'}
                    additionalClass={'custom-button'}
                    handleClick={() => console.log('Клик по кнопке 2')}
                />
            </div>
        </header>
    )
}

export default Header