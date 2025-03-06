import './header.css'

export const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="header__wrapper">
                    <div className="header__nav">
                        <nav className="header__nav-links">
                            <a href="./service.html">Услуги</a>
                            <a href="./info.html">O нас</a>
                            <a href="./contacts.html">Контакты</a>
                            <a href="./portfolio.html">Портфолио</a>
                            <a href="./production.html">Производство</a>
                        </nav>
                        <button className="header__nav-button">
                            Скачать прайс
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}