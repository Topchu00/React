import foo, {} from "./constants"


export const Header = () => {
    return (
        <header>
            <h1>My React App</h1>
            <h1>{foo}</h1>
        </header>
    )
}