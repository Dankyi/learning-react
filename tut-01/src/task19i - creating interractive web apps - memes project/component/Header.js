import logo from "../images/trollface.png";

function Header() {
    return (
        <header className="header">
            <img className="header-img"  src={logo}></img>
            <h2 className="header-title">Meme Generator</h2>
            <h4 className="header-proj">React Course - Creating Interactive Web Apps</h4>
        </header>
    );
}

export default Header;