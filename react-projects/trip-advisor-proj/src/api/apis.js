import axios from "axios";

// Check https://rapidapi.com/apidojo/api/travel-advisor/
export const getPlacesData = async(type, sw, ne) => {
    const URL = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`;
    // console.log(sw);
    try {
        const options = {
            params: {
                bl_latitude: sw.lat, // bl = bottom left
                tr_latitude: ne.lat, // tr = top right
                bl_longitude: sw.lng,
                tr_longitude: ne.lng
            },
            headers: {
                "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_API_KEY,
                "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
            },
        };
        
        // You can destructor the response object by directly using:
        // const { data: { data } } and then return data directly
        // const response = await axios.get(URL, options);
        // console.log(response.data.data);
        // return response.data.data;
    } catch (error) {
        console.log(error);
    }
};

// Sort this aspect to get it to work - API settings needed
export const getWeatherData = async (lat, lng) => {
    const openWeatherMapURL = ""; // Insert the url of open weather map api on rapidapi here
    const options = {
        params: { lon: lng, lat: lat },
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_API_KEY,
            'X-RapidAPI-Host': 'open-weather-map27.p.rapidapi.com'
        }
    };

    try {
        const { data } = axios.get(openWeatherMapURL, options);
        return data;
        
    } catch (error) {
        console.log(error);
    }
}