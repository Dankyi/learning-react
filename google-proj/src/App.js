import React from "react";
import './index.css';

import Navbar from "./components/Navbar";
import AppRoutes from "./components/AppRoutes";
import Footer from "./components/Footer";

const App = () => {
    const [darkTheme, setDarkTheme] = React.useState(false);

    return (
        <div className={darkTheme ? "dark" : ""}>
            {/* if in "dark" mode then apply bg and text 
            color of weight 900 and 200 respectively */}
            <div className="bg-gray-100 dark:bg-gray-900 dark:text-gray-200 min-h-screen">
                <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme}/>
                <AppRoutes />
                <Footer />
            </div>
        </div>
    );
}

export default App;