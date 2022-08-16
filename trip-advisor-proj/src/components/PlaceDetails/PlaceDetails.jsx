import { Box, Typography, Button, Card, CardMedia, 
    CardContent, CardActions, Chip } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating"

import useStyles from "./styles";

const PlaceDetails = ({ place, isPlaceClickedOnMap, refProp}) => {
    // console.log(place);
    const classes = useStyles();

    if (isPlaceClickedOnMap) {
        // Built in method on the html element
        refProp?.current?.scrollIntoView({
            behavior: "smooth", 
            block: "start"
        });
    }
    // Check to see if the place exists and check
    // also if its got awards before mapping
    const placeAwards = place?.awards?.map(award => (
        <Box my={1} display="flex" justifyContent="space-between" alignItems="center">
            <img src={award.images.small} alt={award.display_name}></img>
            <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
        </Box>
    ));
    
    // Check to see if the place exists and check also if its got some cooking style
    // (cuisine) before mapping. Destructure approach used instead to get the name
    const placeCuisines = place?.cuisine?.map(({ name }) => (
        <Chip key={name} size="small" label={name} className={classes.chip}>
        </Chip>
    ));

    // If there's a place then render its address
    const placeAddress = place?.address && (
        <Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.subtitle}>
            <LocationOnIcon /> {place.address}
        </Typography>
    );

    // If there's a place then render its phone number
    const phoneNum = place?.phone && (
        <Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.spacing}>
            <PhoneIcon /> {place.phone}
        </Typography>
    );

    return (
        <Card elevation={6}>
            <CardMedia
                style={{ height: 350}}
                image={place.photo 
                    ? place.photo.images.large.url
                    : "" // Insert a dummy restaurant image url here
                }
                title={place.name}
            />

            <CardContent>
                <Typography gutterBottom variant="h5">{place.name}</Typography>

                <Box display="flex" justifyContent="space-between">
                    <Rating value={Number(place.rating)} readOnly/>
                    <Typography gutterBottom variant="subtitle1">out of {place.num_reviews} reviews</Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Price</Typography>
                    <Typography gutterBottom variant="subtitle1">{place.price_level}</Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Ranking</Typography>
                    <Typography gutterBottom variant="subtitle1">{place.ranking}</Typography>
                </Box>

                {placeAwards}
                {placeCuisines}
                {placeAddress}
                {phoneNum}

                <CardActions>
                    <Button size="small" color="primary" 
                        onClick={() => window.open(place.web_url, "_blank")}
                        >Trip Advisor
                    </Button>

                    <Button size="small" color="primary" 
                        onClick={() => window.open(place.website, "_blank")}
                        >Website
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}

export default PlaceDetails;