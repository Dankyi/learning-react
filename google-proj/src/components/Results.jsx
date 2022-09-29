import React from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";

import { useStateContext } from "../contexts/StateContextProvider";
import Loading from "./Loading";

const Results = () => {
    // This hook can be used to access the current 
    // url path (e.g. images, news etc.) opened
    const location = useLocation();

    // Call it as a hook, destructuring it to retrieve its params for use
    const { 
        getResults, 
        results, 
        isLoading, 
        searchTerm, 
        setSearchTerm 
    } = useStateContext();

    // Runs once (only at the start of the 
    // application or when you reload the page)
    React.useEffect(() => {
        let path = "";

        if (searchTerm) {
            if (location.pathname === "/search") {
                path = "search";
            } else if (location.pathname === "/images") {
                path = "image";
            } else if (location.pathname === "/news") {
                path = "news";
            } else {
                path = "video";
            }

            getResults(`/${path}/q=${searchTerm}&num=40`);
        }
        // Adding getResults as dependency will continuously make it
        // make api calls causing the app to reload forever.
        // This will make you exceed your basic limit for the api
    }, [searchTerm, location.pathname]); 

    if (isLoading) return <Loading />

    switch (location.pathname) {
        case "/search":
            return (
                <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
                    {/* For each result instead of using result.link or result.title, 
                        just destructure the result for those 2 properties */}
                    {results?.map(({ link, title }, index) => (
                        <div key={index} className="md:w-2/5 w-full">
                            <a href={link} target="_blank" rel="noreferrer">
                                <p className="text-sm">
                                    {link.length > 30 
                                    ? link.substring(0, 30)
                                    : link
                                    }
                                </p>

                                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                                    {title}
                                </p>
                            </a>
                        </div>
                    ))}
                </div>
            );
            
        case "/images":
            return (
                <div className="flex flex-wrap justify-center items-center">
                    {/* Destructured the link and image properties for further properties */}
                    {results?.map(({ link: { href, title }, image }, index) => (
                        <a key={index} href={href} className="sm:p-3 p-5"
                            target="_blank" rel="noreferrer"
                        >
                            <img src={image?.src} alt={image?.alt} loading="lazy"/>
                            <p className="w-36 break-words text-sm mt-2 ">{title}</p>
                        </a>
                    ))}
                </div>
            );

        case "/news":
            return (
                <div className="flex flex-wrap justify-between items-center space-y-6 sm:px-56">
                    {results?.map(({ link: links, id, source, title }) => (
                        <div key={id} className="md:w-2/5 w-full">
                            <a href={links?.[0].href} target="_blank" rel="noreferrer" className="hover:underline">
                                <p className="text-lg dark:text-blue-300 text-blue-700">
                                    {title}
                                </p>

                                <div className="flex gap-4">
                                    <a href={source?.href} target="_blank" rel="noreferrer">{source?.href}</a>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            );

        case "/videos":
            return (
                <div className="flex flex-wrap">
                    {results?.map(({ video, index }) => (
                        <div key={index} className="p-2">
                            <ReactPlayer 
                                url={video.additional_links[0].href}
                                controls width="355px" height="200px"                        
                            />
                        </div>
                    ))}
                </div>
            );

        default:
            return "ERROR!";
    }
}

export default Results;