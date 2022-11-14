import React from "react";
import { CircularProgress, Grid, Typography, InputLabel, 
    MenuItem, FormControl, Select } from "@material-ui/core";
import useStyles from "./styles";
import PlaceDetails from "../PlaceDetails/PlaceDetails";

const List = ({ placesData, childPlaceClicked, isPlacesDataLoading, type, setType, rating, setRating }) => {
    const classes = useStyles();
    const [elemRefs, setElemRefs] = React.useState([]);
    
    // // Gives you a bit more info when wrapped inside curly braces 
    // // e.g. if value is 5 it shows in console as childPlaceClicked: 5
    // console.log({ childPlaceClicked });

    // To ensure clicking a place on the map shows the particular place
    // in the List we'll use React hook, createRef alongside useEffect
    React.useEffect(() => {
        // The underscore "_" means we're not going to use or not interested in
        // the first parameter of the map function but only interested in the index    
        const refs = Array(placesData?.length).fill() // create an array filled with the current places and map over them creating references for each
                        .map((_, index) => elemRefs[index] || React.createRef());
        setElemRefs(refs);
        // console.log(elemRefs);

        // Since inside of the useEffect we're making use of 2 states
    }, [placesData, elemRefs]); // call this useEffect anytime the placesData and elemRefs change

    // Are there places? If only there are then map over them
    // xs = extra small devices
    const places = placesData?.map((place, index) => (
        <Grid item key={index} xs={12}>
            <PlaceDetails 
                place={place}
                isPlaceClickedOnMap={Number(childPlaceClicked) === index}
                refProp={elemRefs[index]}
            />
        </Grid>
    ));
    
    const handleSelectType = (event) => {
        setType(event.target.value);
    }

    const handleSelectRating = (event) => {
        setRating(event.target.value);
    }

    return (
        <div className={classes.container}>List
            <Typography variant="h4">
                Restaurants, Hotels and Attractions around you
            </Typography>

            { isPlacesDataLoading 
            ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem"/>
                </div>
              ) 
            : (
                <>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Type</InputLabel>
                        <Select value={type} onChange={handleSelectType}>
                            <MenuItem value="restaurants">Restaurants</MenuItem>
                            <MenuItem value="hottels">Hottels</MenuItem>
                            <MenuItem value="attractions">Attractions</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel>Rating</InputLabel>
                        <Select value={rating} onChange={handleSelectRating}>
                            <MenuItem value={0}>All</MenuItem>
                            <MenuItem value={3}>Above 3.0</MenuItem>
                            <MenuItem value={4}>Above 4.0</MenuItem>
                            <MenuItem value={4.5}>Above 4.5</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid container spacing={3} className={classes.list}>
                        {places}
                    </Grid>
                </>
              )
            }
        </div>
    );
}

export default List;