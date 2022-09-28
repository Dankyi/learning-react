import React from "react";

const StateContext = React.createContext(); // React hook
const baseURL = "https://google-search3.p.rapidapi.com/api/v1";

// Every React component has children. These refers to all
// other components used within that particular component
const StateContextProvider = ({ children }) => {
    const [results, setResults] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");

    // Where path = "/search", "/images", "/news", or "/videos"
    const getResults = async (path) => {
        setIsLoading(true);

        const options = {
            method: "GET",
            headers: {
                "X-User-Agent": "desktop",
                "X-Proxy-Location": "EU",
                "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_API_KEY,
                "X-RapidAPI-Host": "google-search3.p.rapidapi.com"
            }
        };

        const response = await fetch(`${baseURL}${path}`, options);
        const data = await response.json();

        setResults(data);
        setIsLoading(false);
    }

    return (
        <StateContext.Provider 
            value={{ getResults, results, isLoading, searchTerm, setSearchTerm }}
        >
            {children}
        </StateContext.Provider>
    );
}

export const useStateContext = () => React.useContext(StateContext);

export default StateContextProvider;