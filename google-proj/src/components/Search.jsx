import React from "react";

// This module prevents requests to be made while user interacts 
// with the system (e.g. when entering a search term). It helps by 
// waiting for some time before executing user's (search term) request.
import { useDebounce } from "use-debounce";

import AppLinks from "./AppLinks";
import { useStateContext } from "../contexts/StateContextProvider";

const Search = () => {
    const [text, setText] = React.useState("Iphone");
    const { setSearchTerm } = useStateContext();
    const [debounceValue] = useDebounce(text, 300); // 300ms

    React.useEffect(() => {
        if (debounceValue) setSearchTerm(debounceValue);
    }, [debounceValue]);

    return (
        <div className="relative sm:ml-48 md:ml-72 sm:mt--10 mt-3">
            <input type="text" value={text} placeholder="Search.."
                className="sm:w-96 w-80 h-10 dark:bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg"
                onChange={(event) => setText(event.target.value)}
            />
            {!text && (
                <button type="button" onClick={() => setText("")}
                    className="absolute top-1.5 right-4 text-2xl text-gray-500"
                >
                    X
                </button>
            )}

            <AppLinks />
        </div>
    );
}

export default Search;