export default function CustomButton ({template, children}) {
    return (
        <div style={{
                backgroundColor: 'purple',
                padding: '20px'
            }}
        >
            {template}
            {children}
        </div>
    )
}
