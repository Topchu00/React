const CustomButton = ({ label, additionalClass, disabled=false, handleClick }) => {
    return (
        <button
            className={`button ${additionalClass}`}
            disabled={disabled}
            onClick={handleClick}
        >
            {label}
        </button>
    )
}

export default CustomButton