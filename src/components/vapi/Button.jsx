const Button = ({ children, onClick, type = 'button', className = '', disabled = false, width }) => {
    return (
        <button onClick={onClick} type={type} className={className} disabled={disabled} style={{ width }}>
            {children}
        </button>
    );
};

export default Button;