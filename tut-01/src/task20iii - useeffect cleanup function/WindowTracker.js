import React from "react"

export default function WindowTracker() {
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

    //BEFORE: Toggling off the WindowTracker component via the app may causes 
    // memory leaks as the window still continues to listen to resize event 

    // React.useEffect(() => {
    //     window.addEventListener("resize", function() {
    //         setWindowWidth(window.innerWidth);
    //     });
    // }, []);


    // AFTER: To overcome the above issue we make use of useEffect with a return statement
    React.useEffect(() => {
        function watchWidth() {
            console.log("Setting Up");
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener("resize", watchWidth);

        // This cleans up to avoid memory leaks when the WindowTracker component dies (or is toggled off)
        return function() {
            console.log("Cleaning Up");
            window.removeEventListener("resize", watchWidth);
        }

    }, []);

    return (
        <h1>Window width: {windowWidth}</h1>
    )
}
