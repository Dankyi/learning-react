import React from "react";

// Components from external libraries
import { CssBaseline, Grid } from "@material-ui/core"; // Normalizes the styles for us

// Components from internal files
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import PlaceDetails from "./components/PlaceDetails/PlaceDetails";
import { getPlacesData, getWeatherData } from "./api/apis";

const App = () => {
    const [places, setPlaces] = React.useState([]);
    const [weatherData, setWeatherData] = React.useState([]);
    const [coordinates, setCoordinates] = React.useState({});
    // This is the top left and bottom right corners of the map
    const [bounds, setBounds] = React.useState({});
    const [isPlacesDataLoading, setIsPlacesDataLoading] = React.useState(false);
    const [type, setType] = React.useState("restaurants");
    const [rating, setRating] = React.useState("");
    const [filteredPlaces, setFilteredPlaces] = React.useState([]);
    
    // Since we have a List component that displays a list of the places
    // and a Map that shows the same list of places and its details, we 
    // want to ensure clicking a place (child component) in either of the
    // component gets its state changed in both components so we monitor 
    // its state here other than in either of the components
    const [childPlaceClicked, setChildPlaceClicked] = React.useState(null);

    // Initialize the coordinates the very first time the 
    // app launches based on the users current location
    React.useEffect(() => {
        // Getting the users current location
        // You can just pass the argument as data and access the latitude 
        // and longitude from it. This is a destructuring approach 
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude }}) => {
            setCoordinates({ lat: latitude, lng: longitude });
        });
    }, []); // And setting it up to run only once

    React.useEffect(() => {
        // console.log(bounds);
        if (bounds.sw && bounds.ne) {
            setIsPlacesDataLoading(true);

            getWeatherData(coordinates.lat, coordinates.lng).then(data => setWeatherData(data));

            // Since getPlacesData function is async function we use then
            // Fetch data from API call
            getPlacesData(type, bounds.sw, bounds.ne).then(data => {
                // console.log(data);
                setPlaces(data?.filter(place => place.name && place.num_reviews > 0));
                setFilteredPlaces([]);
                setIsPlacesDataLoading(false);
            });
        }
    }, [type, bounds]); // Since we're monitoring 2 states

    React.useEffect(() => {
        const filtered = places.filter(place => place.rating > rating);
        setFilteredPlaces(filtered);
    }, [rating]);

    return (
        // "<></>" Known as React Fragments
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates}/>
            <Grid container spacing={3} style={{ width: "100%" }}>
                <Grid item xs={12} md={4}>
                    <List 
                        placesData={filteredPlaces.length ? filteredPlaces : places}
                        childPlaceClicked={childPlaceClicked}
                        isPlacesDataLoading={isPlacesDataLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <Map 
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        placesData={filteredPlaces.length ? filteredPlaces : places}
                        setChildPlaceClicked={setChildPlaceClicked}
                        weatherData={weatherData}
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default App;