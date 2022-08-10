import React from "react";

// // This approach of fetching data from an API makes the App component get
// // rendered infinitely after every API call making it an ineffective approach
// export default function App() {
//     const [starWarsData, setStarWarsData] = React.useState({});

//     console.log("App'js component rendered!"); 

//     // Fetching data from an api
//     fetch("https://swapi.dev/api/people/1")
//         .then(res => res.json()) // Resolve the promise received from fetch converting to json
//         .then(data => setStarWarsData(data)); // Maintain the fetched data in state

//     return (
//         <div>
//             {/* <pre> tag defines preformatted text */}
//             <pre>{JSON.stringify(starWarsData, null, 2)}</pre>
//         </div>
//     )
// }


// EXAMPLE SOLUTION 1
// 2.) How to handle the side effect of the above problem using useEffect
// Read more info here: https://reactjs.org/docs/hooks-effect.html
// Examples of when to apply useEffect: API calls, local storage, websockets,
// when you have 2 states you want to keep in sync with each other 
// export default function App() {
//     const [starWarsData, setStarWarsData] = React.useState({});

//     console.log("App'js component rendered!"); 

//     React.useEffect(() => { // This absorbs the side effects of re-rendering that happens repeatedly after api calls
//         console.log("Effect ran");
//         fetch("https://swapi.dev/api/people/1") // Fetching data from an api
//             .then(res => res.json()) // Resolve the promise received from fetch converting to json
//             .then(data => setStarWarsData(data)); // Maintain the fetched data in state
//     }, []); // This makes it runs only once

//     return (
//         <div>
//             {/* <pre> tag defines preformatted text */}
//             <pre>{JSON.stringify(starWarsData, null, 2)}</pre>
//         </div>
//     )
// }



// EXAMPLE SOLUTION 2
//.3) Though the 2nd parameter (i.e. the dependencies array) of  
// useEffect is optional it is something you'll always include.
// It essentially limits the number of times the effect will run
// and determines when it should run after every single render.
export default function App() {
    const [starWarsData, setStarWarsData] = React.useState({});
    const [count, setCount] = React.useState(1)
    
    console.log("App'js component rendered!");
    
    // side effects
    React.useEffect(() => {
        console.log("Effect ran");
        // fetch("https://swapi.dev/api/people/1")
        fetch(`https://swapi.dev/api/people/${count}`)
            .then(res => res.json())
            .then(data => setStarWarsData(data))

    // For the first time 0 later after add is clicked count = 1 and array 
    // dependencies compare previous value (i.e. [0] compared to [1]) to the
    // current and determines if there has been any changes to render again 
    }, [count]);
    
    return (
        <div>
            <pre>{JSON.stringify(starWarsData, null, 2)}</pre>
            <h2>The count is: {count}</h2>
            <button onClick={() => setCount(prevCount => prevCount + 1)}>Get Next Character</button>
        </div>
    )
}
