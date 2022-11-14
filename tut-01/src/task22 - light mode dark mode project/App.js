import Navbar from "./components/Navbar";
import Main from "./components/Main";
import React from "react";

export default function App() {
    const [darkMode, setDarkMode] = React.useState(false);

    function toggleDM() {
        setDarkMode(prevState => !prevState);
    }

    return (
        <div className="container">
            <Navbar 
                darkMode={darkMode}
                toggleDarkMode={toggleDM}
            />
            <Main 
                darkMode={darkMode}
            />
        </div>
    )
}