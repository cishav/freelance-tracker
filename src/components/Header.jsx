function Header({ subtitle }){
    return (
        <header className="app-header">
            <h1>Freelance Tracker</h1>
            <p>{subtitle}</p>
        </header>
    )
}

export default Header;