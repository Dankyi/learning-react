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



// 2.) How to handle the side effect of the above problem using useEffect
// Read more info here: https://reactjs.org/docs/hooks-effect.html
// Problem still there
export default function App() {
    const [starWarsData, setStarWarsData] = React.useState({});

    console.log("App'js component rendered!"); 

    React.useEffect(() => { // This absorbs the side effects of re-rendering that happens repeatedly after api calls
        fetch("https://swapi.dev/api/people/1") // Fetching data from an api
            .then(res => res.json()) // Resolve the promise received from fetch converting to json
            // .then(data => setStarWarsData(data)); // Maintain the fetched data in state
    });

    return (
        <div>
            {/* <pre> tag defines preformatted text */}
            <pre>{JSON.stringify(starWarsData, null, 2)}</pre>
        </div>
    )
}

