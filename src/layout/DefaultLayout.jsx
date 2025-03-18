import Header from "../components/Header"

const DefaultLayout = () => {
    return (
        <div>
            <Header
                title="Пропс title переданный из default layout"
                subtitle="Пропс subtitle переданный из default layout"
                onClick={() => console.log('Клик по кнопке')}
            />
        </div>
    )
}

export default DefaultLayout