import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ darkTheme, setDarkTheme }) => {
    return (
        <div className="p-4 pb-2 flex flex-wrap sm:justify-between justify-center items-center border-b dark:border-gray-700 border-gray-200">
            <div className="flex justify-between items-center space-x-5 w-screen">
                <Link to="/">
                    <p className="text-2xl font-bold text-white py-1 px-2 rounded dark:bg-gray-500 bg-blue-500 dark:text-gray-900">
                        GoogleProj 🔍
                    </p>
                </Link>

                <button 
                    className="text-xl dark:bg-gray-50 bg-white dark:text-gray-900 border rounded-full px-2 py-1 hover:shadow-lg"
                    type="button"
                    onClick={() => setDarkTheme(!darkTheme)}
                >
                    {darkTheme ? "Light 💡" : "Dark 🌙"}
                </button>
            </div>
        </div>
    );
}

export default Navbar;