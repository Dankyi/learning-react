import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating"

import useStyles from "./styles";
import mapStyles from "./mapStyles";

// Destructuring the Map props. Same as using props 
// and then accessing them using e.g. props.setBounds
const Map = ({ setCoordinates, setBounds, coordinates, placesData, setChildPlaceClicked, weatherData }) => {
    const classes = useStyles(); // call it as a hook
    const isDesktop = useMediaQuery("(min-width:600px)");

    const places = placesData?.map((place, index) => (
        <div 
            key={index}
            className={classes.markerContainer} 
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            >
            { !isDesktop 
            ? (
                <LocationOnOutlinedIcon 
                    color="primary" 
                    fontSize="large"
                />
              )
            : (
                <Paper elevation={3} className={classes.paper}>
                    <Typography 
                        className={classes.typography}
                        variant="subtitle2"
                        gutterBottom
                        >{place.name}
                    </Typography>
                    <img 
                        className={classes.pointer}
                        src={place.photo ? place.photo.images.large.url : ""}
                        alt={places.name}
                    />
                    <Rating 
                        size="small" 
                        value={Number(place.rating)} 
                        readOnly
                    />
                </Paper>
                )
            }
        </div>
    ));

    const weather = weatherData?.list?.map((data, index) => (
        <div key={index} lat={data.coord.lat} lng={data.coord.lng}>
            <img height={100} src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}></img>
        </div>
    ));

    return (
        <div className={classes.mapContainer}>Map
        <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
            defaultCenter={coordinates}
            center={coordinates}
            defaultZoom={14}
            margin={[50, 50, 50, 50]}
            options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles}} // Changes the style of the map
            onChange={(event) => {
                // console.log(event);
                setCoordinates({
                    lat: event.center.lat,
                    lng: event.center.lng
                });

                setBounds({
                    ne: event.marginBounds.ne,
                    sw: event.marginBounds.sw
                });
            }}
            onChildClick={(child) => setChildPlaceClicked(child)}
        >
            {places}
            {weather}
        </GoogleMapReact>

        </div>
    );
}

export default Map;