export const Button = ({label}) => {
    const handleClick = (text) => {
        console.log('Button clicked:', text);
        
    }

    return (
        <>
            <button onClick={() => handleClick(label)}>
                {label}
            </button>
        </>
    )
}