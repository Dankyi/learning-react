import logo from '../../src/react-logo.png';

function Navbar() {
    return (
        <nav className="nav">
            <img className="nav-img" src={logo}></img>
            <h3 className="nav-h3">React Facts</h3>
            <h4 className="nav-h4">React Course - Project 1</h4>
        </nav>
    );
}

export default Navbar;